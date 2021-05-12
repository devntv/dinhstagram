/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import OutsideClickHandler from 'react-outside-click-handler';
// icon
import { FiLogOut, FiSend } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { MdCancel } from 'react-icons/md'
import { IoMdHeartEmpty, IoMdHeart, IoIosSearch, IoIosSend, IoIosHeartEmpty} from 'react-icons/io'
import { VscHeart } from 'react-icons/vsc'
import { FaCompass  } from 'react-icons/fa'
import { ImCompass2 } from 'react-icons/im'
import { BsHouseDoorFill, BsHouseDoor } from 'react-icons/bs'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../contants/routes'
import  '../CSS-style/header.css'



export default function header() {   
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)
    const history = useHistory();
    // console.log(user);
    // when logOut will be call it
    const [LoadingLogout, setLodingLogout] = useState(true)
    // icon state change onClick
    const [logoClick, setLogoClick] = useState(false)
    const [iconHome, setIconHome] = useState(false)
    const [iconplane, setIconplane] = useState(true)
    const [iconHeart, setIconHeart] = useState(true)
    const [iconCompa, setIconComapa] = useState(true)
    const [avatarProfileClick, setAvatarProfileClick] = useState(false);

    // search header
    const inputSearch = useRef(null)
    const [searchToggle, setSearchToggle] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const headerLogoClick = () =>{
        setLogoClick(!logoClick)
    }
  
    // const headerLogoClickKeyDown =()=>{
    //     setLogoClick(!logoClick)
    //     setTimeout(()=>{
    //         setLogoClick(!logoClick)
    //     },1000)
    // }
    const handleSearchToggle =() =>{
        setSearchToggle(true)  
        inputSearch.current.focus()
    }
    const clearSearch =() =>{
        setSearchValue('')
    }
    // icon click
    const clickIconHome = () => {
        setIconHome(false); 
        setIconplane(true)
        setIconHeart(true)
        setIconComapa(true)
    }
    const clickIconHeart = () =>{
        setIconHeart(!iconHeart);
        setIconplane(true)
        setIconHome(true)
        setIconComapa(true)
      
    }
    const clickIconPlane =() =>{
        setIconplane(false);
        setIconHome(true)
        setIconHeart(true)
        setIconComapa(true)
    }
    const clickIconCompa =()=>{
        setIconComapa(false)
        setIconplane(true)
        setIconHeart(true)
        setIconHome(true)
    }

    // profile click

    const clickAvatarProfile =() =>{
        setAvatarProfileClick(!avatarProfileClick)
        // setIconHome(!iconHome)
    }
        
   
    useEffect(()=>{
      const timeoutClear =  setTimeout(()=>{
            setLodingLogout(false)
        },4000)

        return () => clearTimeout(timeoutClear)
    },[])



 

    return (
        <header className='h-14 border-b border-gray-primary fixed top-0 w-full bg-white z-50 ' role="presentation" >
            <div className='container mx-auto h-full max-w-screen-lg '>
                <div className='flex h-full justify-between '>
                    <div className='text-center items-center flex cursor-pointer text-bg-gray-700 '>
                        <h1 className='flex justify-center w-full '>
                            <Link to ={ROUTES.DASHBOARD} >
                                <img className= {`bg-cover w-6/12 h-full object-cover ${logoClick ? 'opacity-40': ''} `}
                                     src='/images/vsgLogo.png' alt='Vinhstagram-logo'
                                     onMouseDown={headerLogoClick} 
                                     onMouseUp={headerLogoClick}
                                     />
                            </Link>
                        </h1>                      
                    </div>
                    <div  className='flex items-center text-sm p-0 my-0 relative w-52' role="presentation" onClick={handleSearchToggle}>                      
                    {user &&
                        <OutsideClickHandler onOutsideClick={() => {setSearchToggle(false)}}>
                        {/* toggle search input like instagram */}
                                <div className='flex w-full items-center bg-gray-background border rounded-sm border-gray-primary min-w-minwidth215'>
                                    <IoIosSearch className={searchToggle ? 'text-gray-graybold text-base mr-1 ml-1 left-0':'text-gray-graybold text-base mr-1 ml-1 left-16 absolute'}/>
                                    <input ref={inputSearch} value={searchValue} placeholder={searchToggle ? 'tìm kiếm...': ''} className='bg-gray-background focus:outline-none h-7 flex-grow' onChange={({target}) => setSearchValue(target.value)}/>
                                    <span className={searchToggle ? 'hidden': 'text-sm text-gray-graybold absolute left-88px'}>tìm kiếm</span>
                                    <MdCancel className={searchToggle ? 'text-lg mr-1 text-gray-graysemibold cursor-pointer': 'hidden cursor-pointer'} onClick={clearSearch} />
                                </div>
                        </OutsideClickHandler>
                    }
                    </div>
                   <div className='text-center flex items-center'>
                       {user ? (<> 
                                    <Link to ={ROUTES.DASHBOARD} onClick={clickIconHome}>
                                        {iconHome ? <BsHouseDoor className='h-6 w-7 text-2xl text-black-primary'/> : <BsHouseDoorFill className='h-6 w-7 text-black-light text-2xl'/>}
                                    </Link>

                                    <Link to={ROUTES.DASHBOARD} onClick={clickIconPlane}>
                                        {iconplane ? <FiSend  className='h-6 w-7 ml-4 text-2xl text-black-primary' /> : <IoIosSend className='h-7 w-7 ml-4 text-2xl' />} 
                                    </Link>
                                     {/* ImCompass2 */}
                                     <Link to={ROUTES.DASHBOARD} onClick={clickIconCompa}>
                                        {iconCompa ? <ImCompass2  className='h-6 w-7 ml-4 text-2xl text-black-primary' /> : <FaCompass className='h-6 w-7 ml-4 text-2xl' />} 
                                    </Link>

                                    <Link to={ROUTES.DASHBOARD} onClick={clickIconHeart}>
                                        {iconHeart ? <IoMdHeartEmpty className='h-7 w-7 ml-4 text-2xl text-black-primary' /> : <IoMdHeart  className='h-7 w-7 ml-4 text-2xl' />}
                                    </Link>
                              
                                    <OutsideClickHandler onOutsideClick={()=>{setAvatarProfileClick(false);}}>
                                        <div className='flex items-center cursor-pointer relative ml-3' onClick={clickAvatarProfile} role="presentation">
                                            <div  className={avatarProfileClick ? 'gradient-border' :'border-0'}>
                                                <img 
                                                 src={`/images/avatars/${user.displayName}.jpg`}
                                                // src='/images/avatars/ntvinh.jpg'
                                                className='h-8 w-8 flex rounded-full border-2 border-transparent border-white bg-cover object-center overflow-hidden' alt={`${user.displayName}profile`}/>
                                            </div>                                 

                                            {avatarProfileClick ?                                                
                                                    <div className='absolute -left-32 border rounded-md h-auto w-44 bg-white border-gray-primary afterHeaderProfile flex flex-col'>
                                                        <Link to={`/profile/${user?.displayName}`} className='mt-1 flex items-center h-8 justify-start text-gray-base hover:bg-gray-background'>
                                                            <CgProfile className='mr-3 ml-3 flex text-lg'/> 
                                                            <p>trang cá nhân</p>
                                                        </Link>
                                                        <button className='mt-1 h-8 mb-1 flex items-center justify-start text-gray-base hover:bg-gray-background' type="button" 
                                                                onClick={() => {
                                                                    firebase.auth().signOut(); history.push(ROUTES.LOGIN)
                                                                    }} 
                                                                onKeyDown={(e) => {
                                                                    if(e.key === 'Enter'){
                                                                        firebase.auth().signOut();
                                                                        history.push(ROUTES.LOGIN)
                                                                        }}}>
                                                            <FiLogOut className='mr-3 ml-3 flex text-lg'/>
                                                            <p>đăng xuất</p>
                                                        </button>                                  
                                                    </div>     
                                            
                                                : ''
                                                
                                            }                                    
                                        </div>
                                    </OutsideClickHandler>  
                                </>) 
                             : (  <>
                                    {LoadingLogout ? <ClipLoader loading={LoadingLogout} size={20}/>
                                                   :<> <Link to={ROUTES.LOGIN} >
                                                            <button type='button' className='bg-blue-medium font-semibold text-sm rounded text-white w-20 h-8 cursor-pointer'>Đăng nhập</button>
                                                        </Link>   
                                                        <Link to={ROUTES.SIGN_UP} >
                                                            <button type='button' className='w-20 h-8 font-semibold rounded text-blue-medium bg-gray-background ml-1'>Đăng ký</button>
                                                        </Link>   </>}                                                           
                                  </>       
                               )
                       }
                   </div>
                </div>
            </div>   
        </header>
    )
}
// <BsHouseDoor className='h-6 w-6 mr-2'/>