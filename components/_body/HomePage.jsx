'use client'
import React from 'react'
import Posts from './_post/_mapper/Posts'
import MiniProfile from './_miniprofile/MiniProfile'
import Suggestions from './_users/suggestions/_mapper/Suggestions'
import StoryList from './_story/_mapper/StoryList'

const FeedPage = () => {
	return (
		<>
			<main
				className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto"
			>
				{/* Section middle */}
				<section className="col-span-2">
					{/* StoryList */}
					<StoryList />
					{/* Posts */}
					<Posts />
				</section>
				{/* Section */}
				<section className="hidden xl:inline-grid md:col-span-1">
					<div className="fixed top-40">
						{/* Mini profile */}
						<MiniProfile />
						{/* Suggestions */}
						<Suggestions />
					</div>
				</section>
			</main>
		</>
	)
}

export default FeedPage
