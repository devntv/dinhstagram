/* eslint-disable no-unused-vars */
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
import HeaderMobile from '../components/responsivemobile/header'

export default function Dashboard({ user: loggedInuser }) {
	const { user } = useUser(loggedInuser.uid)

	useEffect(() => {
		document.title = 'Vinhstagram'
	}, [user?.userId])

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<div className='bg-gray-background h-screen relative'>
				<Header />
				<div className=' lg-res:grid lg-res:grid-cols-3 lg-res:gap-4 lg-res:justify-between mx-auto max-w-screen-lg mt-20 flex justify-center container sm-res:min-w-minWidth420'>
					<Timeline />
					<div>
						<Sidebar />
					</div>
				</div>
				{/* reponsive Mobile */}
				<HeaderMobile />
			</div>
		</LoggedInUserContext.Provider>
	)
}
Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
}
