import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ModalPost from '@/components/_modal/ModalPost'
import ModalStory from '@/components/_modal/ModalStory'
import ProfilePage from '@/components/_body/ProfilePage'

export default async function Profiles() {
	const { userId } = auth()

	if (!userId) {
		redirect('/dasboard')
	}

	return (
		<main>
			<ProfilePage />
			<ModalPost />
			<ModalStory />
		</main>
	)
}
