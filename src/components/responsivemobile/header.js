/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	IoMdHeartEmpty,
	IoMdHeart,
	IoIosSearch,
	IoIosSend,
} from 'react-icons/io'
import { FiLogOut, FiSend } from 'react-icons/fi'
import { FaCompass } from 'react-icons/fa'
import { ImCompass2, ImSearch } from 'react-icons/im'
import { BsHouseDoorFill, BsHouseDoor } from 'react-icons/bs'
import * as ROUTES from '../../contants/routes'

function HeaderMobile() {
	const [iconHome, setIconHome] = useState(false)
	const [iconplane, setIconplane] = useState(true)
	const [iconHeart, setIconHeart] = useState(true)
	const [iconCompa, setIconComapa] = useState(true)
	const clickIconHome = () => {
		setIconHome(false)
		setIconplane(true)
		setIconHeart(true)
		setIconComapa(true)
	}
	const clickIconHeart = () => {
		setIconHeart(!iconHeart)
		setIconplane(true)
		setIconHome(true)
		setIconComapa(true)
	}
	const clickIconPlane = () => {
		setIconplane(false)
		setIconHome(true)
		setIconHeart(true)
		setIconComapa(true)
	}
	const clickIconCompa = () => {
		setIconComapa(false)
		setIconplane(true)
		setIconHeart(true)
		setIconHome(true)
	}

	return (
		<div className='h-14 border-t border-gray-primary fixed bottom-0 w-full bg-white z-50 block md-res:hidden'>
			<div className='container mx-auto h-full max-w-screen-lg flex items-center justify-evenly'>
				<Link to={ROUTES.DASHBOARD} onClick={clickIconHome}>
					{iconHome ? (
						<BsHouseDoor className='h-6 w-7 text-2xl text-black-primary' />
					) : (
						<BsHouseDoorFill className='h-6 w-7 text-black-light text-2xl' />
					)}
				</Link>

				<Link to={ROUTES.VIEW_ALLSUGGESTION} onClick={clickIconPlane}>
					{iconplane ? (
						<FiSend className='h-6 w-7 ml-4 text-2xl text-black-primary' />
					) : (
						<IoIosSend className='h-7 w-7 ml-4 text-2xl' />
					)}
				</Link>
				<Link to={ROUTES.DASHBOARD}>
					{iconplane ? (
						<ImSearch className='h-6 w-7 ml-4 text-2xl text-black-primary' />
					) : (
						<ImSearch className='h-7 w-7 ml-4 text-2xl' />
					)}
				</Link>
				<Link to={ROUTES.DASHBOARD} onClick={clickIconCompa}>
					{iconCompa ? (
						<ImCompass2 className='h-6 w-7 ml-4 text-2xl text-black-primary' />
					) : (
						<FaCompass className='h-6 w-7 ml-4 text-2xl' />
					)}
				</Link>
				<Link to={ROUTES.DASHBOARD} onClick={clickIconHeart}>
					{iconHeart ? (
						<IoMdHeartEmpty className='h-7 w-7 ml-4 text-2xl text-black-primary' />
					) : (
						<IoMdHeart className='h-7 w-7 ml-4 text-2xl' />
					)}
				</Link>
			</div>
		</div>
	)
}

export default HeaderMobile
