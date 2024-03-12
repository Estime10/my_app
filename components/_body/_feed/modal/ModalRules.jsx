'use client'
import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
const ModalRules = () => {
	const { user } = useUser()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const modalEl = document.getElementById('static-modal')

		const modal = new Modal(modalEl, {
			placement: 'center',
			backdrop: 'static',
		})

		modal.show()

		return () => {
			modal.hide()
		}
	}, [])

	// Fonction pour gérer la redirection vers /dashboard
	const handleAccept = async () => {
		if (loading || !user) return

		setLoading(true)

		const userRef = doc(db, 'users', user.id)
		const userDoc = await getDoc(userRef)

		if (!userDoc.exists()) {
			// Si l'utilisateur n'existe pas, créez-le
			await setDoc(userRef, {
				fullName: user.fullName,
				username: user.username,
				profileImg: user.imageUrl,
				timestamp: serverTimestamp(),
			})
		}

		// Rediriger vers /dashboard
		router.push('/dashboard')
	}

	return (
		<div>
			<div>
				<div>
					<div
						id="static-modal"
						data-modal-backdrop="static"
						tabIndex="-1"
						aria-hidden="true"
						className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div className="relative p-4 w-full max-w-2xl max-h-full">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-300">
								<div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t ">
									<h3 className="text-xl font-semibold">
										General Data Protection Regulation (G.D.P.R.)
									</h3>
								</div>
								<div className="p-4 md:p-5 space-y-4">
									<p className="text-base leading-relaxed ">
										With less than a month to go before the European Union
										enacts new consumer privacy laws for its citizens, companies
										around the world are updating their terms of service
										agreements to comply.
									</p>
									<p className="text-base leading-relaxed ">
										The European Union’s General Data Protection Regulation
										(G.D.P.R.) goes into effect on May 25 and is meant to ensure
										a common set of data rights in the European Union. It
										requires organizations to notify users as soon as possible
										of high-risk data breaches that could personally affect
										them.
									</p>
								</div>
								<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
									<button
										data-modal-hide="static-modal"
										type="button"
										className="text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
										onClick={handleAccept}
									>
										I accept
									</button>
									<button
										disabled
										data-modal-hide="static-modal"
										type="button"
										className="cursor-not-allowed py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none bg-transparent rounded-lg border border-gray-200 "
									>
										Decline
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalRules
