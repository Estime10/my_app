'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignInButton, SignedOut, UserButton, useUser } from '@clerk/nextjs'

const MiniProfile = () => {
	const { isSignedIn, user } = useUser()
	if (!isSignedIn) {
		return null
	}

	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<div className="rounded-full border p-[2px]  ">
				<UserButton afterSignOutUrl="/" />
				<SignedOut>
					<SignInButton afterSignInUrl="/dashboard" mode="modal" />
				</SignedOut>
			</div>

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
