'use client'
import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import Setting from '@/components/_body/_feed/setting/Setting'
const SettingsId = () => {
	const { isLoaded, userId, sessionId } = useAuth()

	if (!isLoaded || !userId) {
		return null
	}

	return (
		<div>
			<div>
				<Setting />
			</div>
		</div>
	)
}

export default SettingsId
