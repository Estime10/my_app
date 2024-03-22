import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Modal } from 'flowbite'
import Moment from 'react-moment'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@clerk/nextjs'

const StoryCard = ({ image, username, id, stories = {} }) => {
	const { isSignedIn, user } = useAuth()
	const [modal, setModal] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [storyDocId, setStoryDocId] = useState(null)
	const [storyData, setStoryData] = useState(null)
	const [progressWidth, setProgressWidth] = useState(0)
	const userId = id
	const storyId = Object.keys(stories)[0]
	const hasStory = stories[storyId]
	let timer

	// Fonction pour réinitialiser l'état de la modal et restaurer le style par défaut
	const resetModalState = () => {
		closeModal()
		// Réinitialiser d'autres états de style ici au besoin
	}

	useEffect(() => {
		let unsubscribe

		const fetchStoryData = async () => {
			try {
				if (hasStory) {
					const storyRef = doc(db, 'stories', storyId)
					unsubscribe = onSnapshot(storyRef, (doc) => {
						if (doc.exists()) {
							const newData = doc.data()
							console.log('Story data has changed:', newData)
							setStoryDocId(doc.id)
							setStoryData(newData)
						} else {
							console.log('Story does not exist.')
							// Si l'histoire n'existe plus, réinitialisez la modal et restaurez le style par défaut
							resetModalState()
						}
					})
				} else {
					console.log('User does not have a story.')
				}
			} catch (error) {
				console.error('Error fetching story data:', error)
			}
		}

		fetchStoryData()

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [hasStory, storyId])

	useEffect(() => {
		if (showModal && !modal) {
			const modalEl = document.getElementById('extralarge-modal')
			const newModal = new Modal(modalEl, {
				placement: 'center',
				backdrop: 'static',
			})
			setModal(newModal)
			timer = setTimeout(() => {
				closeModal()
			}, 5400)
			const interval = setInterval(() => {
				setProgressWidth((prevWidth) =>
					Math.min(prevWidth + 100 / (5000 / 100), 100)
				)
			}, 100)
			return () => {
				clearTimeout(timer)
				clearInterval(interval)
				setModal(null)
				setShowModal(false)
				setProgressWidth(0)
			}
		}
	}, [showModal])

	const toggleModal = (event) => {
		const isToggle = event.currentTarget.dataset.modalToggle
		const isBackground = event.target.id === 'extralarge-modal'
		if (isToggle) {
			if (hasStory) {
				setShowModal(!showModal)
			}
		} else if (isBackground) {
			closeModal()
		}
	}

	const closeModal = () => {
		clearTimeout(timer)
		if (modal) {
			modal.hide()
			setModal(null)
		}
		setShowModal(false)
		setProgressWidth(0)
	}

	const borderClass = hasStory ? 'border-red-400' : 'avatar'

	const updateStoryView = async () => {
		try {
			if (storyDocId) {
				await updateDoc(doc(db, 'stories', storyDocId), {
					views: storyData.views + 1,
				})
				console.log('Story view updated successfully.')
			}
		} catch (error) {
			console.error('Error updating story view:', error)
		}
	}

	useEffect(() => {
		if (showModal) {
			updateStoryView()
		}
	}, [showModal])

	return (
		<>
			<div>
				<div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse">
					<div
						data-modal-target="extralarge-modal"
						data-modal-toggle="extralarge-modal"
						className="flex flex-col w-full md:w-auto items-center justify-center"
					>
						<Image
							onClick={toggleModal}
							src={image}
							alt="test"
							width={800}
							height={800}
							data-modal-target="extralarge-modal"
							data-modal-toggle="extralarge-modal"
							className={`h-14 w-14 rounded-full border-2 p-[1.5px] object-cover md:w-auto cursor-pointer 
                            ${borderClass}`}
						/>
						<span className="text-xs w-14 truncate text-center cursor-default">
							{username}
						</span>
					</div>
				</div>
				<AnimatePresence>
					{showModal && (
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.5,
								backgroundColor: 'rgba(255, 255, 255, 0)',
							}}
							animate={{
								opacity: 1,
								scale: 1,
								backgroundColor: 'rgba(255, 255, 255, 1)',
							}}
							exit={{
								opacity: 0,
								scale: 0.5,
								backgroundColor: 'rgba(255, 255, 255, 0)',
							}}
							transition={{ duration: 0.5 }}
							className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 overflow-y-hidden"
							onClick={toggleModal}
						>
							<motion.div
								id="extralarge-modal"
								className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-white "
							>
								<div className="p-6">
									{storyData && (
										<div key={storyId} className="-mt-10">
											<div className="relative top-16">
												<div className="px-2 relative -top-2">
													<div className="w-full bg-gray-200 rounded-full h-0.5 dark:bg-gray-700 ">
														<div
															className="bg-gray-400 h-0.5 rounded-full "
															style={{ width: `${progressWidth}%` }}
														></div>
													</div>
												</div>
												<div className="flex items-center px-4 font-medium text-gray-100">
													<div className="flex flex-col">
														<h3 className="text-lg">{storyData.username}</h3>
														<Moment fromNow className="text-xs">
															{storyData.timestamp?.toDate()}
														</Moment>
													</div>
													<button
														type="button"
														className="hover:text-gray-600 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:scale-110 transition-transform duration-200 ease-out"
														data-modal-hide="extralarge-modal"
														onClick={closeModal}
													>
														<Image
															src="/svg/close.svg"
															alt="Close modal"
															width={20}
															height={20}
														/>
														<span className="sr-only">Close modal</span>
													</button>
												</div>
											</div>

											<Image
												src={storyData.image}
												alt="Story"
												width={400}
												height={400}
												className="rounded-lg w-[600px] h-[500px] object-cover lg:w-[710px] lg:h-[700px]"
											/>
										</div>
									)}
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}

export default StoryCard
