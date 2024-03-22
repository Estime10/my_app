import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
	collection,
	onSnapshot,
	doc,
	getDoc,
	deleteDoc,
	getDocs,
	query,
	where,
	updateDoc,
	deleteField,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { motion } from 'framer-motion'
import Moment from 'react-moment'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'
import { toast } from 'sonner'
import { set } from 'react-hook-form'

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
	const [username, setUsername] = useState('')
	const [filter, setFilter] = useState('')

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
					const unsubscribePosts = onSnapshot(postsRef, (snapshot) => {
						const posts = snapshot.docs
							.filter((doc) => doc.data().userId === params.id)
							.map((doc) => ({ id: doc.id, ...doc.data() }))
						setUserPosts(posts)
					})

					// Récupérer les stories de l'utilisateur depuis la collection 'stories'
					const storiesRef = collection(db, 'stories')
					const unsubscribeStories = onSnapshot(storiesRef, (snapshot) => {
						const stories = snapshot.docs
							.filter((doc) => doc.data().userId === params.id)
							.map((doc) => ({ id: doc.id, ...doc.data() }))
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

		// Mise à jour du filtre actif en fonction de la disponibilité des données
		if (userPosts.length === 0 && userStories.length > 0) {
			setFilter('stories')
		} else {
			setFilter('posts')
		}
	}, [params.id, userPosts.length, userStories.length])

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter)
	}

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
			console.log('Post deleted successfully.')
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	const showAlertPost = (post) => {
		showDeleteConfirmationPost(post)
	}

	return (
		<div className="max-w-6xl">
			{isLoading ? (
				<div className="flex items-center mt-10 justify-center w-full h-full lg:relative lg:top-12 left-44">
					<Loading />
				</div>
			) : (
				<>
					<div className="flex flex-col content-end items-center lg:w-[630px] ">
						<div className="flex justify-center space-x-14 mt-5 ">
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
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 lg:w-[630px] w-[350px] mx-auto mt-5 gap-4 bg-white rounded-lg p-4 sm:p-6  "
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{filter === 'posts' &&
							userPosts.map((post) => (
								<motion.div
									className="content cursor-pointer mb-40"
									key={post.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
								>
									<div class="content-overlay rounded-md max-w-full"></div>
									<Image
										onClick={() => showAlertPost(post)}
										className="lg:h-[200px] h-[250px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
										src={post.image}
										alt=""
										width={300}
										height={300}
									/>
									<div class="content-details fadeIn-bottom">
										{user.id === params.id && (
											<div>
												<button
													onClick={() => {
														setPostToDelete(post)
														setPostModalOpen(true)
													}}
												>
													<Image
														src="/svg/dotsWhite.svg"
														alt=""
														width={25}
														height={25}
													/>
												</button>
											</div>
										)}
										<h1 class="font-bold text-base lg:text-lg text-white capitalize">
											{post.title}
										</h1>
										<h3 class="font-light mt-2 lg:font-semibold text-xs lg:text-base text-white capitalize">
											{post.caption}
										</h3>
										<div>
											<Moment className="text-xs text-white" fromNow>
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
								</motion.div>
							))}
						{filter === 'stories' &&
							userStories.map((story) => (
								<motion.div
									className="content cursor-pointer"
									key={story.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
								>
									<div class="content-overlay rounded-md"></div>
									<Image
										onClick={() => showAlertStory(story)}
										className="lg:h-[200px] h-[250px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
										src={story.image}
										alt=""
										width={300}
										height={300}
									/>
									<div class="content-details fadeIn-bottom">
										{user.id === params.id && (
											<div>
												<button
													onClick={() => {
														setStoryToDelete(story)
														setStoryModalOpen(true)
													}}
												>
													<Image
														src="/svg/dotsWhite.svg"
														alt=""
														width={25}
														height={25}
													/>
												</button>
											</div>
										)}
										<Moment className="content-text text-white" fromNow>
											{story.timestamp?.toDate()}
										</Moment>
									</div>
								</motion.div>
							))}
						<DeleteConfirmationModalStory
							isOpen={isStoryModalOpen}
							onClose={() => setStoryModalOpen(false)}
							onConfirm={() => {
								deleteStory(storyToDelete.id)
								setStoryModalOpen(false)
								toast.success('Story deleted successfully.')
							}}
						/>
					</motion.div>
				</>
			)}
		</div>
	)
}

export default Gallery
