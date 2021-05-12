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
// profile
export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	const user = result.docs.map(item => ({
		...item.data(),
		docId: item.id
	})) 

	return user.length > 0 ? user : false 
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
  
	return result.docs
	  .map((user) => ({ ...user.data(), docId: user.id }))
	  
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

export async function getUserPhotosByUsername(username) {
	const [user] = await getUserByUsername(username)
	const result = await firebase.firestore().collection('photos').where('userId', '==', user.userId).get()
	return result.docs.map(item => ({
		...item.data(),
		docId: item.id
	}))
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
	const result = await firebase
	  .firestore()
	  .collection('users')
	  .where('username', '==', loggedInUserUsername) // karl (active logged in user)
	  .where('following', 'array-contains', profileUserId)
	  .get();
  
	const [response = {}] = result.docs.map((item) => ({
	  ...item.data(),
	  docId: item.id
	}));
  
	return response.userId;
  }

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId) {
	await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
	// 1- NTVinh docId
	// 2- Yasuo docId
	// 3- is the user following  this profile? does NTVinh follow Yasuo ->(true/false)
	await updateFollowedUserUnFollwers(profileDocId, followingUserId, isFollowingProfile)
}