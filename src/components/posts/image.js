/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

export default function Image({src , caption}) {
   
    return (
        <img className='object-cover select-none' src={src} alt={caption}/>
        
    )
}

Image.propTypes ={
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}