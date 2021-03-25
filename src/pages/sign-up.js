/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useContext, useEffect, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { RiVuejsLine, RiEarthLine } from 'react-icons/ri'
import ClipLoader from "react-spinners/ClipLoader"

import FirebaseContext from '../context/firebase'
import * as ROUTES from '../contants/routes'


export default function login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password.length < 6 || emailAddress === '';
    const [displayPass, setDisplayPass] = useState(true);

    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleDisplay = () => {
        setDisplayPass(!displayPass)
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        // try {
        //     setLoadingBtn(true)

        // } catch (e) {

        //     setLoadingBtn(false)
        // }
    }
    useEffect(() => {
        document.title = 'Đăng ký • Dinhstagram'
    }, [])


    return (
        <>
            <div className="container flex mx-auto mt-20 max-w-screen-md justify-center items-center h-screen">

                <div className="flex flex-col w-1/2 max-w-maxwidth350 ">
                    <div className="flex flex-col items-center  bg-white p-4 mb-2 border border-gray-primary ">
                        <h1 className="flex justify-center ">
                            <img className="mt-6 mx-auto mb-4 h-16" src='/images/logo2.png' alt="DinhstagramLogo" />
                        </h1>

                        <h2 className="text-center mb-3 leading-5 mx-10  text-gray-graybold font-semibold">Đăng ký để xem ảnh và video từ bạn bè.</h2>

                        <button type="button" className="bg-blue-medium flex text-white w-full rounded h-8 font-semibold items-center justify-center max-w-maxwidth258">
                            <span className="text-xl mr-1"><AiFillFacebook /></span>
                        Đăng nhập bằng Facebook
                    </button>

                        <div className="flex text-gray-graybold font-medium text-xs uppercase mx-10 mt-2.5 mb-5 relative flex-row justify-around items-center">
                            <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -left-4" />
                            <div className="flex-grow-0">Hoặc</div>
                            <div className="bg-gray-primary h-px relative top-0.5 flex-grow w-24 -right-4" />
                        </div>

                        <form onSubmit={handleSignUp} method="POST" className="p-0 m-0 max-w-maxwidth258">
                            <input
                                aria-label="Nhập vào địa chỉ Email, tên người dùng hoặc số điện thoại"
                                type="text"
                                placeholder="địa chỉ Email"
                                className="text-xs text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
                                    rounded mb-3 bg-gray-background"
                                onChange={({ target }) => setEmailAddress(target.value)}
                                value={emailAddress}
                            />

                            <input
                                aria-label="Nhập vào tên đầy đủ"
                                type="text"
                                placeholder="Tên đầy đủ"
                                className="text-xs text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
                                    rounded mb-3 bg-gray-background"
                                onChange={({ target }) => setFullName(target.value)}
                                value={fullName}
                            />

                            <input
                                aria-label="Nhập vào tên người dùng"
                                type="text"
                                placeholder="Tên người dùng"
                                className="text-xs text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
                                    rounded mb-3 bg-gray-background"
                                onChange={({ target }) => setUserName(target.value)}
                               value={userName}
                            />

                            <input
                                aria-label="Nhập vào password"
                                type={!displayPass ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                className="text-xs text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary
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

                            <button type="submit" disabled={isInvalid}
                                className={`bg-blue-medium text-white w-full rounded h-8 font-semibold ${isInvalid && `opacity-50 cursor-default`}`}
                            >{loadingBtn ? <ClipLoader className="flex items-center justify-center" color="#ffffff"
                                loading={loadingBtn} size={20} /> : 'Đăng ký'}</button>

                            <p className="text-center my-2.5 text-xs  text-gray-graybold">
                                Bằng cách đăng ký, bạn đồng ý với 
                                <a className="font-semibold" href="https://help.instagram.com/581066165581870"> Điều khoản</a>,
                                <a className="font-semibold" href="https://help.instagram.com/519522125107875"> Chính sách dữ liệu </a>
                                và
                                <a className="font-semibold" href="https://www.instagram.com/legal/cookies/"> chính sách cookie </a>
                                 của chúng tôi.
                            </p>    

                        </form>

                        {error && <p className="mt-3.5 text-center text-sm text-red-primary">{error}</p>}

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

            <div className="flex flex-col items-center justify-center mt-14 ">
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
