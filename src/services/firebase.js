/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	// console.log(result)
	return result.docs.map((user) => user.data().length > 0)
}
