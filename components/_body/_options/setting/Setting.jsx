import React from 'react'
import { UserProfile, useUser, SignOutButton } from '@clerk/nextjs'

const Setting = () => {
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<section>
			<div className="flex flex-col items-center pt-5 lg:pt-10">
				<span className=" lg:mb-6 font-semibold capitalize">
					{user.firstName} {user.lastName}'s settings
				</span>
				<div className="lg:border-t border-gray-400 py-5">
					<UserProfile />
					<div className="mt-4">
						<SignOutButton>
							<button className="btn-follow">log out</button>
						</SignOutButton>
						<span className="flex lg:mt-3 text-xs text-gray-400 uppercase mt-4">
							*make sure to log out to save your changes
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Setting
