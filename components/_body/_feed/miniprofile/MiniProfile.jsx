'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'

const MiniProfile = () => {
	const { isSignedIn, user } = useUser()
	if (!isSignedIn) {
		return null
	}

	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<div className="rounded-full border p-[2px]  ">
				<UserButton afterSignOutUrl="/" />
			</div>

			<div className="flex-1 mx-4">
				<h2 className="font-bold">{user.firstName}</h2>
				<h3 className="text-xs text-gray-600">{user.lastName}</h3>
			</div>
			<button className="text-gray-400 font-semibold capitalize border border-gray-400 p-[2.5px] rounded-md">
				<Link href="/settings">Settings</Link>
			</button>
		</div>
	)
}

export default MiniProfile
