import React, { useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import Story from '../_ui/Story'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'

const StoryList = () => {
	const [users, setUsers] = useState([])
	const { isSignedIn, user, isLoaded } = useUser()
	console.log('user', user)

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
					<Loading />
				</div>
			)}
		</div>
	)
}

export default StoryList
