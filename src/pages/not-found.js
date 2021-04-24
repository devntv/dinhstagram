/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiTerror } from 'react-icons/gi'
import Header from '../components/header'
import * as ROUTES from '../contants/routes'
import Footer from './footer'

export default function NotFound() {
	useEffect(() => {
		document.title = 'Not Found • Vinhstagram'
	}, [])

	return (
		<div className='flex flex-col justify-between h-screen'>
			<Header />
			<div className='bg-gray-background flex h-full justify-start flex-col'>
				<div className='mx-auto max-w-screen-lg'>
					<h2 className='text-center text-xl font-semibold mt-2'>
						Rất tiếc, trang này hiện không khả dụng.
					</h2>
					<p className='mt-6 text-center'>
						Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.{' '}
						<Link className='text-blue-medium' to={ROUTES.DASHBOARD}>
							Quay lại Vinhstagram.
						</Link>
					</p>

					<div className='flex items-center justify-center mt-6 text-3xl text-black-bold'>
						<GiTerror />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
