/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Posts from './posts'

export default function Timeline() {
    const { photos } = usePhotos()
    // console.log('photos', photos);
    return (
        <div className='container col-span-2 p-0 rounded-sm border-gray-primary'>
            {!photos ? (
                <>
                     <Skeleton count={3} width='100%' height={550} className='mb-4'/>
                </>
            ): photos?.length > 0 ? (
                photos?.map((content) => <Posts  key={content.docId} content ={content} />)
            ):(
                <p className='text-center text-xl mt-16'>Hãy theo dõi bạn bè để xem những cập nhật mới.</p>
            )}
        </div>
    )
}
