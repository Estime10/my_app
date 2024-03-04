'use client'
import React from 'react'
import profiles from '../../../_mapper/profiles'
import Story from './_ui/Story'

const Stories = () => {
	return (
		<div className="flex space-x-2 p-6 bg-white border-gray-200 border rounded-sm capitalize overflow-x-scroll">
			{profiles.map((profile) => (
				<Story
					key={profile.id}
					img={profile.avatar}
					username={profile.username}
					name={profile.name}
				/>
			))}
		</div>
	)
}

export default Stories
