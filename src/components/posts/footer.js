/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

export default function footer({caption, username}) {
    return (

        <div className='p-4 ml-2 -mt-6 pt-2 pb-0'>
            <span className='mr-0 font-semibold text-sm'>
                {username}
            </span>
            <span className='text-black-light text-sm font-sans'> {caption} </span>
        </div>
    )
}

footer.propTypes = {
	caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}