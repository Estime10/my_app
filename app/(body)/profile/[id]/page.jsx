'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Profile from '@/components/_body/_profile/profile/Profile'
import ModalPost from '@/components/_modal/ModalPost'
import ModalStory from '@/components/_modal/ModalStory'
import ModalProfile from '@/components/_modal/ModalProfile'
const Profiles = () => {
	const router = useRouter()
	const { isLoaded, userId } = useAuth()

	useEffect(() => {
		if (!isLoaded || !userId) {
			router.push('/')
		}
	}, [isLoaded, userId, router])

	return (
		<>
			<div
				className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl lg:grid-cols-3 xl:max-w-4xl mx-auto"
			>
				<ModalPost />
				<ModalStory />
				<ModalProfile />
				<Profile />
			</div>
		</>
	)
}

export default Profiles
