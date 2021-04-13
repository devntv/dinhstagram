/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import { AiFillFacebook } from 'react-icons/ai'
import PulseLoader from 'react-spinners/PulseLoader'
import s1 from '../images/s1.png'
import s2 from '../images/s2.png'
import s3 from '../images/s3.png'
import s4 from '../images/s4.png'
import s5 from '../images/s5.png'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../contants/routes'
import Footer from './footer'


export default function login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password.length < 6 || emailAddress === '';
    const isInputEmail =  emailAddress !== '';
    const isInputPassword = password !=='';
    const [displayPass, setDisplayPass] = useState(true);
    const [randomImage, setRandomImage] = useState(s1)
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleDisplay = () => {
        setDisplayPass(!displayPass)
    }

     // alert show
    const alert = useAlert()
    // login
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoadingBtn(true);
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
            alert.success(<span style={{textTransform:'none'}}>Đăng nhập thành công🎉</span>, ({timeout: 1800}))
            setLoadingBtn(false);
        } catch (e) {
            if(e.code === 'auth/invalid-email'){
                setError('Email bạn vừa nhập không đúng định dạng. Vui lòng kiểm tra và thử lại.') 
                setEmailAddress('');
                setPassword('');
            } else if (e.code === 'auth/user-not-found'){
                setError('Tên người dùng, Email bạn đã nhập không thuộc về tài khoản nào. Vui lòng kiểm tra và thử lại.')
                setEmailAddress('');
                setPassword('');
            } else if(e.code === 'auth/wrong-password') {
                setError('Mật khẩu bạn vừa nhập không chính xác. Vui lòng kiểm tra lại.')
                setPassword('');
            }
            setLoadingBtn(false);
            //  e && setEmailAddress('');
            //  e && setPassword('');
        }
    }
    useEffect(() => {
        document.title = ' Đăng nhập • Vinhstagram'
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

            <div className="flex w-3/4 relative -ml-10 -mr-5 bg-cover h-auto">
                <img className="max-w-full  animate-mobileScreen" src={randomImage} alt="login phone mobile" />  
            </div>

            <div className="flex flex-col w-7/12">
                <div className="flex flex-col items-center  bg-white p-6 mb-2 border border-gray-primary">
                    <h1 className="flex  justify-center ">
                        <img className=" mt-4 h-16 w-48 mx-auto mb-4" src='/images/vsgLogo.png' alt="DinhstagramLogo" />
                    </h1>
                   
                    <form onSubmit={handleLogin} method="POST" className="relative">
                        {isInputEmail && <p className="text-xs -mt-1 text-gray-graybold h-0 absolute top-1 left-2 animate-scaletext">Email :</p>}
                        <input
                            aria-label="Nhập vào địa chỉ Email"
                            type="text"
                            onFocus={(e) => {e.target.placeholder = "nhập vào địa chỉ Email"}} 
                            onBlur={(e)=> { e.target.placeholder ="Địa chỉ Email"}}
                            placeholder="Địa chỉ Email"
                            className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                rounded mb-2 bg-gray-background ${isInputEmail && `text-xs pt-3 pr-0 pb-1 pl-2 text-black-faded font-medium`}`}
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                       {isInputPassword &&<span className="text-xs mt-0.5 text-gray-graybold absolute top-12 left-2 animate-scaletext">Mật khẩu :</span>}
                        <input
                            aria-label="Nhập vào password"
                            type={!displayPass ? 'text' : 'password'}
                            onFocus={(e) => {e.target.placeholder = "nhập vào mật khẩu"}} 
                            onBlur={(e)=> { e.target.placeholder ="mật khẩu"}}
                            placeholder="Mật khẩu"
                            className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                rounded mb-3 bg-gray-background ${isInputPassword && `text-xs pt-3 pr-0 pb-1 pl-2 text-black-faded font-medium`}`}
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <div className="flex justify-end h-0">
                            <button type="button"
                                className="relative font-semibold bottom-10 right-2 text-sm cursor-pointer"
                                onClick={handleDisplay}
                            > {password === '' ? '' : 'Hiển thị' && displayPass ? 'Hiển thị' : 'Ẩn'}

                            </button>
                        </div>

                        <button  type="submit" disabled={isInvalid}
                            className={`bg-blue-medium text-white w-full rounded h-9 font-semibold ${isInvalid && `opacity-50 cursor-default`}`}
                        >{loadingBtn ? <PulseLoader className="flex items-center justify-center" color="#f7f7f7"
                        loading={loadingBtn} size={10}/> : 'Đăng nhập' }</button>
                        
                    </form>
                   
                    <div className="flex text-gray-graybold w-88-percent font-medium text-xs uppercase mx-10 mt-3 mb-5 relative flex-row justify-around items-center">
                        <div className="bg-gray-primary h-px relative top-0.5 flex-grow -left-4" />
                        <div className="flex-grow-0 text-sm">Hoặc</div>
                        <div className="bg-gray-primary h-px relative top-0.5 flex-grow -right-4"/> 
                    </div>

                    <div>
                        <button type="button" className="font-semibold text-blue-bold text-sm flex items-center ">
                            <span className="text-xl mr-1"><AiFillFacebook /></span>
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </div>

                    {error && <p className="mt-3.5 text-center text-sm text-red-primary">{error}</p>}
                    
                    <div className="mt-3.5">
                        <a href="https://www.facebook.com/Dinh.nt1097" className="text-xs text-blue-bold">Quên mật khẩu?</a>
                    </div>
                </div>
                
                <div className="flex justify-center items-center flex-col w-full bg-white p-5 border border-gray-primary">
                    <p className="text-sm">bạn chưa có tài khoản? 
                        <Link to={ROUTES.SIGN_UP} className="font-semibold text-blue-medium ml-1">Đăng ký</Link>
                    </p>
                </div>

                <div className="flex flex-col relative items-center justify-center mt-3.5">
                    <p className="text-sm text-black-dowload my-2.5 mx-5 text-center">Tải ứng dụng.</p>

                    <div className="flex justify-around my-2.5 mx-0">
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-2">
                            <img className="max-h-11" src="/images/appstore.png" alt="AppStore"/>
                        </a>
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-0">
                            <img className="max-h-11" src="/images/chplay.png" alt="AppStore"/>
                        </a>
                    </div>
                </div>
               
            </div>
        </div>
        {/* footer login */}
        <Footer />
    </>  
    )
}