/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'

export default function Timeline() {
    const { photos } = usePhotos()
    console.log('photos', photos);
    return (
        <div className='container col-span-2'>
            {!photos ? (
                <>
                    {[...new Array(6)].map((_,index) => (
                        <Skeleton key={index} count={1} width={320} height={400}/>))}
                </>
            ): photos?.length > 0 ? (
                photos?.map((content) => <p key={content.docId}>{content.imageSrc}</p>)
            ):(
                <p className='text-center text-2xl'>follow</p>
            )}
        </div>
    )
}
