import { useUser } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from './_ui/Story'
import ModalShowStory from '../modal/ModalShowStory'

const StoryList = () => {
	const { user } = useUser()
	const [users, setUsers] = useState([])

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'users'), orderBy('timestamp', 'asc')),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()))
			}
		)
		return () => unsubscribe()
	}, [user])

	return (
		<div className="flex space-x-2 py-6 px-2 lg:px-3 bg-white border-gray-200 border rounded-b-xl capitalize overflow-x-scroll scrollbar-hide">
			{users.map((user) => (
				<div key={user.id}>
					<Story
						id={user.id}
						username={user.username}
						image={user.profileImg}
						fullName={user.fullName}
						stories={user.stories}
					/>
					{user.stories ? (
						<ModalShowStory userId={user.id} />
					) : (
						<button
							disabled
							className="block w-full md:w-auto text-white bg-gray-400 cursor-not-allowed ..."
						>
							No Story
						</button>
					)}
				</div>
			))}
		</div>
	)
}

export default StoryList
