import React from 'react'
import Stories from './stories/Stories'
import Posts from './posts/Posts'
import MiniProfile from './miniprofile/MiniProfile'
import Suggestions from './suggestions/Suggestions'

const Feed = () => {
	return (
		<main
			className="grid grid-cols-1 md:grid-cols-2 
		md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto"
		>
			{/* Section middle */}
			<section className="col-span-2">
				{/* Stories */}
				<Stories />
				{/* Posts */}
				<Posts />
			</section>
			{/* Section */}
			<section className="hidden xl:inline-grid md:col-span-1">
				<div className="fixed top-20">
					{/* Mini profile */}
					<MiniProfile />
					{/* Suggestions */}
					<Suggestions />
				</div>
			</section>
		</main>
	)
}

export default Feed
