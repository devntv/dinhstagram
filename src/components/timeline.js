/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import * as ROUTES from "../contants/routes";
import LoggedInUserContext from "../context/loggedInUser";
import usePhotos from "../hooks/use-photos";
import Posts from "./posts";
import useUserAllFollow from "../hooks/use-ALL-userFollow";

export default function Timeline() {
  const [unSkeleton, setUnSkeleton] = React.useState(true);
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  const { user: allUser } = useUserAllFollow();

  React.useEffect(() => {
    setTimeout(() => {
      setUnSkeleton(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="lg-res:container col-span-2 p-0 rounded-sm border-gray-primary sm-res:w-8/12 sm-res:min-w-minWidth420 overflow-hidden mt-2">
        {!photos ? (
          <>
            {unSkeleton && (
              <Skeleton count={3} width="100%" height={550} className="mb-4" />
            )}
          </>
        ) : (
          photos?.map((content) => (
            <Posts key={content.docId} content={content} />
          ))
          // <p className='text-center text-xl mt-16'>Hãy theo dõi bạn bè để xem những cập nhật mới.</p>
        )}
        {photos === null || photos.length === 0 ? (
          <>
            <p className="text-center text-xl mt-16">
              Hãy theo dõi bạn bè để xem những cập nhật mới.
            </p>
            <p className="text-center mt-1 text-gray-base text-sm">
              <Link
                className="text-blue-medium font-semibold"
                to="/profile/Yasuo"
              >
                Yasuo
              </Link>{" "}
              vừa đăng bài viết, hay theo dõi anh ấy để xem những cập nhật mới !
            </p>
          </>
        ) : (
          ""
        )}
      </div>
  
    </>
  );
}
