/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { FiCamera } from "react-icons/fi";
import { BsFillChatFill, BsArrowRight } from "react-icons/bs";
import { Skeleton } from "react-loading-skeleton";
import Footer from "../../pages/footer";

export default function Photos({ photos }) {
  return (
    <>
      <div className="border-t border-gray-primary mt-12 pt-4 " />
      <div className="flex flex-col items-center justify-center">
        <div
          className={`${
            photos.length > 0
              ? "grid grid-cols-3 gap-7 mt-4 w-auto"
              : "flex items-center justify-center"
          }`}
        >
          {!photos ? (
            <>
              <Skeleton count={12} width={300} height={400} />
            </>
          ) : photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo.docId} className="relative group object-cover">
                <img
                  src={photo.imageSrc}
                  alt={photo.caption}
                  className="h-80 w-auto object-cover bg-fixed rounded overflow-hidden bg-center bg-contain"
                />
                <div className="absolute hidden bottom-0 left-0 bg-gray-200 z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex ">
                  <p className="flex items-center text-white font-bold mr-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-white font-bold fill-white">
                    <BsFillChatFill className="h-6 w-8 mr-1 text-white" />
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          ) : null}
        </div>
        {!photos ||
          (photos.length === 0 && (
            <>
              <div className="mx-auto my-0 w-full relative flex items-center flex-col h-96 justify-center">
                <div className=" border-2 rounded-full h-20 w-20 flex items-center justify-center">
                  <FiCamera className="w-8 h-8" />
                </div>
                <div className="mt-8 text-2xl font-light">
                  Chưa có bài viết nào.
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="border w-8 mr-1 mt-1 text-gray-primary"></span>
                <span className="font-semibold text-blue-light">Hoặc</span>
                <span className="border w-8 mr-1 mt-1 text-gray-primary ml-1"></span>
              </div>
              <div className="mt-3 flex items-center cursor-pointer">
                <p className="text-blue-light text-sm">
                  Xem tất cả gợi ý dành cho bạn
                </p>
                <BsArrowRight className="ml-2 mt-1 text-blue-medium text-md" />
              </div>
            </>
          ))}

        <div className="text-sm text-gray-graysuggeseted h-28 flex items-center justify-center w-auto overflow-hidden relative mb-auto mt-8">
          Made with 🐤 by Devntv ● @2021 Vinhstagram all rights reserved.
        </div>
      </div>
    </>
  );
}
Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
