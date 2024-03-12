import { useUser } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from './_ui/Story'

const StoryList = () => {
	const { user } = useUser()
	const [users, setUsers] = useState([])

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'users'), orderBy('timestamp', 'asc')),
			(snapshot) => {
				console.log(snapshot.docs.map((doc) => doc.data()))

				setUsers(snapshot.docs.map((doc) => doc.data()))
			}
		)
		return () => unsubscribe()
	}, [user])

	return (
		<div
			className="flex space-x-2 py-6 px-2 lg:px-3 bg-white border-gray-200 border 
		rounded-b-xl capitalize overflow-x-scroll scrollbar-hide "
		>
			{users.map((user) => (
				<Story
					key={user.id}
					id={user.id}
					username={user.username}
					image={user.profileImg}
					fullName={user.fullName}
				/>
			))}
		</div>
	)
}

export default StoryList
