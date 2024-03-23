import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { motion } from 'framer-motion'
import Moment from 'react-moment'
import { useUser } from '@clerk/nextjs'
import Loading from '@/components/_layouts/_ui/Loading'
import Link from 'next/link'

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

	return (
		<div className="lg:w-[630px] h-[1120px] w-[400px] lg:h-[1250px] ">
			{isLoading ? (
				<div className="flex items-center mt-10  w-full h-full lg:relative lg:top-12 left-60">
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
										border border-gray-200 bg-white mb-10"
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
													<button>
														<Link href={`/posts/${post.id}`}>
															<Image
																src="/svg/dots.svg"
																alt=""
																width={25}
																height={25}
															/>
														</Link>
													</button>
												</div>
											)}

											<Moment className="text-xs text-gray-400" fromNow>
												{post.timestamp?.toDate()}
											</Moment>
										</div>
									</div>
								</div>
								<Image
									className="object-cover w-full max-h-96"
									src={post.image}
									alt=""
									width={300}
									height={300}
								/>
								<div className="p-5 font-semibold capitalize">
									<h1 className="font-semibold capitalize">{post.title}</h1>
									<p className="font-thin text-gray-400 pt-2">{post.caption}</p>
								</div>
							</motion.div>
						))}
					{filter === 'stories' &&
						userStories.map((story) => (
							<motion.div
								className="w-[630px]  max-w-full rounded-lg
										border border-gray-200 bg-white mb-10"
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
													<button>
														<Link href={`/stories/${story.id}`}>
															<Image
																src="/svg/dots.svg"
																alt=""
																width={25}
																height={25}
															/>
														</Link>
													</button>
												</div>
											)}

											<Moment className="text-xs text-gray-400" fromNow>
												{story.timestamp?.toDate()}
											</Moment>
										</div>
									</div>
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
