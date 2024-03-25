import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
	collection,
	onSnapshot,
	doc,
	getDoc,
	deleteDoc,
	deleteField,
	updateDoc,
	getDocs,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { motion } from 'framer-motion'
import Moment from 'react-moment'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'
import Link from 'next/link'
import { toast } from 'sonner'

const DeleteConfirmationModalStory = ({ isOpen, onClose, onConfirm }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}
		>
			<div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
			<div className="modal-card bg-white w-[23rem] rounded-lg shadow-lg z-50">
				<div className="modal-header bg-gray-300 text-white rounded-t-lg text-center py-4 px-6 ">
					<h2 className="text-lg font-bold text-center uppercase">
						Do you want to delete this Story?
					</h2>
				</div>
				<div className="modal-body font-semibold uppercase px-6 py-4 text-center">
					<p>You won't be able to revert the process</p>
				</div>
				<div className="modal-footer flex justify-center space-x-14 py-4 px-6 rounded-b-lg">
					<button
						onClick={onConfirm}
						className="w-32 h-12 text-xs font-semibold text-white cursor-pointer mx-2 my-2 text-center border-none rounded-md uppercase transition-all duration-200 shadow-md btn-hover-color-11"
					>
						Yes, delete it!
					</button>
					<button
						onClick={onClose}
						className="w-32 h-12 text-xs font-semibold text-white cursor-pointer mx-2 my-2 text-center border-none rounded-md uppercase transition-all duration-200 shadow-md btn-hover-color-8"
					>
						No, cancel!
					</button>
				</div>
			</div>
		</div>
	)
}
const DeleteConfirmationModalPost = ({ isOpen, onClose, onConfirm }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}
		>
			<div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
			<div className="modal-card bg-white w-1/3 rounded-lg shadow-lg z-50">
				<div className="modal-header bg-gray-300 text-white text-center py-4 px-6 rounded-t-lg">
					<h2 className="text-lg font-bold text-center uppercase">
						Do you want to delete this Post?
					</h2>
				</div>
				<div className="modal-body font-semibold uppercase px-6 py-4 text-center">
					<p>You won't be able to revert the process</p>
				</div>
				<div className="modal-footer flex justify-center space-x-14 py-4 px-6 rounded-b-lg">
					<button onClick={onConfirm} className="btn-confirm">
						Yes, delete it!
					</button>
					<button onClick={onClose} className="btn-cancel">
						No, cancel!
					</button>
				</div>
			</div>
		</div>
	)
}

const Gallery = () => {
	const [storyToDelete, setStoryToDelete] = useState(null)
	const [postToDelete, setPostToDelete] = useState(null)
	const [isPostModalOpen, setPostModalOpen] = useState(false)
	const [isStoryModalOpen, setStoryModalOpen] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const params = useParams()
	const { user } = useUser()
	const [userPosts, setUserPosts] = useState([])
	const [userStories, setUserStories] = useState([])
	const [, setUsername] = useState('')
	const [filter, setFilter] = useState('')

	const showDeleteConfirmationStory = (story) => {
		setStoryToDelete(story)
		setStoryModalOpen(true)
		setPostModalOpen(false)
	}

	const deleteStory = async (storyId) => {
		if (isLoading || !user) return

		setLoading(true)

		try {
			// Supprimer l'histoire de la collection des histoires
			await deleteDoc(doc(db, 'stories', storyId))

			// Obtenir le document de l'utilisateur
			const userRef = doc(db, 'users', user.id)

			// Supprimer le champ 'stories' du document utilisateur
			await updateDoc(userRef, {
				stories: deleteField(),
			})
		} catch (error) {
			console.error('Error deleting story:', error)
		}
		setLoading(false)
	}

	const showAlertStory = (story) => {
		showDeleteConfirmationStory(story)
	}

	const showDeleteConfirmationPost = (post) => {
		setPostToDelete(post)
		setPostModalOpen(true)
		setStoryModalOpen(false)
	}

	const deletePost = async (postId) => {
		try {
			await deleteDoc(doc(db, 'posts', postId))
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	const showAlertPost = (post) => {
		showDeleteConfirmationPost(post)
	}

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Récupérer les informations de l'utilisateur depuis la collection 'users'
				const userDocRef = doc(db, 'users', params.id)
				const userDoc = await getDoc(userDocRef)
				if (userDoc.exists()) {
					const userData = userDoc.data()
					setUsername(userData.username)

					// Récupérer les publications de l'utilisateur depuis la collection 'posts'
					const postsRef = collection(db, 'posts')
					const unsubscribePosts = onSnapshot(postsRef, async (snapshot) => {
						const postsPromises = snapshot.docs
							.filter((doc) => doc.data().userId === params.id)
							.map(async (doc) => {
								const postData = doc.data()
								const likesSnapshot = await getDocs(
									collection(db, 'posts', doc.id, 'likes')
								)
								const commentsSnapshot = await getDocs(
									collection(db, 'posts', doc.id, 'comments')
								)
								const comments = commentsSnapshot.docs.map((doc_1) =>
									doc_1.data()
								)
								return {
									id: doc.id,
									...postData,
									likes: likesSnapshot.docs.map((doc_1) => doc_1.data()),
									comments: comments,
								}
							})
						const posts = await Promise.all(postsPromises)
						posts.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
						setUserPosts(posts)
					})

					// Récupérer les stories de l'utilisateur depuis la collection 'stories'
					const storiesRef = collection(db, 'stories')
					const unsubscribeStories = onSnapshot(storiesRef, (snapshot) => {
						const stories = snapshot.docs
							.filter((doc) => doc.data().userId === params.id)
							.map((doc) => ({ id: doc.id, ...doc.data() }))
							.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
						setUserStories(stories)
					})

					return () => {
						unsubscribePosts()
						unsubscribeStories()
					}
				} else {
					console.log('User document does not exist.')
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserData()

		if (userPosts.length === 0 && userStories.length > 0) {
			setFilter('stories')
		} else {
			setFilter('posts')
		}
	}, [params.id, userPosts.length, userStories.length])

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter)
	}

	return (
		<div className="lg:w-[630px]  w-[400px]">
			{isLoading ? (
				<div className="flex justify-center items-center mt-10  w-full h-full">
					<Loading />
				</div>
			) : (
				<>
					<div className="flex justify-center items-center my-5">
						<div className="flex justify-center">
							<button
								onClick={() => handleFilterChange('posts')}
								className={`btn-filter ${filter === 'posts' && 'active'} ${userPosts.length === 0 ? 'btn-disabled' : ''}`}
								disabled={userPosts.length === 0}
							>
								Posts
							</button>
							<button
								onClick={() => handleFilterChange('stories')}
								className={`btn-filter ${filter === 'stories' && 'active'} ${userStories.length === 0 ? 'btn-disabled' : ''}`}
								disabled={userStories.length === 0}
							>
								Stories
							</button>
						</div>
					</div>

					{filter === 'posts' &&
						userPosts.map((post) => (
							<motion.div
								className="w-[630px]  max-w-full rounded-lg
                        		border border-gray-200 bg-white py-5 my-5"
								key={post.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<div className="flex items-center p-5">
									<Image
										className="rounded-full object-cover mr-3 w-12 h-12"
										src={post.profileImg}
										alt={post.username}
										width={40}
										height={40}
									/>
									<p className="flex-1 font-bold capitalize">
										@{post.username}
										<div className="text-gray-400 font-thin">
											{post.fullName}
										</div>
									</p>
									<div className="text-end">
										<div>
											{user?.id === params.id && (
												<div className="cursor-pointer">
													<button onClick={() => showAlertPost(post)}>
														<Image
															src="/svg/dots.svg"
															alt=""
															width={25}
															height={25}
														/>
													</button>
												</div>
											)}

											<Moment className="text-xs text-gray-400" fromNow>
												{post.timestamp?.toDate()}
											</Moment>
										</div>
									</div>
									<DeleteConfirmationModalPost
										isOpen={isPostModalOpen}
										onClose={() => setPostModalOpen(false)}
										onConfirm={() => {
											deletePost(postToDelete.id)
											setPostModalOpen(false)
											toast.success('Post deleted successfully.')
										}}
									/>
								</div>
								<Image
									className="object-cover w-full max-h-96"
									src={post.image}
									alt=""
									width={300}
									height={300}
								/>
								<div className="p-5 font-semibold capitalize">
									<div className="flex items-center justify-between">
										<h1 className="font-semibold capitalize">{post.title}</h1>
										<p className="font-thin text-sm text-gray-400 ">
											the image has been liked{' '}
											<span className="text-gray-800">{post.likes.length}</span>{' '}
											times
										</p>
									</div>

									<p className="font-semibold  py-2">{post.caption}</p>
									<div className="text-sm pb-1 max-h-20  overflow-y-scroll scrollbar-hide">
										{post.comments.map((comment, index) => (
											<div key={index} className=" pt-1">
												<div className="flex items-center">
													<Image
														className="rounded-full object-cover mr-1 w-6 h-6"
														src={comment.profileImg}
														alt={comment.username}
														width={20}
														height={20}
													/>
													<p className="flex-1 font-bold capitalize">
														@{comment.username}
													</p>
												</div>

												<div className="text-gray-400 font-thin pt-1">
													{comment.comment}
												</div>
											</div>
										))}
									</div>
								</div>
							</motion.div>
						))}
					{filter === 'stories' &&
						userStories.map((story) => (
							<motion.div
								className="w-[630px]  max-w-full rounded-lg border border-gray-200 bg-white py-5 my-5"
								key={story.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<div className="flex items-center p-5">
									<Image
										className="rounded-full object-cover mr-3 w-12 h-12"
										src={story.profileImg}
										alt={story.username}
										width={40}
										height={40}
									/>
									<p className="flex-1 font-bold capitalize">
										@{story.username}
										<div className="text-gray-400 font-thin">
											{story.fullName}
										</div>
									</p>
									<div className="text-end">
										<div>
											{user?.id === params.id && (
												<div className="cursor-pointer">
													<button onClick={() => showAlertStory(story)}>
														<Image
															src="/svg/dots.svg"
															alt=""
															width={25}
															height={25}
														/>
													</button>
												</div>
											)}

											<Moment className="text-xs text-gray-400" fromNow>
												{story.timestamp?.toDate()}
											</Moment>
										</div>
									</div>
									<DeleteConfirmationModalStory
										isOpen={isStoryModalOpen}
										onClose={() => setStoryModalOpen(false)}
										onConfirm={() => {
											deleteStory(storyToDelete.id)
											setStoryModalOpen(false)
											toast.success('Story deleted successfully.')
										}}
									/>
								</div>
								<Image
									className="object-cover w-full max-h-96"
									src={story.image}
									alt=""
									width={300}
									height={300}
								/>
								<div className="p-5 font-semibold capitalize">
									<h1 className="font-semibold capitalize">{story.title}</h1>
									<p className="font-thin text-gray-400 pt-2">
										{story.caption}
									</p>
								</div>
							</motion.div>
						))}
				</>
			)}
		</div>
	)
}

export default Gallery
