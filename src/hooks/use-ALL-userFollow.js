import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase'

export default function useUserAllFollow() {
	const [activeUser, setActiveUser] = useState({})
	const { user } = useContext(UserContext)

	useEffect(() => {
		async function getUserObjwithUserId() {
			// create function call and get the id user of firebase. from service/firebase
			const [respone] = await getUserByUserId(user.uid)
			setActiveUser(respone)
		}
		if (user?.uid) {
			getUserObjwithUserId()
		}
	}, [user])
	// console.log('active', activeUser)
	return { user: activeUser }
}
