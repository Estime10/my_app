import Image from 'next/image'

const Post = ({ id, username, userAvatar, image, caption }) => {
	// const [showComments, setShowComments] = useState(false)

	// const toggleComments = () => {
	// 	setShowComments(!showComments)
	// }
	return (
		<div className="bg-white my-7 border rounded-sm">
			{/* header */}
			<div className="flex items-center p-5">
				<Image
					className="rounded-full object-contain border p-1 mr-3"
					src={userAvatar}
					alt={username}
					width={40}
					height={40}
				/>
				<p className="flex-1 font-bold capitalize">{username}</p>
				<Image
					className="h-5"
					src="/svg/dots.svg"
					alt="dots"
					width={20}
					height={20}
				/>
			</div>
			{/* image */}
			<Image
				className="object-cover w-full"
				src={image}
				alt="post"
				width={200}
				height={200}
			/>
			{/* buttons */}
			<div className="flex justify-between px-4 pt-4">
				<div className="flex space-x-4">
					{/* like */}
					<Image
						className="btn"
						src="/svg/like.svg"
						alt="like"
						width={20}
						height={20}
					/>
					{/* use js to replace when clicked */}
					{/* <Image
				className="btn"
				src="/svg/likefill.svg"
				alt="like"
				width={20}
				height={20}
			/> */}
					{/* comment */}
					<Image
						className="btn"
						src="/svg/chat.svg"
						alt="chat"
						width={20}
						height={20}
					/>
					{/* share */}
					<Image
						className="btn"
						src="/svg/share.svg"
						alt="share"
						width={20}
						height={20}
					/>
				</div>
				<Image
					className="btn"
					src="/svg/save.svg"
					alt="save"
					width={20}
					height={20}
				/>
			</div>
			{/* likes section */}
			{/* caption */}
			<div className="p-5">
				<span className="font-bold mr-1 capitalize">{username}</span>
				<span>{caption}</span>
			</div>
			{/* comments */}
			{/* input box */}
			<form className="flex items-center p-4">
				<Image
					className="h-7"
					src="/svg/happy.svg"
					alt="happy"
					width={20}
					height={20}
				/>
				<input
					className="border-none flex-1 focus:ring-0"
					type="text"
					placeholder="Add a comment..."
				/>
				<button className="font-semibold text-gray-400 ">Post</button>
			</form>
		</div>
	)
}

export default Post
