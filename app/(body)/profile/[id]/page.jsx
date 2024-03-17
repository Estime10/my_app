'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Profile from '@/components/_body/_options/profile/Profile'
const Profiles = () => {
	const router = useRouter()
	const { isLoaded, userId } = useAuth()

	useEffect(() => {
		if (!isLoaded || !userId) {
			router.push('/')
		}
	}, [isLoaded, userId, router])

	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl lg:grid-cols-3 xl:max-w-4xl mx-auto"
		>
			<Profile />
		</div>
	)
}

export default Profiles
