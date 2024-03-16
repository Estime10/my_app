import React from 'react'
import { UserProfile, useUser } from '@clerk/nextjs'

const Setting = () => {
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<section>
			<div className="flex flex-col items-center p-1 pt-1 lg:pt-10 ">
				<span className=" lg:mb-6 font-semibold capitalize">
					{user.firstName} {user.lastName}'s settings
				</span>
				<div className="lg:border-t border-gray-400 py-5">
					<UserProfile />
				</div>
			</div>
		</section>
	)
}

export default Setting
