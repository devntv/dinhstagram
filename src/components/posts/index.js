/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useRef,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comment'
import useUser from '../../hooks/user-use'
import { getAllUserProfiles, getSuggestedProfiles } from '../../services/firebase'

export default function Posts({ content }) {

    
    const commentsInput = useRef(null)
    const handleFocus = () => commentsInput.current.focus();
    // get all user

    return (
        <div className='rounded-sm sm-res:border sm-res:bg-white sm-res:border-gray-primary mb-14 w-auto'>
            <Header username={content.username}/>
            <Image src={content.imageSrc} caption={content.caption}/>
            <div className='flex flex-col'>
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} pin={content.pin}/>
            <Footer caption = {content.caption} username={content.username}/>
            <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentsInput} />
            </div>
        </div>
    )
}
Posts.propTypes ={
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        likes: PropTypes.array.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
        pin: PropTypes.bool.isRequired
    })
}