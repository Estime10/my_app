import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase' // Importez votre configuration Firebase depuis un fichier séparé
import Link from 'next/link'

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [noUsersFound, setNoUsersFound] = useState(false) // Initialiser l'état noUsersFound à false
	const dropdownRef = useRef(null)

	// Fonction pour rechercher des utilisateurs par leur nom d'utilisateur
	const searchUsersByUsername = async (searchTerm) => {
		if (searchTerm.trim() === '') {
			console.log('Le terme de recherche est vide.')
			setSearchResults([])
			setNoUsersFound(false) // Réinitialiser l'état noUsersFound lorsque la recherche est vide
			return
		}

		// Créer une référence à la collection 'users'
		const usersRef = collection(db, 'users')

		// Créer une requête pour rechercher les utilisateurs avec le nom d'utilisateur correspondant au terme de recherche
		const q = query(
			usersRef,
			where('username', '>=', searchTerm),
			where('username', '<=', searchTerm + '\uf8ff')
		)

		// Exécuter la requête et récupérer les résultats
		const querySnapshot = await getDocs(q)

		// Récupérer les données des utilisateurs correspondants
		const users = []
		querySnapshot.forEach((doc) => {
			// Récupérer les données de chaque document utilisateur
			const userData = doc.data()
			console.log('Utilisateur trouvé:', userData)
			// Ajouter les données utilisateur à un tableau
			users.push(userData)
		})

		// Mettre à jour les résultats de recherche
		setSearchResults(users)

		// Mettre à jour l'état noUsersFound en fonction des résultats de la recherche
		setNoUsersFound(users.length === 0) // Mettre à jour l'état noUsersFound si le tableau users est vide

		console.log('Résultats de la recherche:', users)
	}

	// Gérer les modifications dans le champ de recherche
	const handleSearchChange = (event) => {
		const value = event.target.value
		setSearchTerm(value)
		console.log('Terme de recherche mis à jour:', value)
		searchUsersByUsername(value)
	}

	// Effacer le contenu du champ de recherche lorsque l'utilisateur clique en dehors de l'input
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setSearchTerm('')
			setSearchResults([])
			setNoUsersFound(false) // Réinitialiser l'état noUsersFound à false lorsque l'utilisateur clique en dehors de l'input
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleClickInside = (event) => {
		// Empêcher la propagation de l'événement pour éviter que handleClickOutside ne se déclenche
		event.stopPropagation()
	}

	const handleSearchSubmit = (event) => {
		event.preventDefault() // Empêcher le comportement par défaut du formulaire
		if (searchTerm.trim() !== '') {
			searchUsersByUsername(searchTerm)
		}
	}

	return (
		<div className="relative -left-32" onClick={handleClickInside}>
			<div className="py-3 rounded-md lg:right-[130px] w-[140px]">
				<form className="max-w-md mx-auto" onSubmit={handleSearchSubmit}>
					<div className="relative lg:-left-[162px]">
						<input
							type="search"
							id="default-search"
							className="block w-[270px] lg:w-[300px] ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-400"
							placeholder="Search User..."
							required
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</form>
			</div>
			{/* Afficher l'aperçu des utilisateurs correspondants */}
			<div
				ref={dropdownRef}
				className="absolute right-[-120px] lg:right-3 bg-gray-200  rounded-b-lg shadow-md lg:mt-[-0.75rem] mt-[-0.72rem] w-[245px] lg:w-[275px] z-0 max-h-44 "
			>
				{noUsersFound ? (
					<div className="text-gray-500 p-1 hover:bg-gray-300 rounded-sm border-b border-gray-500 uppercase text-center">
						No users found
					</div>
				) : (
					<ResearchResult searchResults={searchResults} />
				)}
			</div>
		</div>
	)
}

// Composant ResearchResult pour afficher les résultats de la recherche
const ResearchResult = ({ searchResults }) => (
	<>
		{searchResults.map((user) => (
			<div
				key={user.id}
				className="p-1 hover:bg-gray-300 rounded-sm border-b border-gray-500"
			>
				{/* Utiliser Link de Next.js pour envelopper le nom d'utilisateur dans un lien */}
				<Link href={`/profile/${user.id}`}>
					<div className="flex items-center ">
						<Image
							src={user.profileImg}
							alt="profile image"
							width={30}
							height={30}
							className="rounded-full cursor-pointer"
						/>
						<span className="ml-2 uppercase ">{user.username}</span>
					</div>
				</Link>
			</div>
		))}
	</>
)

export default SearchBar
