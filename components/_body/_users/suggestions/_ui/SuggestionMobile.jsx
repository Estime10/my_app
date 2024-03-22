'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { Modal } from 'flowbite'
import Suggestion from './Suggestion'
import { db } from '@/firebase'
import Image from 'next/image'
import Moment from 'react-moment'

const SuggestionMobile = () => {
	const [users, setUsers] = useState([])
	const { user } = useUser()
	const [modal, setModal] = useState(null)
	const [showModal, setShowModal] = useState(true)

	useEffect(() => {
		if (!user) return
		const unsubscribe = onSnapshot(
			query(collection(db, 'users'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()))
			}
		)
		return () => unsubscribe()
	}, [user])

	useEffect(() => {
		if (showModal && !modal) {
			const modalEl = document.getElementById('timeline-modal')
			const newModal = new Modal(modalEl, {
				placement: 'center',
				backdrop: 'static',
			})
			setModal(newModal)
		}
	}, [showModal])

	return (
		<>
			<div id="timeline-modal" tabIndex="-1" aria-hidden="true">
				<div className="">
					<div className=" bg-white  shadow w-[400px]">
						<div className="px-10 md:p-5">
							<ol className="flex flex-col ">
								{users
									.filter((u) => u.username !== user.username)
									.map((user) => (
										<li
											key={user.id}
											className="flex flex-col  p-1 border-b border-gray-200"
										>
											<Suggestion
												id={user.id}
												username={user.username}
												image={user.profileImg}
												fullName={user.fullName}
											/>
											<div className="flex items-center text-gray-500  mt-2 space-x-2">
												<span className="text-xs">member since</span>
												<Moment
													fromNow
													className="block text-xs font-normal leading-none text-gray-500"
												>
													{user.timestamp?.toDate()}
												</Moment>
											</div>
										</li>
									))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default SuggestionMobile
