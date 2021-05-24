/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable no-multi-assign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { RiVuejsLine } from 'react-icons/ri'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'
import * as ROUTES from '../../contants/routes'

export default function Suggestions({ userId, following, loggedInUserdocId }) {
	
	const [profiles, setProfiles] = useState(null)
	// go ahead and get suggested profile - use firebAse service - call asyn function within useEffect
	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following)
			setProfiles(response)
		}
		// console.log('userId', userId)
		if (userId) {
			suggestedProfiles()
		}
		// console.log('follow', profiles)
		
	}, [userId])
	

	let profilesLength = profiles != null ? profiles.length : null
	const setProfileLength =  profilesLength > 5 ? profilesLength = 5 : profilesLength
	setProfileLength != null ? profiles.length = 5 : ''
	
	

	console.log(profiles);
	return !profiles ? (
		<Skeleton  count={3} height={120} className='mt-5' />	
	) : profiles ? (
		<div className='flex rounded flex-col'>
			<div className='text-sm flex items-center justify-between'>
				<p className='font-semibold text-gray-graybold'>Gợi ý cho bạn</p>
				<Link to={ROUTES.VIEW_ALLSUGGESTION} className='font-semibold text-xs cursor-pointer' >Xem tất cả</Link>
			</div>
			<div className='mt-4 grid gap-5'>
				{profiles.map((profile) => (
					<SuggestedProfile
						key={profile.docId}
						profileDocId={profile.docId}
						username={profile.username}
						verification={profile.verification}
						profileId={profile.userId}
						userId={userId}
						loggedInUserdocId={loggedInUserdocId}
						avatarSignUp = {profile.avatarSignUp}
					/>
				))}
			</div>
			
			<div className='mt-4'>
					<div className='flex justify-center items-center flex-col'>
						<div className='flex flex-col mt-2'>
							<span className='text-red-light text-lg'><RiVuejsLine /></span>							
						</div>
						<span className=' text-gray-graysemibold text-xs font-normal'>@ 2021 Vinhstagram all rights reserved.</span>

						<div className='flex text-xs text-gray-graysemibold mt-1'>
							<a href='https://github.com/devntv' target='_blank' rel='noreferrer' className='ml-2 hover:text-red-light'>GitHub</a>
							<a href='https://www.facebook.com/Dinh.nt1097' target='_blank' rel='noreferrer' className='ml-2 hover:text-red-light' >Facebook</a>
							<a href='https://www.vinhdz.fun/' target='_blank' rel='noreferrer' className='ml-2 hover:text-red-light'>Website</a>
						</div>						
					</div>
			</div>
		</div>
	) : null
}

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
	loggedInUserdocId: PropTypes.string
}
