import React from 'react'
import Hero from './_ui/Hero'
import Gallery from './_ui/Gallery'
import ModalPost from '@/components/_modal/ModalPost'
import ModalStory from '@/components/_modal/ModalStory'
import ModalProfile from '@/components/_modal/ModalProfile'

const ProfileDetails = () => {
	return (
		<div>
			<ModalPost />
			<ModalStory />
			<ModalProfile />
			<Hero />
			<Gallery />
		</div>
	)
}

export default ProfileDetails
