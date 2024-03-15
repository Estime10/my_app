import React, { useState, useEffect } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Suggestion from './_ui/Suggrestion'

const Suggestions = () => {
	const [users, setUsers] = useState([])
	const { user } = useUser()

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'users'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				// console.log(snapshot.docs.map((doc) => doc.data()))

				setUsers(snapshot.docs.map((doc) => doc.data()))
			}
		)
		return () => unsubscribe()
	}, [user])

	return (
		<div className="mt-4 ml-10">
			<div className="flex justify-between text-sm mb-10 border-b border-gray-400 py-5">
				<h3 className="text-sm font-bold text-gray-600 capitalize">
					suggestions for you
				</h3>
			</div>
			{users.map((user) => (
				<Suggestion
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

export default Suggestions
