'use client'
import React, { useState } from 'react'
import Posts from './posts/Posts'
import MiniProfile from './miniprofile/MiniProfile'
import Suggestions from './suggestions/Suggestions'
import Loading from './loadingPosts'
import StoryList from './stories/StoryList'

const Feed = () => {
	const [isloading, setLoading] = useState(true)

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
					{isloading && <Loading />}
					<Posts setLoading={setLoading} />
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

export default Feed
