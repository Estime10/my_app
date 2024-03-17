'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Setting from '@/components/_body/_options/setting/Setting'

const SettingsId = () => {
	const router = useRouter()
	const { isLoaded, userId } = useAuth()

	useEffect(() => {
		if (!isLoaded || !userId) {
			router.push('/')
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
