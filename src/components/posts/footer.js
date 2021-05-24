/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { GoVerified } from 'react-icons/go'
import PropTypes from 'prop-types'

export default function footer({caption, username}) {
    return (

        <div className='p-4 ml-2 -mt-6 pt-2 pb-0 flex items-center'>
            <span className='font-semibold text-sm mr-1'>
                {username}
            </span>
            {username === 'NTVinh' && <span className='text-sm text-blue-medium'><GoVerified /></span>}
            <span className='text-black-light text-sm font-sans ml-1'> {caption} </span>
        </div>
    )
}

footer.propTypes = {
	caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}