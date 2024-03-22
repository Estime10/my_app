'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function HeaderArchives() {
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

					{/* middle */}
					<div className="flex items-center space-x-12 relative top-[5px] right-[438px] ">
						<Link href="/dashboard">
							<Image
								src="/svg/home.svg"
								alt="post"
								width={10}
								height={10}
								className="navBtn"
							/>
						</Link>
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
						<Link href={`/profiles/${user.id}`}>
							<Image
								src="/svg/profile.svg"
								alt="post"
								width={10}
								height={10}
								className="navBtn"
							/>
						</Link>

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

export default HeaderArchives
