import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from './_ui/Story'
import { useUser } from '@clerk/nextjs'

const StoryList = () => {
	const [users, setUsers] = useState([])
	const { isSignedIn, user, isLoaded } = useUser()

	useEffect(() => {
		const getUsers = async () => {
			try {
				if (isSignedIn && user) {
					const usersCollection = collection(db, 'users')
					const usersSnapshot = await getDocs(usersCollection)
					const usersData = usersSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setUsers(usersData)
				}
			} catch (error) {
				console.error('Error getting users:', error)
			}
		}

		getUsers()
	}, [isSignedIn, user])

	return (
		<div className="flex space-x-2 p-6 px-2 lg:px-3 bg-white border-gray-200 border rounded-b-xl capitalize overflow-x-scroll scrollbar-hide">
			{isLoaded && user ? (
				users
					// Trie les utilisateurs en fonction de l'identifiant de l'utilisateur actuel
					.sort((a, b) => (a.id === user.id ? -1 : b.id === user.id ? 1 : 0))
					.map((user) => (
						<div key={user.id}>
							<Story
								id={user.id}
								image={user.profileImg}
								username={user.username}
								stories={user.stories}
							/>
						</div>
					))
			) : (
				<div className="flex items-center justify-center w-full h-full">
					<p className="text-gray-400 text-lg">Loading...</p>
				</div>
			)}
		</div>
	)
}

export default StoryList
