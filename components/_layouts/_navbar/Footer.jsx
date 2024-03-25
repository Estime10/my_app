'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Notifications from '@/components/_body/_users/notifications/_ui/Notifications'

function Footer() {
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
				<div className="flex items-center  space-x-6">
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
						{/* <div
							class="absolute block w-3 h-3 bg-gray-400 border-2 border-white rounded-full 
							top-[2px] right-[1.25rem]"
						></div> */}
					</div>
					<Image
						onClick={() => setOpenSecondModal(true)}
						src="/svg/image.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					<Image
						onClick={() => setOpenFirstModal(true)}
						src="/svg/addCircle.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					<Image
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						src="/svg/notification.svg"
						alt="notification"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					{/* <div class="absolute block w-3 h-3 bg-gray-400 border-2 border-white rounded-full top-3 right-[145px]"></div> */}
					{isDropdownOpen && (
						<div
							className="absolute block w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow bottom-16 right-2"
							aria-labelledby="dropdownNotificationButton"
						>
							<div className="block py-2 text-sm font-medium text-center rounded-t-lg bg-gray-50 hover:bg-gray-100 ">
								<h1 className="inline-flex items-center font-bold text-base uppercase">
									Notifications
								</h1>
							</div>
							<div className="divide-y divide-gray-100 ">
								<Notifications />
							</div>
						</div>
					)}
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

export default Footer
