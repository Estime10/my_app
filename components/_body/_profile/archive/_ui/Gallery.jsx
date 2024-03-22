import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
	collection,
	onSnapshot,
	doc,
	getDoc,
	deleteDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { motion } from 'framer-motion'
import Moment from 'react-moment'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'
import { toast } from 'sonner'

const Gallery = () => {
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

	const deletePost = async (postId) => {
		try {
			await deleteDoc(doc(db, 'posts', postId))
			console.log('Post deleted successfully.')
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	const deleteStory = async (storyId) => {
		try {
			await deleteDoc(doc(db, 'stories', storyId))
			console.log('Story deleted successfully.')
		} catch (error) {
			console.error('Error deleting story:', error)
		}
	}

	const showalertStory = (story) => {
		deleteStory(story.id)
		toast.success('Story deleted successfully.')
	}

	const showalertPost = (post) => {
		deletePost(post.id)
		toast.success('Post deleted successfully.')
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
										className="lg:h-[200px] h-[250px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
										src={post.image}
										alt=""
										width={300}
										height={300}
									/>
									<div class="content-details fadeIn-bottom">
										{user.id === params.id && (
											<div>
												<button>
													<Image
														onClick={() => showalertPost(post)}
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
										onClick={() => showalertStory(story)}
										className="lg:h-[200px] h-[250px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
										src={story.image}
										alt=""
										width={300}
										height={300}
									/>
									<div class="content-details fadeIn-bottom">
										{user.id === params.id && (
											<div>
												<button>
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
					</motion.div>
				</>
			)}
		</div>
	)
}

export default Gallery
