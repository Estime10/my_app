import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { motion } from 'framer-motion'

const Gallery = () => {
	const params = useParams()
	const [userPosts, setUserPosts] = useState([])
	const [userStories, setUserStories] = useState([])
	const [username, setUsername] = useState('')
	const [filter, setFilter] = useState('posts')

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
			}
		}

		fetchUserData()
	}, [params.id])

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter)
	}

	return (
		<div className="max-w-6xl">
			<div className="flex flex-col content-end items-center lg:w-[630px] ">
				<div className="flex justify-center space-x-14 mt-5 ">
					<button
						onClick={() => handleFilterChange('posts')}
						className={`btn-filter ${filter === 'posts' && 'active'} ${userPosts.length === 0 ? 'disabled' : ''}`}
						disabled={userPosts.length === 0} // Désactiver si le tableau userPosts est vide
					>
						Posts
					</button>
					<button
						onClick={() => handleFilterChange('stories')}
						className={`btn-filter ${filter === 'stories' && 'active'} ${userStories.length === 0 ? 'btn-disabled' : ''}`}
						disabled={userStories.length === 0} // Désactiver si le tableau userStories est vide
					>
						Stories
					</button>
				</div>
			</div>
			<motion.div
				className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:w-[630px] mx-auto mt-5 gap-4 bg-white rounded-lg p-4 sm:p-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{filter === 'posts' &&
					userPosts.map((post) => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								className="lg:h-[200px] h-[150px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
								src={post.image}
								alt=""
								width={300}
								height={300}
							/>
						</motion.div>
					))}
				{filter === 'stories' &&
					userStories.map((story) => (
						<motion.div
							key={story.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								className="lg:h-[200px] h-[150px] max-w-full rounded-lg bg-contain bg-center bg-no-repeat"
								src={story.image}
								alt=""
								width={300}
								height={300}
							/>
						</motion.div>
					))}
			</motion.div>
		</div>
	)
}

export default Gallery