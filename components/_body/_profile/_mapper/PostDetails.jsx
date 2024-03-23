'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Loading from '@/components/_layouts/_ui/Loading'
const PostId = () => {
	const [isLoading, setLoading] = useState(true)
	const params = useParams()
	const [postCaption, setPostCaption] = useState('')
	const [postImage, setPostImage] = useState('')
	const [comments, setComments] = useState([])
	const [postUsername, setPostUsername] = useState('')
	const [postProfileImg, setPostProfileImg] = useState('')
	const [postFullName, setPostFullName] = useState('')
	const [postTitle, setTitle] = useState('')

	useEffect(() => {
		const fetchPostData = async () => {
			try {
				// Récupérer les données du post depuis Firestore
				const postDocRef = doc(db, 'posts', params.id)
				const postDocSnap = await getDoc(postDocRef)

				if (postDocSnap.exists()) {
					const postData = postDocSnap.data()
					setPostCaption(postData.caption)
					setPostImage(postData.image)
					setPostUsername(postData.username)
					setPostProfileImg(postData.profileImg)
					setPostFullName(postData.fullName)
					setTitle(postData.title)
				} else {
					console.log('No such document exists!')
				}

				const commentsRef = collection(db, 'comments', params.id)
				const unsubscribeComments = onSnapshot(commentsRef, (snapshot) => {
					const comments = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setComments(comments)
				})

				setLoading(false)
			} catch (error) {
				console.error('Error fetching post data:', error)
				setLoading(false)
			}
		}

		fetchPostData()
	}, [params.id])

	return (
		<div className="flex">
			{isLoading ? (
				<div className="flex justify-center w-full ">
					<Loading />
				</div>
			) : (
				<>
					<div className="bg-white my-7 border rounded-xl">
						{/* header */}
						<div className="flex items-center p-5">
							<h1 className="font-semibold capitalize">{postTitle}</h1>
						</div>
						{/* image */}
						<div className="px-6">
							<Image
								src={postImage}
								alt="Post image"
								width={640}
								height={640}
								className="object-cover lg:w-[600px] lg:h-[450px] w-full h-full"
							/>
						</div>
						<div className="p-5">
							<div className="flex items-center mb-4">
								<Image
									className="rounded-full object-cover border p-1 mr-3 w-12 h-12"
									src={postProfileImg}
									alt={postUsername}
									width={40}
									height={40}
								/>
								<div className="flex flex-col pl-1 capitalize">
									<div className="flex items-center">
										<h5 className=" text-xl font-semibold tracking-tight text-gray-400 ">
											<span className=" text-sm">@</span>
											{postUsername}
										</h5>
									</div>

									<span className="text-sm font-semibold tracking-tight text-gray-400">
										{postFullName}
									</span>
								</div>
							</div>

							<p className="mx-3 font-semibold capitalize ">{postCaption}</p>
							<p>{comments}</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default PostId
