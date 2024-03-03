import Image from 'next/image'

const Story = ({ img, username, name }) => {
	return (
		<div>
			<Image src={img} alt="test" width={80} height={80} />
			<p>{username}</p>
			<p>{name}</p>
		</div>
	)
}

export default Story
