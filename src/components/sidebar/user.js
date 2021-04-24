/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import FirebaseContext from '../../context/firebase'
import * as ROUTES from '../../contants/routes'

export default function User({ username, fullName }) {
	const { firebase } = useContext(FirebaseContext)
	const history = useHistory()
	return !username || !fullName ? (
		<Skeleton count={1} height={61} />
	) : (
		<>
			<div className='flex mb-6 items-center'>
				<Link
					to={`/profile/${username}`}
					className='flex items-center justify-between '
				>
					<img
						className='rounded-full w-12  mr-3 flex'
						src={`/images/avatars/${username}.jpg`}
						// src='/images/avatars/avatar1.jpg'
						alt=''
					/>
				</Link>
				<Link to={`/profile/${username}`} className='ml-2'>
					<p className='font-medium text-base text-black-light '>{username}</p>
					<p className='text-sm text-gray-graybold'>{fullName}</p>
				</Link>
				<button
					type='button'
					className='ml-auto text-xs font-bold'
					onClick={() => {
						firebase.auth().signOut()
						history.push(ROUTES.LOGIN)
					}}
				>
					<p className='text-blue-light'>Đăng xuất</p>
				</button>
			</div>
		</>
	)
}
User.whyDidYouRender = true

// User.propTypes = {
// 	username: PropTypes.string.isRequired,
// 	fullName: PropTypes.string.isRequired,
// }
User.propTypes = {
	username: PropTypes.string,
	fullName: PropTypes.string,
}
