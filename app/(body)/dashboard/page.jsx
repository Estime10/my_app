import Feed from '@/components/_body/_feed/Feed'
import ModalPost from '@/components/_body/_feed/modal/ModalPost'
import ModalStory from '@/components/_body/_feed/modal/ModalSory'

export default async function Dashbord() {
	return (
		<main>
			<Feed />
			<ModalPost />
			<ModalStory />
		</main>
	)
}
