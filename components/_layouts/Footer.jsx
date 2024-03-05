import Image from 'next/image'

function Footer() {
	return (
		<div
			className="shadow-sm border-t bg-white sticky bottom-0 z-50 
		flex md:hidden justify-center"
		>
			<div
				className="flex justify-between items-c max-w-6xl mx-5 h-14
			lg:mx-auto"
			>
				<div className="flex items-center  space-x-6">
					<Image
						src="/svg/home.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					<div className="relative navBtnClose">
						<Image
							src="/svg/send.svg"
							alt="home"
							width={10}
							height={10}
							className="navBtnClose "
						/>
						<div className="absolute -top-2 -right-2 text-base w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
							3
						</div>
					</div>
					<Image
						src="/svg/addCircle.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					<Image
						src="/svg/userGroup.svg"
						alt="home"
						width={10}
						height={10}
						className="navBtnClose"
					/>
					<Image
						src="/svg/like.svg"
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
				</div>
			</div>
		</div>
	)
}

export default Footer
