import React, { useState, useEffect } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Suggestion from './_ui/Suggestion'

const Suggestions = () => {
	const [users, setUsers] = useState([])
	const { isSignedIn, user, isLoaded } = useUser()

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'users'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()))
			}
		)
		return () => unsubscribe()
	}, [user])

	return (
		<div className="suggestions-container">
			<div className="flex justify-between text-sm border-b border-gray-400 py-5">
				<h3 className="text-sm font-bold text-gray-600 capitalize">
					Suggestions for you
				</h3>
			</div>
			<div className="suggestions-list">
				{isLoaded && user ? (
					users
						.filter((u) => u.username !== user.username)
						.map((user) => (
							<Suggestion
								key={user.id}
								id={user.id}
								username={user.username}
								image={user.profileImg}
								fullName={user.fullName}
							/>
						))
				) : (
					<div className="flex items-center justify-center mt-10 w-full h-full">
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
		</div>
	)
}

export default Suggestions
