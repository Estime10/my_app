'use client'

import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useParams } from 'next/navigation'
import Hero from '@/components/_body/_profile/profile/_ui/Hero'
import ModalPost from '@/components/_modal/ModalPost'
import ModalStory from '@/components/_modal/ModalStory'
import ModalProfile from '@/components/_modal/ModalProfile'
import ProfileDetails from '@/components/_body/_profile/profile/ProfileDetails'

const Profile = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl lg:grid-cols-3 xl:max-w-4xl mx-auto"
		>
			<ProfileDetails />
		</div>
	)
}

export default Profile
