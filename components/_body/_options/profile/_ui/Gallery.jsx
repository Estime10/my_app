import React from 'react'
import Image from 'next/image'

const Gallery = () => {
	return (
		<div className="max-w-6xl">
			{/* <div class="flex items-center justify-center  ">
				<button
					type="button"
					class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
				>
					Posts
				</button>
				<button
					type="button"
					class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
				>
					Stories
				</button>
			</div> */}

			<>
				<div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2  lg:w-[630px] mx-auto mt-10
			gap-4 bg-white rounded-lg p-4 sm:p-6"
				>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
					<div>
						<Image
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
							alt=""
							width={300}
							height={300}
						/>
					</div>
				</div>
			</>
		</div>
	)
}

export default Gallery
