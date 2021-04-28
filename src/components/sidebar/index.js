/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import useUser from '../../hooks/user-use'
import Suggestions from './suggestions'
import User from './user'

export default function Sidebar() {
    const { user } = useUser()
    const {docId, username, fullName, userId, following} = user
    // console.log('Infor', username, fullName, userId)
    // console.log('following',following);
    // // console.log(docId);
   
    return (
        <div className='p-3 mt-0 left-2/3 sticky top-24'>
           <User username={username} fullName={fullName} /> 
           <Suggestions userId={userId} following={following} loggedInUserdocId={docId}/>
        </div>
    )
}
// Sidebar.whyDidYouRender = true