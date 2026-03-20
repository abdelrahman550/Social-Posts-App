import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import PostCard from "../../components/PostCard/PostCard";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton";
import { authContext } from "../../Context/AuthContextProvider";
import { getUserData } from "../../Services/getUserData";
import { getUserPosts } from "../../Services/getUserPosts";
import ProfileInfoCard from "./ProfileComponents/ProfileInfoCard";

export default function Profile() {
  // Token Authentication Hook
  const { token } = useContext(authContext);

  const { data: userDataRes } = useQuery({
    queryFn: () => getUserData(token),
    queryKey: ["userData", token],
    enabled: !!token,
  });

  const userData = userDataRes?.data?.data?.user;

  const { data: userPostsRes, isLoading } = useQuery({
    queryFn: () => getUserPosts(token , userData),
    queryKey: ["userPosts", token],
    enabled: !!token,
  });

  const posts = userPostsRes?.data?.data?.posts;
  const myPostsLength = posts?.length 

  const numberOfSkeletons = 1;

  return (
    <>
      <div className="bg-[#f0f2f5] p-5 ">
        <ProfileInfoCard userData={userData} postsLength={myPostsLength}/>

        <div className="mx-auto grid w-full max-w-7xl gap-4">
          <div className="flex items-center justify-center bg-white p-4 text-3xl font-extrabold text-slate-500 rounded-2xl">
            My Posts
          </div>


          {isLoading
            ? Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            : posts?.map((post) => (
                <PostCard
                  postData={post}
                  userData={userData}
                  fullDetails={false}
                  key={post.id}
                />
              ))}
        </div>
      </div>
    </>
  );
}
