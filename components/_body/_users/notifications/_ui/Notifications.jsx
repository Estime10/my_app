import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

const Notifications = () => {
	const [followingUsers, setFollowingUsers] = useState([])
	const [followedUsers, setFollowedUsers] = useState([])
	const { user } = useUser()

	useEffect(() => {
		if (!user) return

		const unsubscribeFollowing = onSnapshot(
			collection(db, `following/${user.id}/i_m_following`),
			(querySnapshot) => {
				const followingUsers = querySnapshot.docs.map((doc) => ({
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

	return (
		<div className="notifications-container">
			<div className="flex justify-between text-sm pb-2"></div>
			{/* <div className="following-list">
				<h4>Following</h4>
				{followingUsers.map((user) => (
					<div key={user.id}>
						<p>{user.username}</p>
						<p>{user.fullName}</p>
						<Image
							className="rounded-full border p-[2px] w-10 h-10"
							width={40}
							height={40}
							src={user.image}
							alt="Profile"
						/>
					</div>
				))}
			</div> */}
			<div className="followed-list">
				<div className=" p-2">
					{followedUsers.map((user) => (
						<div
							className="flex items-center border-b border-gray-400 p-2"
							key={user.id}
						>
							{' '}
							<Image
								className="rounded-full border p-[2px] w-10 h-10"
								width={40}
								height={40}
								src={user.image}
								alt="Profile"
							/>
							<div className="ml-2 flex items-center space-x-2">
								<p className="font-bold text-sm uppercase">{user.username}</p>
								<span className="text-gray-400 ">is following you</span>
								{/* <p>{user.fullName}</p> */}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Notifications
