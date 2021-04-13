/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const User = ({ username, fullName }) =>
	!username || !fullName ? (
		<Skeleton count={1} height={61} />
	) : (
		<Link
			to={`/profile/${username}`}
			className='grid grid-cols-4 gap-4 mb-6 items-center'
		>
			<div className='flex items-center justify-between col-span-1'>
				<img
					className='rounded-full w-12  mr-3 flex'
					src={`/images/avatars/${username}.jpg`}
					// src='/images/avatars/avatar1.jpg'
					alt=''
				/>
			</div>
			<div className='col-span-3'>
				<p className='font-medium text-base text-black-light '>{username}</p>
				<p className='text-sm text-gray-graybold'>{fullName}</p>
			</div>
		</Link>
	)

export default memo(User)

// User.propTypes = {
// 	username: PropTypes.string.isRequired,
// 	fullName: PropTypes.string.isRequired,
// }
User.propTypes = {
	username: PropTypes.string,
	fullName: PropTypes.string,
}
