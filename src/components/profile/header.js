/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { FaUserCheck } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import useUser from "../../hooks/user-use";
import BtnProfileSetting from "./btnProfileSetting";
import useAuthListener from "../../hooks/use-auth-listener";
import { isUserFollowingProfile } from "../../services/firebase";
import ModalProfileFollow from "./modalProfileFollow";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    username: profileUsername,
    verification: verifiCheck,
  },
}) {
  const { user } = useUser();
  const loggedUser = useAuthListener();
  const { uid } = loggedUser.user;

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const isUserLogged = profileUserId === uid;

  const activeBtnFollowProfile =
    user.username && user.username !== profileUsername;

  const handleToggleFollow = () => 1;

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
  }, [user?.username, profileUserId, uid]);
  //  console.log(user.userId);
  //  console.log(uid);
  const [clickFollowUser, setClickFollowUser] = useState(false);
  const handleUnfollowProfile = (open) => {
    setClickFollowUser(open);
  };

  // props to cpn ModalProfileFollow
 

  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg relative">
        <div className="container flex justify-center">
          {user?.username && (
            <img
              className="rounded-full h-36 w-36 flex"
              alt={`${user?.username}profile`}
              src={`/images/avatars/${profileUsername}.jpg`}
            />
          )}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center -mt-24">
            <p className="text-2xl mr-3 mt-0 font-light">{profileUsername}</p>

            {verifiCheck === true ? (
              <GoVerified className="mr-5 text-blue-medium" />
            ) : (
              ""
            )}
            {isUserLogged && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="rounded w-auto px-2 h-7 border border-gray-graysemibold font-semibold text-black-primary text-sm"
                >
                  Chỉnh sửa trang cá nhân
                </button>
                <BtnProfileSetting />
              </div>
            )}

            {activeBtnFollowProfile && (
              <>
                <button
                  className={`bg-blue-medium font-semibold text-sm w-28 h-7 text-white rounded ml-3 ${
                    isFollowingProfile &&
                    'bg-gray-background w-8 border border-gray-graysemibold text-black-primary'
                  }`}
                  type="button"
                  onClick={handleToggleFollow}
                >
                  {isFollowingProfile ? "Nhắn tin" : "Theo dõi"}
                </button>
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
        </div>
      </div>
      <div className="absolute flex justify-center mx-auto my-0 w-full left-0">
        {clickFollowUser && (
          <ModalProfileFollow
            clickFollowUser={clickFollowUser}
            handleUnfollowProfile={handleUnfollowProfile}
            profileUsername={profileUsername}
            userUsername = {profileUsername}
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
  }).isRequired,
};
