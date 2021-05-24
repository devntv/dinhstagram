/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react'
import { getPhotos } from '../services/firebase'

export default function usePhotos(user) {
	const [photos, setPhotos] = useState(null)
	// const { user } = useContext(UserContext)

	useEffect(() => {
		async function getTimeLinePhoto() {
			if (user?.following?.length > 0) {
				const followedUserPhotos = await getPhotos(user.userId, user.following)
				followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
				setPhotos(followedUserPhotos)
			}
		}
		// console.log(userId)
		getTimeLinePhoto()
	}, [user?.userId])

	return { photos }
}
