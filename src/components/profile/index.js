/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Photos from './photos'
import { getUserPhotosByUsername } from '../../services/firebase'

export default function Profile({ user }) {
	const reducer = (state, newState) => ({ ...state, ...newState })
	const initialState = {
		profile: {},
		photoCollections: [],
		followerCount: 0
	}
	const [{ profile, photoCollections, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username)
			dispatch({
				profile: user,
				photoCollections: photos,
				followerCount: user?.followers?.length,
			})
		}	
			getProfileInfoAndPhotos()
		
	}, [user.username])
	
	return (
		<>
			<Header photosCount ={photoCollections ? photoCollections.length : 0} profile={profile} followerCount={followerCount} setFollowerCount={dispatch} />
			<Photos photos={photoCollections} profile={profile} />
			{/* <p>{user.username}</p> */}
		</>
		)
}

Profile.propTypes ={
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		fullName: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired, 	
		username: PropTypes.string.isRequired,
	}).isRequired
}