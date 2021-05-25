/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { RiVuejsLine } from 'react-icons/ri'

export default function Footer() {
	return (
		<div className='flex items-center justify-center bg-gray-background mt-4'>
			<div className='xl:flex xl:items-center xl:justify-center relative xl:overflow-hidden'>
				<div className='flex flex-col mr-4 items-center'>
					<span className='text-3xl text-red-light'>
						<RiVuejsLine />
					</span>
					<div className='text-sm text-red-light font-semibold'>Vinh Dz</div>
				</div>
				<div className='text-gray-graybold text-xs mt-2 sm-res:text-sm text-center'>
					Made with 🐤 by NTVinh ● @2021 Vinhstagram all rights reserved.
				</div>
			</div>
		</div>
	)
}
