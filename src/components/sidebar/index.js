/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import useUser from '../../hooks/user-use'
import Suggestions from './suggestions'
import User from './user'

export default function Sidebar() {
    const { user } = useUser()
    const { username, fullName, userId} = user
    // console.log('Infor', username, fullName, userId)
    return (
        <div className='p-4'>
           <User username={username} fullName={fullName} /> 
           <Suggestions userId={userId} />
        </div>
    )
}
