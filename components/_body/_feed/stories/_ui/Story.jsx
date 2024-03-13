import Image from 'next/image'
import ModalShowStory from '../../modal/ModalShowStory'

const Story = ({ image, username, onClick, fullName, profileImg }) => {
	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<div>
			<Image
				src={image}
				alt="test"
				width={80}
				height={80}
				className="h-14 w-14 rounded-full border-black border-2 p-[1.5px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
				onClick={handleClick}
			/>
			<p className="text-sm w-14 truncate text-center">{username}</p>
			<ModalShowStory
				className="border-2 border-red-600"
				username={username}
				profileImg={profileImg}
				image={image}
				name={fullName}
			/>
		</div>
	)
}

export default Story
