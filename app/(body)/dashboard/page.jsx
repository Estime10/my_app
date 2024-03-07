import Feed from '@/components/_body/_feed/Feed'
import ModalPost from '@/components/_body/_feed/modal/ModalPost'

export default async function Dashbord() {
	return (
		<main className="bg-slate-50">
			<Feed />
			<ModalPost />
		</main>
	)
}
