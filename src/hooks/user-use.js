/* eslint-disable no-shadow */
import { useState, useEffect } from 'react'
import { getUserByUserId } from '../services/firebase'

export default function useUser(userId) {
	const [activeUser, setActiveUser] = useState({})
	// const { user } = useContext(UserContext)

	useEffect(() => {
		async function getUserObjwithUserId(userId) {
			// create function call and get the id user of firebase. from service/firebase
			const [user] = await getUserByUserId(userId)
			setActiveUser(user || {})
		}
		if (userId) {
			getUserObjwithUserId(userId)
		}
	}, [userId])
	// console.log('active', activeUser)
	return { user: activeUser }
}
