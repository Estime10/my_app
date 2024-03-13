import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { db } from '@/firebase'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

const ModalShowStory = () => {
	const { user } = useUser()
	const [modal, setModal] = useState(null)
	const [stories, setStories] = useState([])

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

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'stories'), where('userId', '==', user.id)),
			(snapshot) => {
				const storiesData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setStories(storiesData)
			}
		)
		return () => unsubscribe()
	}, [user])

	const toggleModal = () => {
		if (modal) {
			modal.toggle()
		}
	}

	const closeModal = () => {
		if (modal) {
			modal.hide()
		}
	}

	return (
		<div>
			<div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse">
				{/* Modal toggle */}
				<button
					data-modal-target="extralarge-modal"
					data-modal-toggle="extralarge-modal"
					className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
					onClick={toggleModal}
				>
					Extra large modal
				</button>
			</div>

			{/* Extra Large Modal */}
			<div
				id="extralarge-modal"
				className="fixed top-0 left-0 right-0 z-50 hidden w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
			>
				{/* Modal */}
				<div className="relative max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg md:w-2/3">
					{/* Modal content */}
					<div className="p-6">
						{/* Modal header */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Extra Large modal
							</h3>
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="extralarge-modal"
								onClick={closeModal}
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
						{/* Modal body */}
						{stories.map((story) => (
							<div key={story.id} className="space-y-4">
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Username: {story.username}
								</p>
								<Image
									src={story.image}
									alt="Story Image"
									width={500}
									height={300}
									className="rounded-lg"
								/>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									Story ID: {story.id}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalShowStory
