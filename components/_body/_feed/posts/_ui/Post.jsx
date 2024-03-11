import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import Moment from 'react-moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Post = ({ image, caption, id, profileImg, username }) => {
	const { user } = useUser()
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState([])
	const [hasLiked, setHasLiked] = useState(false)

	return (
		<div className="bg-white my-7 border rounded-xl">
			{/* header */}
			<div className="flex items-center p-5">
				<Image
					className="rounded-full object-cover border p-1 mr-3 w-12 h-12"
					src={profileImg}
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
				alt="post image"
				width={200}
				height={200}
			/>
			{/* buttons */}

			<div className="flex justify-between items-center px-4 pt-4">
				<div className="flex items-center">
					{/* like */}
					{hasLiked ? (
						<Image
							className="btn"
							src="/svg/likefill.svg"
							alt="like"
							width={20}
							height={20}
							onClick={likePost}
						/>
					) : (
						<Image
							className="btn"
							src="/svg/like.svg"
							alt="like"
							width={20}
							height={20}
							onClick={likePost}
						/>
					)}

					{/* likes section */}
					{likes.length > 0 && (
						<div className="px-3 py-2">
							<p className="font-bold text-xs">
								{likes.length} {likes.length === 1 ? 'like' : 'likes'}
							</p>
						</div>
					)}
				</div>
				<div className="flex space-x-4">
					{/* save */}
					<Image
						className="btn"
						src="/svg/save.svg"
						alt="save"
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
			</div>
			{/* caption */}
			<div className="px-3 py-2 flex-nowrap">
				<span className="font-bold mr-1 capitalize">{username}</span>
				<span className=" max-h-xl overflow-y-scroll scrollbar-hide">
					{caption}
				</span>
			</div>
			{/* comments */}
			{comments.length > 0 && (
				<div className="ml-3 h-20 overflow-y-scroll scrollbar-hide">
					{comments.map((comment) => (
						<div key={comment.id} className="flex items-center space-x-2 py-1">
							<Image
								className="h-5 rounded-full"
								src={comment.data().profileImg}
								alt="comment"
								width={20}
								height={20}
							/>
							<p className="text-sm flex-1">
								<span className="font-bold capitalize mr-2">
									{comment.data().username}
								</span>
								{comment.data().comment}
							</p>
							<Moment className="pr-5 text-xs text-gray-400" fromNow>
								{comment.data().timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}
			{/* input box */}
			<div className="border-t-slate-50 border-t sticky z-10">
				<form className="flex items-center py-2 ">
					<input
						className="border-none flex-1 focus:ring-0 mr-1 "
						type="text"
						placeholder="Add a comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<button
						type="submit"
						disabled={!comment.trim()}
						onClick={sendComment}
						className="font-semibold text-gray-400 px-4"
					>
						Post
					</button>
				</form>
			</div>
		</div>
	)
}

export default Post
