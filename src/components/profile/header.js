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
import { BsThreeDots, BsArrowRight } from "react-icons/bs";
import { RiArrowDownSLine, RiAddFill } from "react-icons/ri";
import useUser from "../../hooks/user-use";
import BtnProfileSetting from "./btnProfileSetting";
import useAuthListener from "../../hooks/use-auth-listener";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from "../../context/user";
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
    avatarSignUp,
  },
}) {
  const { user: loggedInUser } = useContext(UserContext);
  // console.log(loggedInUser);
  const { user } = useUser(loggedInUser?.uid);
  const loggedUser = useAuthListener();
  const [addBio, setAddBio] = useState(false);

  const handleBtnAddBio = () =>
    setTimeout(() => {
      setAddBio(true);
    }, 500);
  useEffect(() => {
    setTimeout(() => {
      setAddBio(false);
    }, 2000);
  }, [addBio]);

  const { uid } = loggedUser.user;
  const [openModal, setOpenModal] = useState(false);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  // check manager profile setting
  const isUserLogged = profileUserId === uid;
  // console.log(profileUserId);
  // console.log(uid);
  const activeBtnFollowProfile =
    user?.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    setOpenModal(false);
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
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
      <div className="grid grid-cols-3 gap-3 justify-between mx-auto max-w-screen-lg relative sm-res:-mt-12">
        <div className="block ml-3 h-0 sm-res:container sm-res:flex sm-res:justify-center sm-res:items-center sm-res:ml-8  sm-res:h-auto md-res:ml-16">
          {profileUsername ? (
            <img
              className="rounded-full flex h-18 w-18 sm-res:h-36 sm-res:w-36 md-res:mt-14 lg-res:mt-16 lg-res:ml-8 "
              alt={`${user?.username}profile`}
              // src={`/images/avatars/${profileUsername}.jpg`}
              src={avatarSignUp || `/images/avatars/${profileUsername}.jpg`}
            />
          ) : (
            <img
              className="rounded-full h-36 w-36 flex"
              alt="vinhstagram-avtar"
              src="/images/avatars/yasuo.jpg"
            />
          )}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2 mt-36">
          <div className="container flex items-center -mt-36 flex-wrap minium:-mt-28 sm-res:-mt-24 sm-res:flex-nowrap">
            <p className="text-2xl mr-3 mt-0 font-light">{profileUsername}</p>

            {verifiCheck === true ? (
              <GoVerified className="mr-2 ml-0 text-blue-medium w-7" />
            ) : (
              ""
            )}
            {isUserLogged ? (
              <div className="flex items-center justify-center flex-wrap ">
                <button
                  type="button"
                  className="rounded mt-2 w-auto px-2 h-7 border border-gray-graysemibold font-semibold text-black-primary text-sm sm-res:mt-0 "
                >
                  Chỉnh sửa trang cá nhân
                </button>
                <BtnProfileSetting />
              </div>
            ) : (
              ""
            )}

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
                    className="bg-blue-medium font-semibold text-sm w-28 h-7 text-white rounded xs-res2:ml-3"
                    onClick={handleToggleFollow}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleToggleFollow();
                      }
                    }}
                  >
                    Theo dõi
                  </button>
                )}

                {isFollowingProfile && (
                  <button
                    className="flex justify-center items-center h-7 rounded border border-gray-graysemibold text-black-primary w-16 flex-wrap minium2:flex-nowrap minium2:w-20 minium:ml-2"
                    type="button"
                    onClick={handleUnfollowProfile}
                  >
                    <FaUserCheck />
                  </button>
                )}
                <button
                  className={`bg-blue-medium text-xl hidden font-extralight w-9 ml-2 h-7 text-white rounded minium2:flex minium2:justify-center minium2:items-center 
                ${
                  isFollowingProfile &&
                  "bg-gray-background text-black-primary border border-gray-graysemibold minium2:hidden  "
                }`}
                  type="button"
                >
                  <RiArrowDownSLine />
                </button>
                <button
                  type="button"
                  className="hidden xs-res2:block xs-res2:ml-2 xs-res2:text-2xl sm-res:ml-3 sm-res:h-7 sm-res:w-20 sm-res:text-2xl"
                >
                  <BsThreeDots />
                </button>
              </>
            )}
          </div>
          <div className="container mt-5 hidden sm-res:flex">
            {!followers || !following ? (
              <Skeleton count={1} width={678} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span>
                    <span className="font-semibold">{photosCount}</span> bài
                    viết
                  </span>
                </p>
                <p className="mr-10">
                  <span>
                    <span className="font-semibold">{followerCount}</span> người
                    theo dõi
                  </span>
                </p>
                <p className="mr-10">
                  <span>
                    Đang theo dõi{" "}
                    <span className="font-semibold">{following.length}</span>{" "}
                    người dùng
                  </span>
                </p>
              </>
            )}
          </div>
          <div className="container flex mr-2 text-black-primary sm-res:-mt-10 ">
            <p className="font-semibold relative -left-24 top-7 minium:-left-28 minium:mt-6 minium:ml-2 minium2:-left-32 minium2:ml-6 minium2:mt-8 xs-res:mt-10 xs-res:-left-36 xs-res2:ml-1 xs-res2:static xs-res2:mt-2 sm-res:mt-14">
              {!fullName ? <Skeleton count={1} height={24} /> : fullName}
              <p className=" text-black-primary font-normal font-sans w-72 text-sm break-words minium2:w-80 xs-res:w-96 xs-res2:text-base xs-res2:w-auto">
                {!bioProfile ? "" : bioProfile}
              </p>
            </p>
          </div>

          <div className="container"></div>
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
      {isUserLogged && (
        <div className="flex flex-col mt-8 -mb-4 items-center justify-center xs-res2:flex-row xs-res2:mt-8 md-res:mb-0 md-res2:mt-0 md-res2:ml-60 lg-res:ml-48">
          <button
            onClick={handleBtnAddBio}
            type="button"
            className={`flex items-center p-2 justify-items-center bg-blue-medium mt-2 text-white rounded w-auto text-xs font-normal ${
              addBio && "opacity-60"
            }`}
          >
            {addBio ? (
              "Đang bảo trì 😥"
            ) : (
              <>
                <RiAddFill className="text-base font-bold sm-res:text-xl" />{" "}
                Thêm tiểu sử{" "}
              </>
            )}
          </button>
          <button
            type="button"
            className="text-xs text-gray-graybold ml-2 border p-2 mt-2 rounded cursor-default"
          >
            Một số tinh năng đang được phát triển
          </button>
          <a
            href="https://github.com/devntv/dinhstagram-react"
            className="text-xs text-white bg-red-primary ml-2 border p-2 mt-2 rounded flex items-center"
          >
            trở thành Contributors{" "}
            <BsArrowRight className="text-lg font-bold ml-1" />{" "}
          </a>
        </div>
      )}

      <div className="mt-10 flex text-sm items-center w-auto justify-center -mb-8 border-t border-gray-primary relative  mx-0 sm-res:hidden">
        {!followers || !following ? (
          <Skeleton count={1} width={678} height={24} />
        ) : (
          <div className="flex overflow-hidden items-center justify-center mt-3">
            <span className="flex flex-col items-center flex-wrap justify-center mr-9 xs-res:mr-14">
              <span className="font-semibold mb-1">{photosCount}</span>
              <span className="mb-4 text-gray-graybold">bài viết</span>
            </span>

            <span className="flex flex-col items-center flex-wrap justify-center break-words text-center mr-9 xs-res:mr-14">
              <span className="font-semibold mb-1">{followerCount} </span>
              <span className="mb-4 text-gray-graybold">người theo dõi</span>
            </span>

            <span className="flex flex-col items-center flex-wrap justify-center break-words text-center">
              <span className="text-gray-graybold">Đang theo dõi</span>
              <span className="font-semibold">{following.length}</span>{" "}
              <span className="text-gray-graybold">người dùng</span>
            </span>
          </div>
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
    avatarSignUp: PropTypes.string,
  }).isRequired,
};
