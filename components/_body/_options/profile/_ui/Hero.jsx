import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalProfileState } from '@/app/store/atoms/modalAtoms'
import { useUser } from '@clerk/nextjs'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

function Hero() {
	const { isSignedIn, user } = useUser()
	const [openSecondModal, setOpenThirdModal] = useRecoilState(modalProfileState)
	const [fullName, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [profileImg, setProfileImg] = useState('')
	const [biography, setBiography] = useState('')
	const [postCount, setPostCount] = useState(0)
	const [followersCount, setFollowersCount] = useState(0)
	const [followingCount, setFollowingCount] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			if (isSignedIn && user) {
				try {
					// Récupérer les informations de l'utilisateur depuis la collection 'users'
					const userDoc = await getDoc(doc(db, 'users', user.id))
					const userData = userDoc.data()
					setFullName(userData.fullName)
					setUsername(userData.username)
					setProfileImg(userData.profileImg)
					setBiography(userData.biography)

					// Récupérer le nombre de publications (postCount) depuis la collection 'posts'
					const postsSnapshot = await getDocs(collection(db, 'posts'))
					const userPosts = postsSnapshot.docs.filter(
						(doc) => doc.data().userId === user.id
					)
					setPostCount(userPosts.length)

					// Récupérer le nombre de followers (followersCount) depuis la collection 'followers'
					const followersSnapshot = await getDocs(collection(db, 'followers'))
					const userFollowers = followersSnapshot.docs.filter(
						(doc) => doc.data().userId === user.id
					)
					setFollowersCount(userFollowers.length)

					// Récupérer le nombre de suivis (followingCount) depuis la collection 'following'
					const followingSnapshot = await getDocs(collection(db, 'following'))
					const userFollowing = followingSnapshot.docs.filter(
						(doc) => doc.data().userId === user.id
					)
					setFollowingCount(userFollowing.length)
				} catch (error) {
					console.error('Error fetching data:', error)
				}
			}
		}

		fetchData()
	}, [isSignedIn, user])

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
							<div className="flex space-x-4 items-center">
								<h1 className="text-xl font-bold capitalize ">{fullName}</h1>
								<div className="flex ">
									<button className="btn-hover">Follow</button>
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
							<div className="flex capitalize font-semibold justify-between">
								<div className="flex flex-col">
									posts
									<span className="font-bold text-gray-400">{postCount}</span>
								</div>
								<div className="flex flex-col">
									followers
									<span className="font-bold text-gray-400">
										{followersCount}
									</span>
								</div>
								<div className="flex flex-col">
									following
									<span className="font-bold text-gray-400">
										{followingCount}
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
