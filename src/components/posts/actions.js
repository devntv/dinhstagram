/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'


export default function Actions({ docId, totalLikes, likedPhoto, handleFocus, pin }) {
    const { user: { uid: userId } } = useContext(UserContext)
    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [likes, setLikes] = useState(totalLikes)
    const { firebase, FieldValue} = useContext(FirebaseContext)
    const [pinpost, setPinPost] = useState(pin)

   

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked)

        await firebase.firestore().collection('photos').doc(docId).update({
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        })
        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }
    // pin
    const handlePin = async() => {
        setPinPost(!pin)
        await firebase.firestore().collection('photos').doc(docId).update({
            pin: !pin
        })
    }
  
  
    

    return (  
        <>
            <div className='flex p-4 -mt-1'>
                <div className='flex -mt-2 items-center  w-full justify-between'>
                    <div className='flex justify-between items-center -ml-1'>
                      <svg 
                            onClick={handleToggleLiked}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    handleToggleLiked()
                                }
                            }}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-8 w-8 select-none cursor-pointer ${
                                toggleLiked ? 'fill-red text-red-primary animate-iconClickPost' : 'text-black-primary animate-postIconClickUnLike'
                            }`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                            {/* // comment */}
                      <svg    
                            onClick={handleFocus}  
                            onKeyDown={(event) =>{
                                if(event.key === 'Enter'){
                                    handleFocus()
                                }
                            }}     
                            stroke="currentColor"
                            className='h-6 ml-4 mt-1 w-6 cursor-pointer text-black-primary'
                            viewBox="0 0 48 48" 
                        >
                            <path className='cursor-pointer' strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}  d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" />
                      </svg>

                      {/* send */}

                      <svg 
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                        className='h-6 ml-4 mt-1 w-6 cursor-pointer text-black-primary'>
                          <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={1} d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"/>
                      </svg>  
                      </div>
                             {/* ghim */}
                     <div className='flex items-center'>
                        <svg
                             onClick={handlePin}
                             stroke="currentColor"
                             viewBox="0 0 48 48"
                             className='h-6 mt-1 w-6 cursor-pointer text-black-primary'>
                             <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={1} 
                             d= {pinpost ? 'M43.5 48c-.4 0-.8-.2-1.1-.4L24 28.9 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1z' : 'M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z'}/>
                         </svg> 
                    
                     </div>
                     
                </div>
            </div>

            <div className='p-4 -mt-7 ml-1'>
                <p className='font-semibold text-sm '>{likes === 1 || likes ===0 ? `${likes} lượt thích`: `${likes} lượt thích`}</p>
            </div>  
        </>
    )
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
    pin: PropTypes.bool.isRequired
}
