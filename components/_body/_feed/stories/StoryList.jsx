import React, { useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from './_ui/Story'
import { useUser } from '@clerk/nextjs'

const StoryList = () => {
	const [users, setUsers] = useState([])
	const { isSignedIn, user, isLoaded } = useUser()

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
			const updatedUsers = []
			snapshot.forEach((doc) => {
				const userData = {
					id: doc.id,
					...doc.data(),
				}
				updatedUsers.push(userData)
			})
			setUsers(updatedUsers)
		})

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [])

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
					<svg
						className="animate-spin h-8 w-8 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v4c-6.627 0-12-5.373-12-12h4zM20 12c0-4.418-3.582-8-8-8v4c2.216 0 4 1.784 4 4h4zm-8 8c4.418 0 8-3.582 8-8h-4c0 2.216-1.784 4-4 4v4z"
						></path>
					</svg>
				</div>
			)}
		</div>
	)
}

export default StoryList
