'use client'
import Image from 'next/image'
<<<<<<< HEAD
import Link from 'next/link'
=======
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import Link from 'next/link'

function Header() {
<<<<<<< HEAD
	const [open, setOpen] = useRecoilState(modalState)
	const [openStory, setOpenStory] = useRecoilState(modalState)

	return (
		<div className="shadow-sm border-b bg-white sticky top-0 z-50">
			<div
				className="flex justify-between  max-w-6xl mx-5 h-14
			lg:mx-auto"
			>
				{/* // left  */}
=======
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)

	return (
		<div className="shadow-sm border-b bg-white sticky top-0 z-50">
			<div className="flex justify-between  max-w-6xl mx-5 h-14 lg:mx-auto">
				{/* left */}
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
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
				<div className="relative w-24 top-0 flex-shrink-0 lg:hidden cursor-pointer">
					{/* logo mobile */}
					<Image
						src="/image/logo_small-removebg-preview.png"
						alt="Picture of the author"
						width={40}
						height={40}
						className="h-20 w-20"
					/>
				</div>
<<<<<<< HEAD
				{/* // middle */}
=======
				{/* middle */}
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
				<div className="flex items-center space-x-20 relative top-[5px] right-7 ">
					<div className="relative navBtn">
						<Image
							src="/svg/send.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtn"
						/>
						<div className="absolute -top-1 -right-2 text-base w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center  text-white">
							3
						</div>
					</div>
					<Image
<<<<<<< HEAD
						onClick={() => setOpen(true)}
=======
						onClick={() => setOpenFirstModal(true)}
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
						src="/svg/addCircle.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
					<Image
<<<<<<< HEAD
						onClick={() => setOpenStory(true)}
=======
						onClick={() => setOpenSecondModal(true)}
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
						src="/svg/image.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
					<Image
						src="/svg/profile.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtn"
					/>
				</div>

<<<<<<< HEAD
				{/* // right */}
=======
				{/* right */}
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6

				<div className="max-w-xl">
					<div className="relative py-3 rounded-md lg:right-[130px]">
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
<<<<<<< HEAD
							className="-50 block lg:w-[300px] w-[250px] pl-10
						sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
=======
							className="-50 block lg:w-[300px] w-[250px] pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
>>>>>>> 4b34e396b9a0fb1039c888a98f5d6c35cba2a9f6
							placeholder="Search"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
