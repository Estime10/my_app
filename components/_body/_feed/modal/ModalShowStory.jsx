import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import Image from 'next/image'

const ModalShowStory = () => {
	const [modal, setModal] = useState(null)
	const [stories, setStories] = useState([])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'stories'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setStories(snapshot.docs)
			}
		)
		return () => unsubscribe()
	}, [db])

	useEffect(() => {
		const modalEl = document.getElementById('extralarge-modal')
		const newModal = new Modal(modalEl, {
			placement: 'center',
			backdrop: 'static',
		})
		setModal(newModal)

		return () => {
			if (modal) {
				modal.hide()
			}
		}
	}, [])

	const toggleModal = () => {
		console.log('Modal toggled')
		if (modal) {
			modal.toggle()
		}
	}

	return (
		<div>
			<div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse">
				<button
					onClick={toggleModal}
					className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Extra large modal
				</button>
			</div>
			<div
				id="extralarge-modal"
				tabIndex="-1"
				className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative w-full max-w-7xl max-h-full">
					{stories.map((story) => (
						<div
							key={story.id}
							className="relative bg-white rounded-lg shadow dark:bg-gray-700"
						>
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-medium text-gray-900 dark:text-white">
									{story.data().username}
								</h3>
								<button
									onClick={toggleModal}
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="extralarge-modal"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							<div className="p-4 md:p-5 space-y-4">
								<p>{story.data().username}</p>
								<Image
									src={story.data().profileImg}
									alt="test"
									width={80}
									height={80}
									className="h-14 w-14 rounded-full border-black border-2 p-[1.5px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
								/>
								<div className="w-[250px]">
									<Image
										src={story.data().image}
										alt="test"
										width={80}
										height={80}
										className="h-full w-full  border-black border-2 p-[1.5px] object-cover"
									/>
								</div>

								<p>{story.data().name}</p>
							</div>
							<div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ModalShowStory
