import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
	collection,
	doc,
	onSnapshot,
	deleteDoc,
	setDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'

const Suggestion = ({ image, username, fullName }) => {
	const { user } = useUser()
	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, `following/${user.id}/i_m_following`),
			(querySnapshot) => {
				const isFollowing = querySnapshot.docs.some(
					(doc) => doc.id === username
				)
				setIsFollowing(isFollowing)
			}
		)
		return () => unsubscribe()
	}, [db, user.id, username])

	const toggleFollow = async () => {
		if (!user) return

		try {
			const newIsFollowing = !isFollowing

			if (newIsFollowing) {
				await setDoc(doc(db, `following/${user.id}/i_m_following`, username), {
					userId: user.id,
					username: user.username,
					image: user.imageUrl,
					fullName: user.fullName,
				})
				await setDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id),
					{
						userId: user.id,
						username: user.username,
						image: user.imageUrl,
						fullName: user.fullName,
					}
				)
			} else {
				await deleteDoc(doc(db, `following/${user.id}/i_m_following`, username))
				await deleteDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id)
				)
			}

			setIsFollowing(newIsFollowing)
		} catch (error) {
			console.error('Error following/unfollowing user:', error)
		}
	}
	return (
		<div className="flex items-center mt-3">
			<Image
				className="rounded-full border p-[2px] w-10 h-10"
				src={image}
				alt="profile pic"
				width={40}
				height={40}
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-semibold">{username}</h2>
				<h3 className="text-xs text-gray-600">{fullName}</h3>
			</div>
			<div className="mt-4 lg:mt-0">
				<button
					className={`btn-hover ${isFollowing ? 'hidden' : ''}`}
					onClick={toggleFollow}
				>
					Follow
				</button>
				<button
					className={`btn-unfollow ${isFollowing ? '' : 'hidden'}`}
					onClick={toggleFollow}
				>
					Unfollow
				</button>
			</div>
		</div>
	)
}

export default Suggestion
