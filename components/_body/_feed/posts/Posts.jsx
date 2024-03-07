'use client'
import React, { useEffect, useState } from 'react'
import Post from './_ui/Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'

const Posts = () => {
	const { user } = useUser()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (user) {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'users', user.id, 'posts'),
					orderBy('timestamp', 'desc')
				),
				(snapshot) => {
					const fetchedPosts = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setPosts(fetchedPosts)
				}
			)

			return () => unsubscribe()
		}
	}, [user])

	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.fullName}
					userAvatar={post.profileImg}
					image={post.image}
					caption={post.caption}
				/>
			))}
		</div>
	)
}

export default Posts
