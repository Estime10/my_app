'use client'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { modalState } from '@/app/store/atoms/modalAtoms'

function Header() {
	const [open, setOpen] = useRecoilState(modalState)

	return (
		<div className="shadow-sm border-b bg-white sticky top-0 z-50">
			<div
				className="flex justify-between  max-w-6xl mx-5
			lg:mx-auto"
			>
				{/* // left  */}
				<div className="relative hidden lg:inline-grid  w-44 h-0 top-[-52px] -left-[27.2px] cursor-pointer">
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
				<div className="relative w-20 top-1 flex-shrink-0 lg:hidden cursor-pointer">
					{/* logo mobile */}
					<Image
						src="/image/logo_small.png"
						alt="Picture of the author"
						width={40}
						height={40}
						className="h-20 w-20"
					/>
				</div>
				{/* // middle */}
				<div className="max-w-xl">
					<div className="relative mt-1 p-3 rounded-md lg:left-14">
						<div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
							<Image
								src="/svg/search.svg"
								alt=""
								width={20}
								height={20}
								className="h-5 w-5"
							/>
						</div>
						<input
							type="text"
							className="bg-gray-50 block w-full pl-10
						sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
							placeholder="Search"
						/>
					</div>
				</div>

				{/* // right */}
				<div className="flex items-center justify-end space-x-4 ">
					<Image
						src="/svg/home.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn lg:inline-flex"
					/>
					<div className="relative navBtn">
						<Image
							src="/svg/send.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtn"
						/>
						<div className="absolute -top-2 -right-2 text-base w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center animate-pulse text-white">
							3
						</div>
					</div>

					<Image
						onClick={() => setOpen(true)}
						src="/svg/addCircle.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
					<Image
						src="/svg/userGroup.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
					<Image
						src="/svg/like.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
					<UserButton
						afterSignOutUrl="/"
						className="h-8 w-8 rounded-full cursor-pointer navBtn"
					/>
					<SignedOut>
						<SignInButton afterSignInUrl="/dashboard" mode="modal" />
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Header
