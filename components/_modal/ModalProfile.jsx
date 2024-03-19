import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { modalProfileState } from '@/app/store/atoms/modalAtoms'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
	addDoc,
	collection,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'

const ModalProfile = () => {
	const { user } = useUser()
	const [openProfile, setOpenProfile] = useRecoilState(modalProfileState)
	const [bio, setBio] = useState('')
	const captionRef = useRef(null)
	const [loading, setLoading] = useState(false)

	const uploadBio = async () => {
		if (loading || !user) return

		setLoading(true)

		const userRef = doc(db, 'users', user.id)
		const userDoc = await getDoc(userRef)

		if (userDoc.exists()) {
			await setDoc(
				userRef,
				{
					biography: bio,
				},
				{ merge: true }
			)

			// Récupérer la biographie mise à jour de la base de données
			const updatedUserDoc = await getDoc(userRef)
			const updatedBio = updatedUserDoc.data().biography

			// Mettre à jour l'état local de la biographie
			setBio(updatedBio)
		}

		setOpenProfile(false)
		setLoading(false)
	}

	useEffect(() => {
		if (captionRef.current) {
			captionRef.current.value = bio
		}
	}, [bio])

	return (
		<>
			<Transition.Root show={openProfile} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto"
					onClose={setOpenProfile}
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
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 cursor-default">
										<Image
											src="/svg/writte.svg"
											alt="writte"
											width={24}
											height={24}
										/>
									</div>
									<div>
										<div className="mt-3 text-center sm:mt-5">
											<Dialog.Title
												as="h3"
												className="text-lg leading-6 font-medium text-gray-900 capitalize"
											>
												let us know more about you
											</Dialog.Title>
										</div>
									</div>
									<div>
										<input
											type="text"
											ref={captionRef}
											onChange={(e) => setBio(e.target.value)}
											className="border-none focus:ring-0 w-full text-center"
											placeholder="Please enter a caption..."
										/>
									</div>
									<div className="mt-5 text-center sm:mt-6">
										<button
											type="button"
											className="btn-uploads"
											onClick={uploadBio}
										>
											{loading ? 'Uploading...' : 'Upload Bio'}
										</button>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}

export default ModalProfile
