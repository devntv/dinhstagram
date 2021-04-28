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

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase.firestore().collection('users').limit(10).get();
  
	return result.docs
	  .map((user) => ({ ...user.data(), docId: user.id }))
	  .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
  }
  
export async function getAllUserProfiles(){
	const result = await firebase.firestore().collection('users').get();
	const allUsers = result.docs.map((user)=>({
		...user.data()
	}))
	return allUsers
}
// updateFollowedUserFollwers, updateLoggedInUserFollowing
export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
	// loggedInUserDocId : current logged in user document id (logged : ntvinh profile)
	// profileId : the user that ntvinh request to follow
	// isFollowingProfile: true or false (am i currently following this person?)
	return firebase
	.firestore()
	.collection('users')
	.doc(loggedInUserDocId)
	.update({
		following: isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
	})
}
// spDocId, userId
export async function updateFollowedUserFollwers(profileDocId, loggedInUserDocId, isFollowingProfile) {
	// loggedInUserDocId : current logged in user document id (logged : ntvinh profile)
	// profileId : the user that ntvinh request to follow
	// isFollowingProfile: true or false (am i currently following this person?)
	return firebase
	.firestore()
	.collection('users')
	.doc(profileDocId)
	.update({
		followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInUserDocId) : FieldValue.arrayUnion(loggedInUserDocId)
	})
}
// UnFollow 
export async function updateLoggedInUserUnFollowing(loggedInUserDocId, profileId) {

	return firebase
	.firestore()
	.collection('users')
	.doc(loggedInUserDocId)
	.update({
		following: FieldValue.arrayRemove(profileId),
	})
}

export async function updateFollowedUserUnFollwers(profileDocId, loggedInUserDocId) {

	return firebase
	.firestore()
	.collection('users')
	.doc(profileDocId)
	.update({
		followers: FieldValue.arrayRemove(loggedInUserDocId) 
	})
}

export async function getPhotos(userId, following) {
	const result = await firebase.firestore().collection('photos').where('userId','in', following).get();
	const userFollowedPhotos = result.docs.map((photo)=>({
		...photo.data(),
		docId: photo.id
	}))
	// console.log(userFollowedPhotos);
	const photosWithUserDetails = await Promise.all(userFollowedPhotos.map(async (photo) => {
		let userLikedPhoto = false;
		if(photo.likes.includes(userId)){
			userLikedPhoto = true;
		}
		// photo.userId = 2
		const user = await getUserByUserId(photo.userId)
		// yasuo
		const { username } = user[0];
		return { username, ...photo, userLikedPhoto }
	})
	)
	return photosWithUserDetails
}