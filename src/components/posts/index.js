/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comment'

export default function Posts({ content }) {
    
    const commentsInput = useRef(null)
    const handleFocus = () => commentsInput.current.focus();
    return (
        <div className='rounded-sm border bg-white border-gray-primary mb-14'>
            <Header username={content.username}/>
            <Image src={content.imageSrc} caption={content.caption}/>
            <div className='flex flex-col'>
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} pin={content.pin}/>
            <Footer caption = {content.caption} username={content.username}/>
            <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentsInput}/>
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