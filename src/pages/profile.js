/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { css } from '@emotion/core'
import { getUserByUsername, getUserByUserId } from '../services/firebase'
import * as ROUTES from '../contants/routes'
import Header from '../components/header'
import HeaderMobile from '../components/responsivemobile/header'
import UserProfile from '../components/profile'

const override = css`
	display: flex;
	margin: 0 auto;
	align-items: center;
	height: 100vh;
	justify-content: center;
`

export default function Profile() {
	const { username } = useParams()
	const [loadPhotosUser, setLoadPhotosUser] = useState(false)
	const [user, setUser] = useState(null)
	const history = useHistory()

	useEffect(() => {
		// document.title = `Profile (@${username})`
		if (user) document.title = `${user?.fullName} (@${user?.username})`
	}, [user])
	// `${user?.fullName} (@${user?.username})`
	useEffect(() => {
		async function checkUserExists() {
			setLoadPhotosUser(true)
			const [user] = await getUserByUsername(username)
			console.log(user)
			if (user?.userId) {
				setUser(user)
				// setUserExists(true)
				setLoadPhotosUser(false)
			} else {
				history.push(ROUTES.NOT_FOUND)
				setLoadPhotosUser(false)
			}
		}
		checkUserExists()
		// console.log(user?.username)
	}, [username, history])
	// console.log(user)

	return !user?.username ? (
		<>
			<Header />
			<HashLoader
				css={override}
				loading={loadPhotosUser}
				size={56}
				color='#0095f6'
			/>
		</>
	) : user?.username ? (
		<div className='bg-gray-background '>
			<Header />
			<div className='mx-auto mt-20 max-w-screen-lg'>
				<UserProfile user={user} />
			</div>
			<HeaderMobile />
		</div>
	) : null
}
