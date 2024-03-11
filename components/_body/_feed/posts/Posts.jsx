import React, { useEffect, useState } from 'react'
import Post from './_ui/Post'

const Posts = ({ setLoading }) => {
	const [posts, setPosts] = useState([])

	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.data().username}
					profileImg={post.data().profileImg}
					image={post.data().image}
					caption={post.data().caption}
				/>
			))}
		</div>
	)
}

export default Posts
