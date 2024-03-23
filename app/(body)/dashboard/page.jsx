import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import HomePage from '@/components/_body/HomePage'
import ModalPost from '@/components/_modal/ModalPost'
import ModalStory from '@/components/_modal/ModalStory'

export default async function Dashbord() {
	const { userId } = auth()

	if (!userId) {
		redirect('/')
	}

	return (
		<main>
			<HomePage />
			<ModalPost />
			<ModalStory />
		</main>
	)
}
