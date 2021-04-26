/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoVerified } from 'react-icons/go'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import { updateLoggedInUserFollowing, updateFollowedUserFollwers, updateLoggedInUserUnFollowing, updateFollowedUserUnFollwers } from '../../services/firebase'
import '../../CSS-style/suggested-profile.css'

const override = css`
display: flex;
margin-right: 6px; 
`;
export default function SuggestedProfile({ profileDocId, username, verification, profileId, userId, loggedInUserdocId}) {
    const [followed, setFollowed] = useState(false)
    const [loadFollowed, setLoadFollowed] = useState(false)
    const [loadUnfollow, setLoadUnfollow] = useState(false)

    async function handleFollower() {
        setFollowed(true)
        // update the following array (i f) of the logged in user - update the follower array  of the user who has been followed = create 2 service func
        setLoadFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserdocId, profileId, false) // false is default = not follow
        // update the follower array  of the user who has been followed
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

    
  //  console.log(profileId);
	return  (
        <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center justify-between -mb-2'>
                <Link to={`/profile/${username}`}>
                    <img  className='rounded-full w-9 flex mr-3 cursor-pointer' src={`images/avatars/${username}.jpg`} alt={`${username}avatar`}/>
                </Link>
                    
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <Link to={`/profile/${username}`}  className='font-medium text-sm text-black-dowload hover-b'>{username}</Link> 
                        {verification === true ? <span className='ml-1 text-sm  text-blue-medium'><GoVerified /></span> : ''}
                    </div>
                    <p className='text-xs text-gray-graysuggeseted'>{username === 'devntv'  ? 'Admin Vinhstagram': 'Gợi ý cho bạn'}</p>  
                </div>
            </div>
            <div>
                {
                    followed === false ?  <button type='button' className='text-xs font-semibold text-blue-light select-none' onClick={handleFollower}>Theo dõi</button>
                                    :  loadFollowed ? <PulseLoader css={override} loading={followed} color='#18151579' size={6}/> 
                                                    : loadUnfollow === false ? <button type='button' className='text-xs font-semibold text-black-bold' onClick={handleUnFollower}>
                                                        Đang theo dõi                                                      
                                                    </button> : loadUnfollow ?  <PulseLoader css={override} loading={followed} color='#4d444459 ' size={6}/> : ''                                                   
                }             
            </div>     
        </div>
    ) 
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserdocId: PropTypes.string.isRequired,
    verification: PropTypes.bool.isRequired
}
