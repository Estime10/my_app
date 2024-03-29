import React, { useState, useEffect } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Suggestion from './_ui/Suggestion'

const Suggestions = () => {
	const [users, setUsers] = useState([])
	const { user } = useUser()

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
				{users
					.filter((u) => u.username !== user.username)
					.map((user) => (
						<Suggestion
							key={user.id}
							id={user.id}
							username={user.username}
							image={user.profileImg}
							fullName={user.fullName}
						/>
					))}
			</div>
		</div>
	)
}

export default Suggestions
