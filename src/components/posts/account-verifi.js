/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { GoVerified } from 'react-icons/go'

export default function AccountVerifi({ verification,user }) {
   console.log(user.verification);
    return (
        <div>
            {user.verification === true ?<GoVerified /> :''}
        </div>
    )
}
AccountVerifi.propTypes ={
    verification: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
}