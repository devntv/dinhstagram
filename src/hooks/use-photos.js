/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId, getPhotos } from '../services/firebase'

export default function usePhotos() {
	const [photos, setPhotos] = useState(null)
	// const { user } = useContext(UserContext)
	const {
		user: { uid: userId = '' },
	} = useContext(UserContext)

	useEffect(() => {
		async function getTimeLinePhoto() {
			const [{ following }] = await getUserByUserId(userId)
			let followedUserPhotos = []
			// console.log(following)
			if (following.length > 0) {
				followedUserPhotos = await getPhotos(userId, following)
			}
			followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
			setPhotos(followedUserPhotos)
		}
		// console.log(userId)
		// if (userId) {
		getTimeLinePhoto()
		// }
	}, [userId])

	return { photos }
}
