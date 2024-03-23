'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ArchivesDetails from '@/components/_body/_archive/ArchiveDetails'
import { useAuth } from '@clerk/nextjs'

const Archives = () => {
	const router = useRouter()
	const { isLoaded, userId } = useAuth()

	useEffect(() => {
		if (!isLoaded || !userId) {
			router.push('/dashboard')
		}
	}, [isLoaded, userId, router])

	return (
		<div className="flex justify-center items-center">
			<ArchivesDetails />
		</div>
	)
}

export default Archives
