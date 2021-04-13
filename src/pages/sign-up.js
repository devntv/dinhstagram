/* eslint-disable no-empty */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect, Fragment } from 'react'
// alert
import { useAlert, transitions } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import PulseLoader from 'react-spinners/PulseLoader'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../contants/routes'
import {doesUsernameExist} from '../services/firebase'
import Footer from './footer'


export default function login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const isInputEmail =  emailAddress !== '';
    const isInputPassword = password !=='';
    const isInputFullname = fullName !=='';
    const isInputUsername = userName !=='';

    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const isInvalid = password.length < 6 || emailAddress === '';
    const [displayPass, setDisplayPass] = useState(true);

    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleDisplay = () => {
        setDisplayPass(!displayPass)
    }
    // alert show
    const alert = useAlert()
// sign -up and check user is already exist
    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoadingBtn(true);
        const usernameExist = await doesUsernameExist(userName);
       
        if(!usernameExist.length){
            try {
                const createUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password)

                // auth => email and pass and username (display name)
                await createUserResult.user.updateProfile({
                    displayName: userName
                });

                // firebase user collection -> create a document
                await firebase.firestore().collection('users').add({
                    userId: createUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()

                });
                setLoadingBtn(false);
                alert.success(<div style={{textTransform:'none'}}>
                                xin chào <span style={{color:'#0095f6', fontWeight:'bold', fontSize:'16px'}}>{userName}! 🙈🙈</span>
                              </div>, 
                              {timeout: 6000,  transition: transitions.FADE})
                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setLoadingBtn(false);
               if(error.code === "auth/email-already-in-use"){
                setError('Địa chỉ Email hoặc người dùng bạn vừa nhập đã được sử dụng bởi tài khoản khác.');
                setEmailAddress('');
                setFullName('');
                setPassword('');
                setUserName('');          
               }   
               if(error.code === 'auth/invalid-email'){
                setError('Địa chỉ Email vừa nhập không đúng định dạng.');
                setEmailAddress('');
               }   
            }
        } else {
            setLoadingBtn(false);
            setEmailAddress('');
            setFullName('');
            setPassword('');
            setUserName('');       
            setError('Người dùng bạn vừa đăng ký đã tồn tại, vui lòng chọn 1 người dùng khác!')
        }

    }
    useEffect(() => {
        document.title = 'Đăng ký • Vinhstagram'
    }, [])

   

    return (
        <>
            <div className="container flex mx-auto px-3 max-w-screen-md justify-center items-center h-screen">

                <div className="flex flex-col  max-w-maxwidth350 ">
                    <div className="flex flex-col items-center bg-white p-4 mb-2 border border-gray-primary ">
                        <h1 className="flex justify-center ">
                            <img className="mt-4 h-16 w-48 mx-auto mb-4" src='/images/vsgLogo.png' alt="DinhstagramLogo" />
                        </h1>

                        <h1 className="text-center mb-3 leading-5 mx-10  text-gray-graybold font-semibold">Đăng ký để xem ảnh và video từ bạn bè.</h1>

                        <button type="button" className="bg-blue-medium flex text-white w-full rounded h-9 font-semibold items-center justify-center max-w-maxwidth258">
                            <span className="text-xl mr-1"><AiFillFacebook /></span>
                        Đăng nhập bằng Facebook
                        </button>

                        <div className="flex text-gray-graybold font-medium text-xs uppercase mx-10 mt-2.5 mb-5 relative flex-row justify-around items-center">
                            <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -left-4" />
                            <div className="flex-grow-0 text-sm">Hoặc</div>
                            <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -right-4" />
                        </div>

                        <form onSubmit={handleSignUp} method="POST" className="p-0 m-0 max-w-maxwidth258 relative">
                            { isInputEmail && <p className="text-xs mt-0 text-gray-graybold h-0 absolute top-1 left-2 animate-scaletext">Email :  dùng để đăng nhập </p>}
                            <input
                                aria-label="Nhập vào địa chỉ Email, tên người dùng hoặc số điện thoại"
                                type="text"
                                placeholder="Địa chỉ Email"
                                className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                    rounded mb-2 bg-gray-background ${isInputEmail && `text-xs pt-4 pr-0 pb-1 pl-2 text-black-faded font-medium`}`}
                                onChange={({ target }) => setEmailAddress(target.value)}
                                value={emailAddress}
                            />

                            { isInputFullname && <p className="text-xs -mt-1 text-gray-graybold h-0 absolute top-14 left-2 animate-scaletext">Tên đầy đủ :</p>}
                            <input
                                aria-label="Nhập vào tên đầy đủ"
                                type="text"
                                placeholder="Tên đầy đủ"
                                className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                rounded mb-2 bg-gray-background ${isInputFullname && `text-xs pt-6 pr-0 pb-3 pl-2 text-black-faded font-medium`}`}
                                onChange={({ target }) => setFullName(target.value)}
                                value={fullName}
                            />

                            { isInputUsername && <p className="text-xs mt-1 text-gray-graybold h-0 absolute top-26 left-2 animate-scaletext">Tên người dùng :</p>}
                            <input
                                aria-label="Nhập vào tên người dùng"
                                type="text"
                                placeholder="Tên người dùng"
                                className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                rounded mb-2 bg-gray-background ${isInputUsername && `text-xs pt-4 pr-0 pb-1 pl-2 text-black-faded font-medium`}`}
                                onChange={({ target }) => setUserName(target.value)}
                               value={userName}
                            />

                            { isInputPassword && <p className="text-xs mt-1 text-gray-graybold h-0 absolute top-36 left-2 animate-scaletext">Mật khẩu :  {password.length} kí tự</p>}
                            <input
                                aria-label="Nhập vào password"
                                type={!displayPass ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                className={`text-xs text-gray-base w-full mr-3 py-4 px-4 h-10 border border-gray-primary
                                rounded mb-2 bg-gray-background ${isInputPassword && `text-xs pt-4 pr-0 pb-1 pl-2 text-black-faded font-medium`}`}
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />
                            <div className="flex justify-end h-0">
                                <button type="button"
                                    className="relative font-semibold bottom-9 right-2 text-sm cursor-pointer"
                                    onClick={handleDisplay}
                                > {password === '' ? '' : 'Hiển thị' && displayPass ? 'Hiển thị' : 'Ẩn'}

                                </button>
                            </div>

                            <button type="submit" disabled={isInvalid}
                                className={`bg-blue-medium text-white w-full rounded h-9 font-semibold ${isInvalid && `opacity-50 cursor-default`}`}
                            >{loadingBtn ? <PulseLoader className="flex items-center justify-center" color="#f7f7f7"
                                loading={loadingBtn} size={10} /> : 'Đăng ký'}</button>

                            {error && <p className="mt-3.5 text-center text-sm text-red-primary">{error}</p>}
                            <p className="text-center my-2.5 text-xs  text-gray-graybold">
                                Bằng cách đăng ký, bạn đồng ý với 
                                <a className="font-semibold" href="https://help.instagram.com/581066165581870"> Điều khoản</a>,
                                <a className="font-semibold" href="https://help.instagram.com/519522125107875"> Chính sách dữ liệu </a>
                                và
                                <a className="font-semibold" href="https://www.instagram.com/legal/cookies/"> chính sách cookie </a>
                                 của chúng tôi.
                            </p>                                       
                        </form>

                      

                    </div>

                    <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                        <p className="text-sm">bạn có tài khoản?
                            <Link to={ROUTES.LOGIN} className="font-semibold text-blue-medium ml-1">Đăng nhập</Link>
                        </p>
                    </div>

                    <div className="flex flex-col relative items-center justify-center mt-3.5">
                        <p className="text-sm text-black-dowload my-2.5 mx-5 text-center">Tải ứng dụng.</p>

                        <div className="flex justify-around my-2.5 mx-0">
                            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-2">
                                <img className="max-h-10" src="/images/appstore.png" alt="AppStore" />
                            </a>
                            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" className="mr-0">
                                <img className="max-h-10" src="/images/chplay.png" alt="AppStore" />
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
