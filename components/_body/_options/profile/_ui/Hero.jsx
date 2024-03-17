import React from 'react'
import Image from 'next/image'

const Hero = () => {
	return (
		<div className="bg-white rounded-lg py-12 px-4 w-full lg:w-[630px] sm:px-6 lg:px-8">
			<div className="mx-auto md:flex md:items-center md:justify-between">
				<div className="md:flex md:items-center">
					<div className="md:flex-shrink-0">
						<div className="rounded-full border-4 border-gray-400 p-1 w-20 h-20 lg:w-40 lg:h-40 overflow-hidden">
							<Image
								src="/image/impulse.png"
								alt="profile"
								width={160}
								height={160}
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="mt-4 md:mt-0 md:ml-6">
						<div className="flex items-center justify-between">
							<h1 className="text-3xl font-bold capitalize">épure.</h1>
							<button className="btn-hover">Follow</button>
						</div>
						<p className="mt-2 text-gray-400 text-lg">
							Full stack developer, UI/UX designer, and a content creator
						</p>{' '}
						<div className="flex capitalize font-semibold">
							<div>
								posts
								<span className="font-bold text-gray-400"> 1.5M</span>
							</div>
							<div>
								stories
								<span className="font-bold text-gray-400"> 1.5M</span>
							</div>
							<div>
								followers
								<span className="font-bold text-gray-400"> 1.5M</span>
							</div>
							<div>
								following
								<span className="font-bold text-gray-400"> 1.5M</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
