/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Header({ username }) {
    return (
        <div className='flex border-b border-gray-primary h-4 p-3 py-7 mb-0'>
            <div className='flex items-center'>
                <Link to ={`/profile/${username}` } className='flex items-center'>
                    <img className='rounded-full h-8 w-8 flex mr-3' alt={`${username}profile`} src={`/images/avatars/${username}.jpg`}/>
                    <p className='font-semibold text-sm'>{username}</p>
                </Link>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}