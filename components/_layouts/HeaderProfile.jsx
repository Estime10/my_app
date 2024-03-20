'use client'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
function HeaderOption() {
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<>
			<div
				className="shadow-sm border-b bg-white sticky 
		-top-[12px]
		lg:top-0 z-50"
			>
				<div className="hidden lg:flex justify-between  max-w-6xl mx-5 h-14 lg:mx-auto">
					{/* left */}
					<div className="relative hidden lg:inline-grid  w-44 h-0 top-[-58px] left-[100px] cursor-pointer">
						{/* logo large */}
						<Link href="/dashboard">
							<Image
								src="/image/logo.png"
								alt="Picture of the author"
								width={300}
								height={40}
							/>
						</Link>
					</div>
					<div className="relative w-16 -top-[5px] lg:top-0 flex-shrink-0 lg:hidden cursor-pointer">
						{/* logo mobile */}

						<Image
							src="/image/logo_small-removebg-preview.png"
							alt="Picture of the author"
							width={40}
							height={40}
							className="h-20 w-20"
						/>
					</div>
					{/* middle */}
					<div className="flex items-center space-x-12 relative top-[5px] right-[515px] ">
						<div className="relative navBtn">
							<Image
								src="/svg/send.svg"
								alt="send"
								width={10}
								height={10}
								className="navBtn"
							/>
							<div className="absolute -top-1 -right-2 text-base w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center  text-white">
								3
							</div>
						</div>
						<Image
							onClick={() => setOpenFirstModal(true)}
							src="/svg/addCircle.svg"
							alt="post"
							width={10}
							height={10}
							className="navBtn"
						/>
						<Image
							onClick={() => setOpenSecondModal(true)}
							src="/svg/image.svg"
							alt="story"
							width={10}
							height={10}
							className="navBtn"
						/>
						<Link href={`/settings/${user.id}`}>
							<Image
								src="/svg/settings.svg"
								alt="settings"
								width={10}
								height={10}
								className="navBtn"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeaderOption
