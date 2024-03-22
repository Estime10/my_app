'use client'
import React from 'react'
import ProfileDetails from '@/components/_body/_profile/profile/ProfileDetails'

const Profiles = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl lg:grid-cols-3 xl:max-w-4xl mx-auto"
		>
			<ProfileDetails />
		</div>
	)
}

export default Profiles
