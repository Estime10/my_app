import Image from 'next/image'

const Story = ({ image, caption, id, profileImg, username }) => {
	return (
		<div>
			<Image
				src={profileImg}
				alt="test"
				width={80}
				height={80}
				className="h-14 w-14 rounded-full border-black border-2 p-[1.5px]
				object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
			/>
			<p className="text-sm w-14 truncate text-center">{username}</p>
			{/* créer une modal on click */}
		</div>
	)
}

export default Story
