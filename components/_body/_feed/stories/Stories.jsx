import React, { useEffect, useState } from 'react'
import Story from './_ui/Story'

const Stories = () => {
	const [stories, setStories] = useState([])

	return (
		<div
			className="flex space-x-2 py-6 px-2 lg:px-3 bg-white border-gray-200 border 
		rounded-b-xl capitalize overflow-x-scroll scrollbar-hide "
		>
			{stories.map((storie) => (
				<Story
					key={storie.id}
					id={storie.id}
					username={storie.data().username}
					profileImg={storie.data().profileImg}
					image={storie.data().image}
					name={storie.data().name}
				/>
			))}
		</div>
	)
}

export default Stories
