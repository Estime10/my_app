import { useRouter } from 'next/navigation'
import {
	addDoc,
	collection,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { auth, currentUser } from '@clerk/nextjs'

export async function uploadPostToFirebase({ caption, selectedFile }) {
	const { userId } = auth()
	const router = useRouter()

	// If the user is not signed in, redirect to the home page
	if (!userId) {
		router.push('/')
		return
	}

	const user = await currentUser()
	const docRef = await addDoc(collection(db, 'posts'), {
		username: user.username,
		caption: user.caption,
		profileImg: user.profileImg,
		timestamp: serverTimestamp(),
	})
	console.log('New doc added with ID: ', docRef.id)

	const imageRef = ref(storage, `posts/${docRef.id}/image`)
	await uploadString(imageRef, selectedFile, 'data_url').then(
		async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef)
			await updateDoc(doc(db, 'post', docRef.id), {
				image: downloadURL,
			})
		}
	)
}
