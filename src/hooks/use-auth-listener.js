import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

export default function useAuthListener() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
	const { firebase } = useContext(FirebaseContext)

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			// have a user -> thereFore we can store the user in localStorage
			// https://firebase.google.com/docs/auth/web/manage-users
			// User is signed in.
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser))
				setUser(authUser)
			} else {
				// No user is signed in. Therefore clear the localStorage
				localStorage.removeItem('authUser')
				setUser(null)
			}
		})
		// clean up it, if not clean up = redirect component if will be auto runs. like as setTimeOut and setInterval
		return () => listener()
	}, [firebase])
	return { user }
}
