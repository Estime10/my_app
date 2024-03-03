'use client'
import React from 'react'
import profiles from '../../../_mapper/profiles'
import Story from './_ui/Story'

const Stories = () => {
	return (
		<div>
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
