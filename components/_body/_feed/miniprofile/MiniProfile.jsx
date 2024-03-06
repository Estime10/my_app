'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const MiniProfile = () => {
	const { isLoading, isSignedIn, user } = useUser()
	if (!isSignedIn) {
		return null
	}

	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<Image
				className="rounded-full border p-[2px] w-16 h-16"
				src={user.imageUrl}
				alt="profile pic"
				width={40}
				height={40}
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-bold">{user.firstName}</h2>
				<h3 className="text-xs text-gray-600">{user.lastName}</h3>
			</div>
			<button className="text-gray-400 text-sm font-semibold capitalize">
				<Link href="/settings">Settings</Link>
			</button>
		</div>
	)
}

export default MiniProfile
