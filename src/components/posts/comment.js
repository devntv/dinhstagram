/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { formatDistance } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import { GoVerified } from 'react-icons/go'
import { FaSlackHash } from 'react-icons/fa'
import viLocale from "date-fns/locale/vi";
import { Link } from 'react-router-dom'
import Addcoment from './add-comment'


export default function Comments({docId, comments: allComents, posted, commentInput }) {
   
   
   
   
    const [comments, setComments] = useState(allComents)
    const [textTimeClick, setTextTimeClick] = useState(false)
    const [allComments, setAllComments] = useState(false)
 
    
    const handleViewAllCmt = () => {
        setAllComments(!allComments)
    }
    
    return (
        <>
            <div className='p-4 pt-0 mt-0 pb-4 m-2 ml-1'>
                {comments.length >= 3 && (
                    <div onClick={handleViewAllCmt} role="presentation">

                        <p className={`text-sm text-gray-graybold mb-1 cursor-pointer flex items-center ${allComments && 'hidden'}`} >
                            Xem tất cả {comments.length} bình luận {allComments ? <MdKeyboardArrowDown className='text-lg'/> : <MdKeyboardArrowRight className='text-lg'/>}
                        </p>       

                        <p className={`text-sm text-gray-graybold mb-1 cursor-pointer flex items-center  ${!allComments && 'hidden '}`} >
                             Tất cả bình luận {allComments ? <MdKeyboardArrowDown className='text-lg'/> : <MdKeyboardArrowRight className='text-lg '/>}
                        </p>      
                        
                    </div>
                )}
                 {allComments ? <div className='relative w-auto pl-4 bg-gray-grayLight h-auto rounded-sm animate-pulseText pb-1'>
                        {comments.map((item, index) => (
                            
                                <p key={uuidv4() } className='break-words leading-3'>
                                    <Link to={`/profile/${item.displayName}`} className='select-none' >
                                        <span className='mr-2 mt-1 font-semibold text-sm text-black-dowload select-none'>{item.displayName}</span>       
                                    </Link>
                                    {item.displayName ==='NTVinh' || item.displayName ==='devntv'  ? <span className='inline-block text-sm mt-1 mr-2 -ml-1 text-blue-medium select-none'><GoVerified /></span>:''}
                                    <span className='text-black-light text-sm mt-1 items-center -ml-1'>
                                    {item.comment.includes('@') || item.comment.includes('#') ?
                                         <span className='font-bold flex items-center ml-1 text-blue-medium '>{item.comment} <FaSlackHash className='ml-2 animate-scaletext text-blue-medium  '/></span> : item.comment}</span>
                                </p>
                            
                        ))}
                 </div> : ''}
                {comments.slice(0,3).map((item) => (
                    <div key={uuidv4()} className='break-words leading-3' >
                        <Link to={`/profile/${item.displayName}`} className='select-none' >
                            <span className='mr-1 mt-1 font-semibold text-sm select-none text-black-dowload'>{item.displayName} </span> 
                                   
                        </Link>
                        {item.displayName ==='NTVinh' || item.displayName ==='devntv' ? <span className='inline-block text-sm mt-1 mr-2 -ml-1 text-blue-medium select-none'><GoVerified /></span>:''}     
                        {/* <span className='text-black-light text-sm ml-1 mt-1'>{item.comment.includes('@') ? item.comment.replace(/(@{1}\w+\s{1})/ig, ReactHtmlParser('<b>$1</b>')) : item.comment}</span> */}
                        <span className='text-black-light text-sm mt-1 items-center -ml-1'> 
                        {item.comment.includes('@') || item.comment.includes('#')  ? 
                            <span className='font-bold flex items-center ml-1 text-blue-medium'>{item.comment} <FaSlackHash className='ml-2 animate-scaletext text-blue-medium'/></span>
                             : item.comment}</span>
                             
                    </div>
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