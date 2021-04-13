/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { RiVuejsLine, RiEarthLine } from 'react-icons/ri'

export default function Footer() {
	return (
		<div className='flex flex-col items-center justify-center -mt-12 '>
			<div className='flex items-center'>
				<div className='flex flex-col mr-6 items-center'>
					<span className=' text-gray-graybold text-3xl'>
						<RiVuejsLine />
					</span>
					<div className='text-sm text-gray-graybold font-semibold'>
						Dinh Dz
					</div>
				</div>
				<div className='text-gray-graybold text-sm ml-4 '>
					@2021 Dinhstagram all rights reserved.
				</div>
			</div>

			<div className='flex w-1/4 flex-col'>
				<p className='text-gray-graybold font-semibold text-xs text-center'>
					Contact infor
				</p>

				<div className='flex items-center justify-around mt-2 text-2xl text-gray-graybold mb-2 '>
					<a
						href='https://www.github.com/devntv'
						className='ml-4 flex items-end'
					>
						<AiFillGithub />
						<span className='text-xs ml-1'>Github</span>
					</a>
					<a
						href='https://www.facebook.com/Dinh.nt1097'
						className='ml-4 flex items-end'
					>
						<AiFillFacebook />
						<span className='text-xs ml-1'>Facebook</span>
					</a>
					<a href='https://www.vinhdz.fun/' className='ml-4 flex items-end'>
						<RiEarthLine />
						<span className='text-xs ml-1'>Website</span>
					</a>
				</div>
			</div>
		</div>
	)
}
