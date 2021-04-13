/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	// console.log(result.docs)
	return result.docs.map((user) => user.data().length > 0)
}

// get user from the fireStore database where userId === userId [passed from the auth]
export async function getUserByUserId(userId) {
	const result = await firebase.firestore().collection('users').where('userId', '==', userId).get()

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}))

	return user
}
