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
	setDoc,
	deleteDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuth, useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'
import Link from 'next/link'

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
	const [isLoading, setLoading] = useState(true)
	const params = useParams()
	const [isCurrentUser, setIsCurrentUser] = useState(false)
	const [openSecondModal, setOpenThirdModal] = useRecoilState(modalProfileState)
	const [fullName, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [profileImg, setProfileImg] = useState('')
	const [biography, setBiography] = useState('')
	const [postCount, setPostCount] = useState(0)
	const [followersCount, setFollowersCount] = useState(0)
	const [followingCount, setFollowingCount] = useState(0)
	const currentUserAuth = useAuth()
	const { user } = useUser()
	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		if (params.id === currentUserAuth.userId) {
			setIsCurrentUser(true)
		}

		const fetchUserData = async () => {
			try {
				const userDocRef = doc(db, 'users', params.id)
				const userDoc = await getDoc(userDocRef)
				if (userDoc.exists()) {
					const userData = userDoc.data()
					setFullName(userData.fullName)
					setUsername(userData.username)
					setProfileImg(userData.profileImg)
					setBiography(userData.biography)

					// Utilisation de currentUserAuth pour vérifier l'utilisateur actuel
					if (
						currentUserAuth &&
						currentUserAuth.user &&
						currentUserAuth.user.id === params.id
					) {
						setIsCurrentUser(true)
					}

					const postsSnapshot = await getDocs(collection(db, 'posts'))
					const userPosts = postsSnapshot.docs.filter(
						(doc) => doc.data().userId === params.id
					)
					setPostCount(userPosts.length)

					const followedSnapshot = await getDocs(
						collection(db, 'followed', userData.username, 'i_am_followed_by')
					)
					const followersCount = followedSnapshot.size
					setFollowersCount(followersCount)

					const followingSnapshot = await getDocs(
						collection(db, 'following', params.id, 'i_m_following')
					)
					const followingCount = followingSnapshot.size
					setFollowingCount(followingCount)

					// Vérifier si l'utilisateur actuel suit l'utilisateur du profil
					const unsubscribe = onSnapshot(
						collection(db, `following/${user.id}/i_m_following`),
						(querySnapshot) => {
							// Vérifiez si l'utilisateur actuel suit l'utilisateur du profil
							const isFollowing = querySnapshot.docs.some(
								(doc) => doc.id === userData.username
							)
							setIsFollowing(isFollowing)
						}
					)

					return () => unsubscribe()
				} else {
					console.log('User document does not exist.')
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserData()
	}, [params.id, currentUserAuth])

	// Définition de la fonction pour suivre ou arrêter de suivre un utilisateur
	const toggleFollow = async () => {
		if (!user) return

		try {
			// Inverser la valeur de isFollowing
			const newIsFollowing = !isFollowing

			if (newIsFollowing) {
				// Follow
				await setDoc(doc(db, `following/${user.id}/i_m_following`, username), {
					userId: user.id,
					username: user.username,
				})
				await setDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id),
					{
						userId: user.id,
						username: user.username,
					}
				)
				console.log(`User ${user.username} followed user ${username}`)
			} else {
				// Unfollow
				await deleteDoc(doc(db, `following/${user.id}/i_m_following`, username))
				await deleteDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id)
				)
				console.log(`User ${user.username} unfollowed user ${username}`)
			}

			// Mettre à jour l'état isFollowing après la mise à jour réussie
			setIsFollowing(newIsFollowing)
		} catch (error) {
			console.error('Error following/unfollowing user:', error)
		}
	}

	return (
		<>
			<div className="bg-white rounded-b-lg py-12 px-4 w-full lg:w-[630px] sm:px-6 lg:px-8">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-full">
						<Loading />
					</div>
				) : (
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
								<div className="flex justify-between  lg:space-x-14 items-center">
									<h1 className="text-base lg:text-lg font-bold capitalize">
										{fullName}
									</h1>
									<div className="flex">
										{isCurrentUser ? (
											<div className="flex">
												<button
													onClick={() => {
														setOpenThirdModal(true)
													}}
													className="btn-hover"
												>
													add bio
												</button>
											</div>
										) : (
											<>
												{isFollowing ? (
													<button
														className="btn-unfollow"
														onClick={toggleFollow}
													>
														Unfollow
													</button>
												) : (
													<button className="btn-hover" onClick={toggleFollow}>
														Follow
													</button>
												)}
											</>
										)}
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
				)}
			</div>
		</>
	)
}

export default Hero
