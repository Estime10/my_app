import React from 'react'
import Post from './_ui/Post'
import post from '../../../_mapper/post'

const Posts = () => {
	return (
		<div>
			{post.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.username}
					userAvatar={post.userAvatar}
					image={post.image}
					caption={post.caption}
				/>
			))}
		</div>
	)
}

export default Posts
