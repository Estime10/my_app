import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from './_ui/Story'

const StoryList = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		const getUsers = async () => {
			try {
				const usersCollection = collection(db, 'users')
				const usersSnapshot = await getDocs(usersCollection)
				const usersData = usersSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setUsers(usersData)
			} catch (error) {
				console.error('Error getting users:', error)
			}
		}

		getUsers()
	}, [])

	return (
		<div className="flex space-x-2 p-6 px-2 lg:px-3 bg-white border-gray-200 border rounded-b-xl capitalize overflow-x-scroll scrollbar-hide">
			{users.map((user) => (
				<div key={user.id}>
					<Story
						id={user.id}
						image={user.profileImg}
						username={user.username}
						stories={user.stories}
					/>
				</div>
			))}
		</div>
	)
}

export default StoryList
