'use client'
import React, { useState } from 'react'
import Posts from './posts/Posts'
import MiniProfile from './miniprofile/MiniProfile'
import Suggestions from './suggestions/Suggestions'
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
					{isloading && (
						<div className="flex items-center justify-center w-full h-full">
							<svg
								className="animate-spin h-8 w-8 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v4c-6.627 0-12-5.373-12-12h4zM20 12c0-4.418-3.582-8-8-8v4c2.216 0 4 1.784 4 4h4zm-8 8c4.418 0 8-3.582 8-8h-4c0 2.216-1.784 4-4 4v4z"
								></path>
							</svg>
						</div>
					)}
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
