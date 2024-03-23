'use client'
import React from 'react'
import Hero from './_profile/_ui/Hero'
import ModalProfile from '../_modal/ModalProfile'
import Gallery from './_profile/_ui/Gallery'

const ProfilePage = () => {
	return (
		<>
			<main
				className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto"
			>
				{/* Section middle */}
				<section className="col-span-2">
					{/* Hero */}
					<Hero />
					<ModalProfile />
					{/* Gallery */}
					<Gallery />
				</section>
				{/* Section */}
				<section className="hidden xl:inline-grid md:col-span-1">
					<div className="fixed top-40">{/* trading board */}</div>
				</section>
			</main>
		</>
	)
}

export default ProfilePage
