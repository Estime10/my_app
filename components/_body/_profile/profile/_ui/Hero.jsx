import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalProfileState } from '@/app/store/atoms/modalAtoms'
import { useParams } from 'next/navigation'
import {
	collection,
	getDocs,
	doc,
	getDoc,
	onSnapshot,
} from 'firebase/firestore'
import { db } from '@/firebase'

const formatCount = (count) => {
	if (count >= 1000000) {
		return (count / 1000000).toFixed(1) + 'M'
	} else if (count >= 1000) {
		return (count / 1000).toFixed(1) + 'K'
	} else {
		return count
	}
}

function Hero() {
	const params = useParams()
	const [openSecondModal, setOpenThirdModal] = useRecoilState(modalProfileState)
	const [fullName, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [profileImg, setProfileImg] = useState('')
	const [biography, setBiography] = useState('')
	const [postCount, setPostCount] = useState(0)
	const [followersCount, setFollowersCount] = useState(0)
	const [followingCount, setFollowingCount] = useState(0)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Récupérer les informations de l'utilisateur depuis la collection 'users'
				const userDocRef = doc(db, 'users', params.id)
				const userDoc = await getDoc(userDocRef)
				if (userDoc.exists()) {
					const userData = userDoc.data()
					setFullName(userData.fullName)
					setUsername(userData.username)
					setProfileImg(userData.profileImg)
					setBiography(userData.biography)

					// Récupérer le nombre de publications (postCount) depuis la collection 'posts'
					const postsSnapshot = await getDocs(collection(db, 'posts'))
					const userPosts = postsSnapshot.docs.filter(
						(doc) => doc.data().userId === params.id
					)
					setPostCount(userPosts.length)

					// Récupérer le nombre de followers depuis la collection 'followed'
					const followedSnapshot = await getDocs(
						collection(db, 'followed', userData.username, 'i_am_followed_by')
					)
					const followersCount = followedSnapshot.size
					setFollowersCount(followersCount)

					// Récupérer le nombre de personnes suivies depuis la collection 'following'
					const followingSnapshot = await getDocs(
						collection(db, 'following', params.id, 'i_m_following')
					)
					const followingCount = followingSnapshot.size
					setFollowingCount(followingCount)
				} else {
					console.log('User document does not exist.')
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, [params.id])

	return (
		<>
			<div className="bg-white rounded-b-lg py-12 px-4 w-full lg:w-[630px] sm:px-6 lg:px-8">
				<div className="mx-auto md:flex md:items-center md:justify-between">
					<div className="md:flex md:items-center">
						<div className="md:flex-shrink-0">
							<div className="rounded-full border-4 border-gray-400 p-1 w-20 h-20 lg:w-40 lg:h-40 overflow-hidden">
								<Image
									src={profileImg}
									alt="profile"
									width={160}
									height={160}
									className="rounded-full"
								/>
							</div>
						</div>
						<div className="mt-4 md:mt-0 md:ml-6">
							<div className="flex space-x-32 lg:space-x-24 items-center">
								<h1 className=" text-base lg:text-xl font-bold capitalize ">
									{fullName}
								</h1>
								<div className="flex ">
									<button
										onClick={() => {
											setOpenThirdModal(true)
										}}
										className="btn-hover"
									>
										edit
									</button>
								</div>
							</div>
							<div className="flex items-center text-base text-gray-400">
								<span className="text-xs pt-1">@</span>
								<span>{username}</span>
							</div>

							<p className="mb-1 text-gray-400 text-base capitalize">
								{biography}
							</p>
							<div className="flex capitalize font-semibold space-x-16 mt-5">
								<div className="flex flex-col">
									posts
									<span className="font-bold text-gray-400">{postCount}</span>
								</div>
								<div className="flex flex-col">
									followers
									<span className="font-bold text-gray-400">
										{formatCount(followersCount)}
									</span>
								</div>
								<div className="flex flex-col">
									following
									<span className="font-bold text-gray-400">
										{formatCount(followingCount)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Hero
