import React, { useEffect, useState } from 'react'
import Post from '../_ui/Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

const Posts = ({ setLoading }) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setPosts(snapshot.docs)
			}
		)

		return () => unsubscribe()
	}, [setLoading, db])

	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.data().username}
					profileImg={post.data().profileImg}
					image={post.data().image}
					title={post.data().title}
					caption={post.data().caption}
				/>
			))}
		</div>
	)
}

export default Posts
