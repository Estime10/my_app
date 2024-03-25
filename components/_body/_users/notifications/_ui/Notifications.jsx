import React, { useState, useEffect, useRef } from 'react'
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Moment from 'react-moment'

const Notifications = () => {
	const [followingUsers, setFollowingUsers] = useState([])
	const [followedUsers, setFollowedUsers] = useState([])
	const [likesUsers, setLikesUsers] = useState([])

	const { user } = useUser()

	useEffect(() => {
		if (!user) return

		const unsubscribeFollowing = onSnapshot(
			collection(db, `following/${user.id}/i_m_following`),
			(querySnapshot) => {
				const followingUsers = querySnapshot.docs
					.filter((doc) => doc.id !== user.id)
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				setFollowingUsers(followingUsers)
			}
		)

		const unsubscribeFollowed = onSnapshot(
			collection(db, `followed/${user.username}/i_am_followed_by`),
			(querySnapshot) => {
				const followedUsers = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setFollowedUsers(followedUsers)
			}
		)

		return () => {
			unsubscribeFollowing()
			unsubscribeFollowed()
		}
	}, [user])

	const unsubscribeLikesRef = useRef([])

	useEffect(() => {
		const cleanup = () => {
			unsubscribeLikesRef.current.forEach((unsubscribe) => unsubscribe())
			unsubscribeLikesRef.current = []
		}

		if (!user) {
			cleanup()
			return
		}

		const postsQuery = query(
			collection(db, 'posts'),
			where('userId', '==', user.id)
		)

		getDocs(postsQuery).then((querySnapshot) => {
			cleanup()
			querySnapshot.forEach((doc) => {
				const unsubscribe = onSnapshot(
					collection(db, 'posts', doc.id, 'likes'),
					(querySnapshot) => {
						const likesUsers = querySnapshot.docs
							.filter((doc) => doc.id !== user.id)
							.map((doc) => ({
								id: doc.id,
								...doc.data(),
							}))
						setLikesUsers((prevLikesUsers) => [
							...prevLikesUsers,
							...likesUsers,
						])
					}
				)
				unsubscribeLikesRef.current.push(unsubscribe)
			})
		})

		return cleanup
	}, [user, db])

	return (
		<div className="notifications-list">
			<div className="flex justify-between text-sm pb-2"></div>

			<div className="followed-list">
				<div className=" p-2 suggestions-list">
					{[...followedUsers, ...likesUsers]
						.sort((a, b) => {
							if (a.timestamp && b.timestamp) {
								return b.timestamp.toDate() - a.timestamp.toDate()
							} else {
								return 0
							}
						})
						.map((notification) => (
							<div
								className="flex items-center border-b border-gray-200 p-2"
								key={notification.id}
							>
								{' '}
								<Image
									className="rounded-full border p-[2px] w-10 h-10"
									width={40}
									height={40}
									src={notification.image}
									alt="Profile"
								/>
								<div className="ml-2 flex items-center space-x-2">
									<p className="font-bold text-xs uppercase">
										{notification.username}
									</p>
									<span className="text-gray-400 text-xs">
										{notification.type === 'follow'
											? 'is following you'
											: 'liked your post'}
									</span>
									<div className="text-xs">
										{notification.timestamp && (
											<Moment fromNow>{notification.timestamp.toDate()}</Moment>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Notifications
