'use client'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
function HeaderOption() {
	const { isSignedIn, user } = useUser()

	if (!isSignedIn) {
		return null
	}

	return (
		<>
			<div
				className="shadow-sm border-b bg-white sticky 
		-top-[12px]
		lg:top-0 z-100"
			>
				<div className="flex justify-center  max-w-6xl mx-5 h-14 ">
					{/* middle */}
					<div className="flex items-center space-x-10">
						<Link href="/dashboard/">
							<Image
								src="/svg/home.svg"
								alt="home"
								width={10}
								height={10}
								className="navBtnClose"
							/>
						</Link>
						<Link href={`/settings/${user.id}`}>
							<Image
								src="/svg/settings.svg"
								alt="settings"
								width={10}
								height={10}
								className="navBtnClose"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default HeaderOption
