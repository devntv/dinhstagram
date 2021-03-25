/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */


import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {AiFillFacebook, AiFillGithub,} from 'react-icons/ai'
import {RiVuejsLine,RiEarthLine} from 'react-icons/ri'
import ClipLoader from "react-spinners/ClipLoader";
import s1 from '../images/s1.png'
import s2 from '../images/s2.png'
import s3 from '../images/s3.png'
import s4 from '../images/s4.png'
import s5 from '../images/s5.png'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../contants/routes'



export default function login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password.length < 6 || emailAddress === '';
    const [displayPass, setDisplayPass] = useState(true);
    const [randomImage, setRandomImage] = useState(s1)
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleDisplay = () => {
        setDisplayPass(!displayPass)
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoadingBtn(true);
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
            setLoadingBtn(false);
        } catch (e) {
            if(e.code === 'auth/invalid-email'){
                setError('Email bạn vừa nhập không đúng định dạng. Vui lòng kiểm tra và thử lại.') 
            } else if (e.code === 'auth/user-not-found'){
                setError('Tên người dùng, Email bạn đã nhập không thuộc về tài khoản nào. Vui lòng kiểm tra và thử lại.')
            } else if(e.code === 'auth/wrong-password') {
                setError('Mật khẩu bạn vừa nhập không chính xác. Vui lòng kiểm tra lại.')
            }
            setLoadingBtn(false);
             e && setEmailAddress('');
             e && setPassword('');
        }
    }
    useEffect(() => {
        document.title = ' Đăng nhập • Dinhstagram'
    }, [])

    // slide mobile screenShot
    useEffect(()=>{
      const slideMobileScreen = setInterval(()=>{        
            const imgArray =[s1, s2, s3, s4, s5];
            const randomIndex = Math.floor(Math.random() * imgArray.length);
            const randomImg = imgArray[randomIndex];
            // console.log(randomIndex);
            setRandomImage(randomImg)
       },3500)

       return ()=>{
            // clean Up when this component has been unmount
            clearInterval(slideMobileScreen)         
       }
    },[])
    

    return (
       <>
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">

            <div className="flex w-3/5 ">
                <img className="max-w-full relative animate-mobileScreen" src={randomImage} alt="login phone mobile" />  
            </div>

            <div className="flex flex-col w-2/5 ">
                <div className="flex flex-col items-center  bg-white p-6 mb-2 border border-gray-primary">
                    <h1 className="flex  justify-center ">
                        <img className="mt-2 mb-4 h-16" src='/images/logo2.png' alt="DinhstagramLogo" />
                    </h1>
                   
                    <form onSubmit={handleLogin} method="POST">
                        <input
                            aria-label="Nhập vào địa chỉ Email"
                            type="text"
                            placeholder="Địa chỉ Email"
                            className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
                                rounded mb-3 bg-gray-background"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />

                        <input
                            aria-label="Nhập vào password"
                            type={!displayPass ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
                                rounded mb-3 bg-gray-background"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <div className="flex justify-end">
                            <button type="button"
                                className="relative font-semibold bottom-10 right-2 text-sm cursor-pointer"
                                onClick={handleDisplay}
                            > {password === '' ? '' : 'Hiển thị' && displayPass ? 'Hiển thị' : 'Ẩn'}

                            </button>
                        </div>

                        <button  type="submit" disabled={isInvalid}
                            className={`bg-blue-medium text-white w-full rounded h-8 font-semibold ${isInvalid && `opacity-50 cursor-default`}`}
                        >{loadingBtn ? <ClipLoader className="flex items-center justify-center" color="#ffffff"
                        loading={loadingBtn} size={20}/> : 'Đăng nhập' }</button>
                        
                    </form>
                    
                    <div className="flex text-gray-graybold font-medium text-xs uppercase mx-10 mt-2.5 mb-5 relative flex-row justify-around items-center">
                        <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -left-4" />
                        <div className="flex-grow-0">Hoặc</div>
                        <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -right-4"/> 
                    </div>

                    <div>
                        <button type="button" className="font-semibold text-blue-bold text-sm flex items-center ">
                            <span className="text-xl mr-1"><AiFillFacebook /></span>
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </div>

                    {error && <p className="mt-3.5 text-center text-sm text-red-primary">{error}</p>}
                    
                    <div className="mt-3.5">
                        <a href="https://www.facebook.com/Dinh.nt1097" className="text-xs text-blue-bold">Quên mật khẩu? liên hệ Dinh đẹp trai tại đây !</a>
                    </div>
                </div>
                
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">bạn chưa có tài khoản? 
                        <Link to={ROUTES.SIGN_UP} className="font-semibold text-blue-medium ml-1">Đăng ký</Link>
                    </p>
                </div>

                <div className="flex flex-col relative items-center justify-center mt-3.5">
                    <p className="text-sm text-black-dowload my-2.5 mx-5 text-center">Tải ứng dụng.</p>

                    <div className="flex justify-around my-2.5 mx-0">
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-2">
                            <img className="max-h-10" src="/images/appstore.png" alt="AppStore"/>
                        </a>
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-0">
                            <img className="max-h-10" src="/images/chplay.png" alt="AppStore"/>
                        </a>
                    </div>
                </div>
               
            </div>
        </div>
        {/* footer login */}

        <div className="flex flex-col items-center justify-center mt-10 ">
            <div className="flex items-center">
                <div className="flex flex-col mr-6 items-center">
                    <span className=" text-gray-graybold text-3xl"><RiVuejsLine /></span>
                    <div className="text-sm text-gray-graybold font-semibold">Dinh Dz</div>
                </div>
                <div className="text-gray-graybold text-sm ml-4 "> @2021 Dinhstagram all rights reserved.</div>
            </div>

            <div className="flex w-1/4 flex-col">
                <p className="text-gray-graybold font-semibold text-xs text-center"> Contact infor</p>

                <div className="flex items-center justify-around mt-2 text-2xl text-gray-graybold mb-2 ">
                    <a href="https://www.github.com/devntv" className="ml-4 flex items-end">
                        <AiFillGithub />
                        <span className="text-xs ml-1">Github</span>
                    </a>
                    <a href="https://www.facebook.com/Dinh.nt1097" className="ml-4 flex items-end" >
                        <AiFillFacebook />
                        <span className="text-xs ml-1">Facebook</span>

                    </a>
                    <a href="https://www.vinhdz.fun/" className="ml-4 flex items-end">
                        <RiEarthLine />
                        <span className="text-xs ml-1">Website</span>
                    </a>
                </div>
            </div>     
        </div>
    </>  
    )
}