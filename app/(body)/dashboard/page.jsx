import React from 'react'
import Feed from '@/components/_body/_feed/Feed'
import { auth, currentUser } from '@clerk/nextjs'

export default async function Dashbord() {
	const { userId } = auth()

	// If the user is not signed in, redirect to the home page
	if (!userId) {
		return <div>you are not logged in</div>
	}

	const user = await currentUser()
	console.log(user)
	return (
		<main>
			<Feed user={user} />
		</main>
	)
}
