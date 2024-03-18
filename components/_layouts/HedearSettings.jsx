'use client'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
function HeaderSettings() {
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<>
			<div
				className=" shadow-sm border-b bg-white sticky 
		-top-[12px]
		lg:top-0 z-50"
			>
				<div className="hidden lg:flex justify-center items-center space-x-10 max-w-6xl mx-5 h-14 lg:mx-auto">
					<Link href="/dashboard/">
						<Image
							src="/svg/home.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtn"
						/>
					</Link>
					<Link href={`/profile/${user.id}`}>
						<Image
							src="/svg/profile.svg"
							alt="profile"
							width={10}
							height={10}
							className="navBtn"
						/>
					</Link>
				</div>
			</div>
		</>
	)
}

export default HeaderSettings
