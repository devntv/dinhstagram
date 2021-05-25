/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { FaUserCheck } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import useUser from "../../hooks/user-use";
import BtnProfileSetting from "./btnProfileSetting";
import useAuthListener from "../../hooks/use-auth-listener";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from '../../context/user'
import ModalProfileFollow from "./modalProfileFollow";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
    verification: verifiCheck,
    bio: bioProfile,
    avatarSignUp
  },
}) {
  const { user: loggedInUser } = useContext(UserContext)
  // console.log(loggedInUser);
  const { user } = useUser(loggedInUser?.uid);
  const loggedUser = useAuthListener();

  const { uid } = loggedUser.user;
  const [openModal, setOpenModal] = useState(false)
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  // check manager profile setting
  const isUserLogged = profileUserId === uid;
// console.log(profileUserId);
// console.log(uid);
  const activeBtnFollowProfile =
    user?.username && user.username !== profileUsername;

  const handleToggleFollow = async() => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount+ 1,
    });
    setOpenModal(false)
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);
  
  const [clickFollowUser, setClickFollowUser] = useState(false);
  const handleUnfollowProfile = (open) => {
    setOpenModal(open);
  };

  // console.log(profileUsername);
  // console.log(user?.username);
  // console.log(avatarSignUp);
  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg relative">
        <div className="container flex justify-cente items-center">
          {profileUsername ? (
            <img
              className="rounded-full h-36 w-36 flex"
              alt={`${user?.username}profile`}
              // src={`/images/avatars/${profileUsername}.jpg`}             
              src={avatarSignUp || `/images/avatars/${profileUsername}.jpg`}
            />
          ): (
            <img
            className="rounded-full h-36 w-36 flex"
            alt='vinhstagram-avtar'
            src='/images/avatars/yasuo.jpg'
          />
          )}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2 mt-28">
          <div className="container flex items-center -mt-24">
            <p className="text-2xl mr-3 mt-0 font-light">{profileUsername}</p>

            {verifiCheck === true ? (
              <GoVerified className="mr-2 ml-0 text-blue-medium" />
            ) : (
              ""
            )}
            {isUserLogged ? (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="rounded w-auto px-2 h-7 border border-gray-graysemibold font-semibold text-black-primary text-sm"
                >
                  Chỉnh sửa trang cá nhân
                </button>
                <BtnProfileSetting />
              </div>
            ):''}

            {activeBtnFollowProfile && (
              <>
                {/* <button
                  className={`bg-blue-medium font-semibold text-sm w-28 h-7 text-white rounded ml-3 ${
                    isFollowingProfile &&
                    'bg-gray-background w-8 border border-gray-graysemibold text-black-primary'
                  }`}
                  type="button"
                  onClick={handleToggleFollow}
                >
                  {isFollowingProfile ? "Nhắn tin" : "Theo dõi"}
                </button> */}
                {isFollowingProfile ? (
                  <button
                    type="button"
                    className="bg-gray-background w-20 h-7 font-semibold text-sm rounded border border-gray-graysemibold text-black-primary"
                   
                  >
                    Nhắn tin
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-medium font-semibold text-sm w-28 h-7 text-white rounded ml-3"
                    onClick={handleToggleFollow}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter'){
                        handleToggleFollow()
                          }}}
                  >
                    Theo dõi
                  </button>
                )}
                 
                {isFollowingProfile && (
                  <button
                    className="flex justify-center items-center w-20 h-7 rounded border border-gray-graysemibold text-black-primary ml-2"
                    type="button"
                    onClick={handleUnfollowProfile}
                  >
                    <FaUserCheck />
                  </button>
                )}
                <button
                  className={`bg-blue-medium font-extralight w-9 ml-2 h-7 text-white rounded flex justify-center items-center text-xl 
                ${
                  isFollowingProfile &&
                  "bg-gray-background text-black-primary border border-gray-graysemibold "
                }`}
                  type="button"
                >
                  <RiArrowDownSLine />
                </button>
                <button type="button" className="ml-3 h-7 w-20 text-2xl">
                  <BsThreeDots />
                </button>
              </>
            )}
          </div>
          <div className='container flex mt-5'>
                {!followers  || !following  ? (
                  <Skeleton count={1} width={678} height={24} />
                ): (
                  <>
                    <p className='mr-10'>
                      <span><span className='font-semibold'>{photosCount}</span> bài viết</span>
                    </p>
                    <p className='mr-10'>
                      <span><span className='font-semibold'>{followerCount}</span> người theo dõi</span>
                    </p>
                    <p className='mr-10'>
                      <span>Đang theo dõi <span className='font-semibold'>{following.length}</span> người dùng</span>
                    </p>
                  </>
                )}
          </div>
          <div className='container flex mt-4 text-black-primary'>
                <p className='font-semibold'>{!fullName ? <Skeleton count={1} height={24} />: fullName}</p>
          </div>
          <div className='container'>
                <p className='text-md text-black-primary font-normal font-sans'>{!bioProfile ? '': bioProfile}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-center mx-auto my-0 w-auto left-0">
        {openModal && (
          <ModalProfileFollow
            clickFollowUser={openModal}
            handleUnfollowProfile={handleUnfollowProfile}
            profileUsername={profileUsername}
            userUsername={profileUsername}
            handleToggleFollow={handleToggleFollow}
            avatarSignUp={avatarSignUp}
          />
        )}
      </div>
    </>
  );
}
// bg-blue-medium font-bold text-sm w-28 h-8 text-white rounded
Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    username: PropTypes.string,
    verification: PropTypes.bool,
    followers: PropTypes.array,
    bio: PropTypes.string,
    avatarSignUp: PropTypes.string
  }).isRequired,
};
