/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import PulseLoader from "react-spinners/PulseLoader";
import { GoVerified } from 'react-icons/go'
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import {  updateLoggedInUserFollowing, updateFollowedUserFollwers , updateLoggedInUserUnFollowing, updateFollowedUserUnFollwers} from '../../services/firebase'


const override = css`
    margin-right: 0 auto; 
`;

export default function ViewAllSuggestedFollow({ profileDocId, username, verification, profileId, loggedInUserdocId, userId }) {
    const [followed, setFollowed] = useState(false)
    const [loadFollowed, setLoadFollowed] = useState(false)
    const [loadUnfollow, setLoadUnfollow] = useState(false)

    // follwed handle
    async function handleFollower() {
        setFollowed(true)  
        setLoadFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserdocId, profileId, false) 
        await updateFollowedUserFollwers(profileDocId, userId, false)
        setLoadFollowed(false)
         
    } 

    async function handleUnFollower() {     
        setLoadUnfollow(true)
        await updateLoggedInUserUnFollowing(loggedInUserdocId, profileId)
        await updateFollowedUserUnFollwers(profileDocId, userId)   
        setFollowed(false)
        setLoadUnfollow(false)
    }

	return (
        <div className='pt-2 pl-3 pb-3 rounded-md justify-between' >
            <div className='flex items-center justify-between'>
                <div className='flex' >
                    <Link to={`/profile/${username}`}>
                        <img  className='rounded-full w-9 flex mr-3 cursor-pointer' src={`images/avatars/${username}.jpg`} alt=''/>
                    </Link>
                
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <Link to={`/profile/${username}`}  className='font-medium text-sm text-black-dowload'>{username}</Link>  
                            {verification === true ? <span className='ml-1 text-sm  text-blue-medium'><GoVerified /></span> : ''}
                        </div>
                        <p className='text-xs text-gray-graysuggeseted' >{username === 'devntv' ? 'Admin Vinhstagram': 'Gợi ý cho bạn'}</p>  
                    </div>
                </div>

                <div className='mr-3'>
                    {
                        followed === false ? <button type='button' className='text-sm text-white font-bold border rounded-md w-20 h-8 bg-blue-medium focus:outline-none focus:border-none' onClick={handleFollower}>Theo dõi</button>
                                           : loadFollowed ? <button type='button' className=' rounded-md w-20 h-7 border-blue-medium border bg-blue-medium focus:outline-none' >
                                                                 <PulseLoader css={override} loading={followed} color='#fff' size={6}/> 
                                                            </button> 
                                                          : loadUnfollow === false ? <button type='button' onClick={handleUnFollower} className='text-sm font-semibold text-black-bold border-gray-primary border w-28 h-7 rounded-md focus:outline-none '>
                                                                                        Đang theo dõi                                                      
                                                                                     </button> 
                                                                                    : loadUnfollow ? 
                                                                                        <button type='button' onClick={handleUnFollower} className='focus:outline-none  border-gray-primary border w-28 h-7 rounded-md'>
                                                                                            <PulseLoader css={override} loading={followed} color='#18151598' size={6}/> 
                                                                                        </button> 
                                                                                    : '' 
                    }
                </div>     
        </div>                              
    </div>
    )
}

ViewAllSuggestedFollow.propTypes ={
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    loggedInUserdocId: PropTypes.string.isRequired,
    profileDocId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    verification: PropTypes.bool.isRequired
}