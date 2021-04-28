/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { GoVerified } from 'react-icons/go'
import { formatDistance } from 'date-fns'
import viLocale from "date-fns/locale/vi";
import { Link } from 'react-router-dom'
import Addcoment from './add-comment'
import { getAllUserProfiles } from '../../services/firebase'


export default function Comments({docId, comments: allComents, posted, commentInput}) {
   

    const [comments, setComments] = useState(allComents)
    const [textTimeClick, setTextTimeClick] = useState(false)
    // console.log(comments);
    // get full user
    // const [profiles, setProfiles] = useState(null)
    // useEffect(()=>{
    //     async function getAllUserProfile() {
    //         const response = await getAllUserProfiles()
    //         setProfiles(response)
    //     }
    //     getAllUserProfile()
    // },[])
    // console.log(profiles?.map(v => v.verification));
    // function veRification() {
    //     const res = profiles?.map(v => v.verification)
    // }
    
    return (
        <>
            <div className='p-4 pt-0 mt-0 pb-4 m-2'>
                {comments.length >= 3 && (
                    <p className='text-sm text-gray-graybold mb-1 cursor-pointer'>Xem tất cả {comments.length} bình luận</p>
                )}
                {comments.slice(0,3).map((item) => (
                    <p key={`${item.coment}-${item.displayName}`} >
                        <Link to={`/profile/${item.displayName}`} >
                            <span className='mr-1 mt-1 font-semibold text-sm'>{item.displayName}</span>
                            {/* {verification  ? <span className='ml-1 text-sm  text-blue-medium'><GoVerified /></span> : ''} */}
                            
                        </Link>
                        <span className='text-black-light text-sm'>{item.comment}</span>
                    </p>
                ))}
                <p 
                onMouseDown={() => setTextTimeClick(!textTimeClick)} 
                onMouseUp={() => setTextTimeClick(!textTimeClick)}
                className={`text-gray-graybold uppercase text-sxs font-normal cursor-pointer mt-1 ${textTimeClick ? 'opacity-50' : ''}`}>{formatDistance(posted, new Date(),{ locale: viLocale })} trước</p>
            </div>
            <Addcoment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
        </>
    )
}

Comments.propTypes ={
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}