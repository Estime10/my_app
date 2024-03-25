'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Notifications from '@/components/_body/_users/notifications/_ui/Notifications'

function HeaderOption() {
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)
	const [showDropdown, setShowDropdown] = useState(false)

	const { isSignedIn, user } = useUser()

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
					<div className="flex items-center space-x-16 relative top-[5px] right-[400px]">
						<Image
							src="/svg/send.svg"
							alt="send"
							width={10}
							height={10}
							className="navBtn"
						/>
						<div
							class="absolute block w-3 h-3 bg-gray-400 border-2 border-white rounded-full 
							top-[12px] left-[-66px]"
						></div>
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
						<div>
							<Image
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								src="/svg/notification.svg"
								alt="notification"
								width={10}
								height={10}
								className="navBtn"
							/>
							{/* <div class="absolute block w-3 h-3 bg-gray-400 border-2 border-white rounded-full top-3 right-24"></div> */}

							{isDropdownOpen && (
								<div
									className="absolute block w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
									aria-labelledby="dropdownNotificationButton"
								>
									<div className="block px-4 py-2 font-bold uppercase text-center rounded-t-lg bg-gray-50">
										Notifications
									</div>
									<div className="divide-y divide-gray-100 dark:divide-gray-700">
										{/* Intégrez votre composant de notification ici */}
										<Notifications />
									</div>
								</div>
							)}
						</div>

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
