import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Image from 'next/image'
import { useState } from 'react'

const Post = ({ username, userAvatar, image, caption, id }) => {
	const { user } = useUser()
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const sendComment = async (e) => {
		e.preventDefault()
		const commentToSend = comment
		setComment('')

		await addDoc(collection(db, 'users', user.id, 'posts', id, 'comments'), {
			comment: commentToSend,
			userId: user.id,
			username: user.username,
			profileImg: user.imageUrl,
			timestamp: serverTimestamp(),
		})
	}
	// const [showComments, setShowComments] = useState(false)

	// const toggleComments = () => {
	// 	setShowComments(!showComments)
	// }
	return (
		<div className="bg-white my-7 border rounded-sm">
			{/* header */}
			<div className="flex items-center p-5">
				<Image
					className="rounded-full object-cover border p-1 mr-3 w-12 h-12"
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
				className="object-cover w-full max-h-96"
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
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					type="submit"
					disabled={!comment.trim()}
					onClick={sendComment}
					className="font-semibold text-gray-400 "
				>
					Post
				</button>
			</form>
		</div>
	)
}

export default Post
