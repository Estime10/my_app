'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import { useUser } from '@clerk/nextjs'
function FooterArchives() {
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}
	return (
		<div
			className="shadow-sm border-t bg-white fixed w-full -bottom-2 z-50 
		flex md:hidden justify-center"
		>
			<div
				className="flex justify-between items-c max-w-6xl mx-5 h-14
			lg:mx-auto"
			>
				<div className="flex items-center  space-x-20">
					<Link href="/dashboard">
						<Image
							src="/svg/home.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose"
						/>
					</Link>
					<div className="relative navBtnClose">
						<Image
							src="/svg/send.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose "
						/>
						<div className="absolute -top-2 -right-2 text-base w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white ">
							3
						</div>
					</div>

					<Link href={`/profiles/${user.id}`}>
						<Image
							src="/svg/profile.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose"
						/>
					</Link>
					<Link href={`/settings/${user.id}`}>
						<Image
							src="/svg/settings.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose"
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default FooterArchives
