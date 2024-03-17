import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [noUsersFound, setNoUsersFound] = useState(false)
	const dropdownRef = useRef(null)

	const searchUsersByUsername = async (searchTerm) => {
		if (searchTerm.trim() === '') {
			setSearchResults([])
			setNoUsersFound(false)
			return
		}

		const usersRef = collection(db, 'users')
		const q = query(
			usersRef,
			where('username', '>=', searchTerm),
			where('username', '<=', searchTerm + '\uf8ff')
		)

		const querySnapshot = await getDocs(q)
		const users = []
		querySnapshot.forEach((doc) => {
			const userData = doc.data()
			users.push(userData)
		})

		setSearchResults(users)
		setNoUsersFound(users.length === 0)
	}

	const handleSearchChange = (event) => {
		const value = event.target.value
		setSearchTerm(value)
		searchUsersByUsername(value)
	}

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setSearchTerm('')
			setSearchResults([])
			setNoUsersFound(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleClickInside = (event) => {
		event.stopPropagation()
	}

	const handleSearchSubmit = (event) => {
		event.preventDefault()
		if (searchTerm.trim() !== '') {
			searchUsersByUsername(searchTerm)
		}
	}

	return (
		<div className="relative -left-24" onClick={handleClickInside}>
			<div className="py-3 rounded-md lg:right-[130px] w-[140px]">
				<form className="max-w-md mx-auto" onSubmit={handleSearchSubmit}>
					<div className="relative lg:-left-[162px]">
						<input
							type="search"
							id="default-search"
							className="block w-[200px] lg:w-[300px] ps-4 text-sm text-gray-900 border
							border-gray-300 rounded-lg bg-gray-50 focus:border-gray-400"
							placeholder="Search User..."
							required
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</form>
			</div>
			<motion.div
				ref={dropdownRef}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.3 }}
				className="absolute right-[-53px] lg:right-3 bg-gray-200 rounded-b-lg shadow-md lg:mt-[-0.75rem] mt-[-0.72rem] w-[185px] lg:w-[275px] z-10 max-h-44 overflow-y-auto"
			>
				{noUsersFound ? (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="text-gray-500 p-1 hover:bg-gray-300 rounded-sm border-b border-gray-500 uppercase text-center"
					>
						No users found
					</motion.div>
				) : (
					<ResearchResult searchResults={searchResults} />
				)}
			</motion.div>
		</div>
	)
}

const ResearchResult = ({ searchResults }) => (
	<>
		{searchResults.map((user) => (
			<motion.div
				key={user.id}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.3 }}
				className="p-1 hover:bg-gray-300 rounded-sm border-b border-gray-500"
			>
				<Link href={`/profile/${user.id}`}>
					<div className="flex items-center">
						<Image
							src={user.profileImg}
							alt="profile image"
							width={30}
							height={30}
							className="rounded-full cursor-pointer"
						/>
						<span className="ml-2 uppercase text-xs truncate">
							{user.username}
						</span>
					</div>
				</Link>
			</motion.div>
		))}
	</>
)

export default SearchBar
