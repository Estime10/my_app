'use client'
import Image from 'next/image'
import { modalState } from '@/app/store/atoms/modalAtoms'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'

const ModalPost = () => {
	const { user } = useUser()
	const [open, setOpen] = useRecoilState(modalState)
	const filePickerRef = useRef(null)
	const captionRef = useRef(null)
	const [loading, setLoading] = useState(false)
	const [selectedFile, setSelectedFile] = useState(null)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-center lg:items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all -mt-10 sm:align-middle sm:max-w-sm sm:w-full">
							<div>
								{selectedFile ? (
									<div className="flex-col flex justify-center items-center w-64 lg:w-full">
										{' '}
										<Image
											className="object-cover w-44 rounded-lg"
											src={selectedFile}
											alt="selected"
											width={130}
											height={130}
										/>
									</div>
								) : (
									<div
										onClick={() => filePickerRef.current.click()}
										className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 cursor-pointer"
									>
										<Image
											src="/svg/camera.svg"
											alt="camera"
											width={24}
											height={24}
										/>
									</div>
								)}
								<div>
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-lg leading-6 font-medium text-gray-900"
										>
											Upload a post
										</Dialog.Title>
										<div>
											<input
												ref={filePickerRef}
												type="file"
												hidden
												// onChange={addImageToPost}
											/>
										</div>
										<div>
											<input
												type="text"
												ref={captionRef}
												className="border-none focus:ring-0 w-full text-center"
												placeholder="Please enter a caption..."
											/>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<button
										type="button"
										disabled={!selectedFile}
										className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-gray-400 sm:text-sm disabled:bg-gray-200 disabled:cursor-not-allowed hover:disabled:bg-gray-200 capitalize"
										// onClick={uploadPost}
									>
										{loading ? 'Uploading...' : 'Upload Post'}
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default ModalPost
