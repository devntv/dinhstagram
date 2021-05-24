/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'
import useUser from '../hooks/user-use'
import LoggedInUserContext from '../context/loggedInUser'

export default function Dashboard({ user: loggedInuser }) {
	const { user } = useUser(loggedInuser.uid)

	useEffect(() => {
		document.title = 'Vinhstagram'
	}, [user?.userId])

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<div className='bg-gray-background h-screen relative'>
				<Header />
				<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-20 '>
					<Timeline />
					<div>
						<Sidebar />
					</div>
				</div>
			</div>
		</LoggedInUserContext.Provider>
	)
}
Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
}
