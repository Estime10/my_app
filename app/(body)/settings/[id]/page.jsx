'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Setting from '@/components/_body/_option/setting/Setting'

const SettingsId = () => {
	const router = useRouter()
	const { isLoaded, userId } = useAuth()

	useEffect(() => {
		if (!isLoaded || !userId) {
			router.push('/dashboard')
		}
	}, [isLoaded, userId, router])

	return (
		<div>
			<div>
				<Setting />
			</div>
		</div>
	)
}

export default SettingsId
