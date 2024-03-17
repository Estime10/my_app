import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

const MiniProfile = () => {
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<div className="flex items-center justify-between mt-14 ml-10">
			<div className="rounded-full border p-[2px]">
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

			<button className="text-gray-400 font-semibold text-sm uppercase border border-gray-400 p-[2.5px] rounded-md">
				<Link href={`/settings/${user.id}`}>Settings</Link>
			</button>
		</div>
	)
}

export default MiniProfile
