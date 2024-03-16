import { auth, clerkClient } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Feed from '@/components/_body/_feed/Feed'
import ModalPost from '@/components/_body/_feed/modal/ModalPost'
import ModalStory from '@/components/_body/_feed/modal/ModalStory'

export default async function Dashbord() {
	const { userId } = auth()

	if (!userId) {
		redirect('/')
	}

	return (
		<main>
			<Feed />
			<ModalPost />
			<ModalStory />
		</main>
	)
}
