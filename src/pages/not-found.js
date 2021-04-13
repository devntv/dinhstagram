/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../contants/routes'

export default function NotFound() {
	useEffect(() => {
		document.title = 'Not Found • Dinhstagram'
	}, [])

	return (
		<div className='bg-gray-background'>
			<div className='mx-auto max-w-screen-lg'>
				<h2 className='text-center text-2xl font-semibold mt-6'>
					Rất tiếc, trang này hiện không khả dụng.
				</h2>
				<p className='mt-6 text-center'>
					Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.{' '}
					<Link className='text-blue-medium' to={ROUTES.DASHBOARD}>
						Quay lại Vinhstagram.
					</Link>
				</p>
			</div>
		</div>
	)
}
