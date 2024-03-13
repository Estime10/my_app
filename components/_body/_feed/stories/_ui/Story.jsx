import Image from 'next/image'

const Story = ({ image, username, stories = {} }) => {
	// Extrait la première clé de l'objet stories (l'ID de l'histoire)
	const storyId = Object.keys(stories)[0]

	// Vérifie si l'utilisateur a une histoire
	const hasStory = stories[storyId]

	return (
		<div>
			<Image
				src={image}
				alt="test"
				width={80}
				height={80}
				className="h-14 w-14 rounded-full border-black border-2 p-[1.5px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
			/>
			<p className="text-sm w-14 truncate text-center">{username}</p>
			<p>{hasStory ? `Has Story with ID: ${storyId}` : 'No Story'}</p>
		</div>
	)
}

export default Story
