import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

import { useState, useEffect } from 'react'

const MiniProfile = () => {
	const { isSignedIn, user } = useUser()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	if (!isSignedIn) {
		return null
	}

	return (
		<>
			{loading ? (
				<div className="flex items-center justify-center mt-14">
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
				</div>
			) : (
				<div className="flex items-center justify-between mt-14 ml-10">
					<div className="rounded-full border-2  p-[2px]">
						<Image
							className="rounded-full  w-12 h-12"
							src={user.imageUrl}
							width={40}
							height={40}
						/>
					</div>

					<div className="flex-1 mx-4">
						<h2 className="font-bold">
							{user.firstName} {user.lastName}
						</h2>
						<h3 className="text-xs text-gray-600">{user.username}</h3>
					</div>

					<button className="btn-hover py-1">
						<Link href={`/settings/${user.id}`}>Settings</Link>
					</button>
				</div>
			)}
		</>
	)
}

export default MiniProfile
