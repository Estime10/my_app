'use client'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, modalStoryState } from '@/app/store/atoms/modalAtoms'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
function Footer() {
	const [openFirstModal, setOpenFirstModal] = useRecoilState(modalState)
	const [openSecondModal, setOpenSecondModal] = useRecoilState(modalStoryState)
	return (
		<div
			className="shadow-sm border-t bg-white sticky -bottom-1 z-50 
		flex md:hidden justify-center"
		>
			<div
				className="flex justify-between items-c max-w-6xl mx-5 h-14
			lg:mx-auto"
			>
				<div className="flex items-center  space-x-6">
					<div className="relative navBtnClose">
						<Image
							src="/svg/send.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose "
						/>
						<div className="absolute -top-2 -right-2 text-base w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white">
							3
						</div>
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
						src="/svg/profile.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>{' '}
					<UserButton afterSignOutUrl="/" className=" navBtnClose" />
					<SignedOut>
						<SignInButton afterSignInUrl="/dashboard" mode="modal" />
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Footer
