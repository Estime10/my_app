'use client'
import suggestions from '@/components/_mapper/suggestions'
import React from 'react'
import Image from 'next/image'

const Suggestions = () => {
	return (
		<div className="mt-4 ml-10">
			<div className="flex justify-between text-sm mb-5">
				<h3 className="text-sm font-bold text-gray-600 capitalize">
					suggestions for you
				</h3>
				<button className="text-gray-400 font-semibold capitalize">
					see all
				</button>
			</div>
			{suggestions.map((profile) => (
				<div
					key={profile.id}
					className="flex items-center justify-between mt-3"
				>
					<Image
						className="rounded-full border p-[2px] w-10 h-10"
						src={profile.avatar}
						alt="profile pic"
						width={40}
						height={40}
					/>
					<div className="flex-1 mx-4">
						<h2 className="font-semibold">{profile.username}</h2>
						<h3 className="text-xs text-gray-600">{profile.name}</h3>
					</div>
					<button className="text-gray-400 font-semibold capitalize">
						follow
					</button>
				</div>
			))}
		</div>
	)
}

export default Suggestions
