import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import {
	collection,
	doc,
	onSnapshot,
	deleteDoc,
	setDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

const Suggestion = ({ image, username, fullName }) => {
	const { user } = useUser()
	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, `following/${user.id}/i_m_following`),
			(querySnapshot) => {
				// Vérifiez si l'utilisateur actuel suit l'utilisateur suggéré
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
			// Inverser la valeur de isFollowing
			const newIsFollowing = !isFollowing

			if (newIsFollowing) {
				// Follow
				await setDoc(doc(db, `following/${user.id}/i_m_following`, username), {
					userId: user.id,
					username: user.username,
				})
				await setDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id),
					{
						userId: user.id,
						username: user.username,
					}
				)
				console.log(`User ${user.username} followed user ${username}`)
			} else {
				// Unfollow
				await deleteDoc(doc(db, `following/${user.id}/i_m_following`, username))
				await deleteDoc(
					doc(db, `followed/${username}/i_am_followed_by`, user.id)
				)
				console.log(`User ${user.username} unfollowed user ${username}`)
			}

			// Mettre à jour l'état isFollowing après la mise à jour réussie
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
