import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import PostCard from "../../components/PostCard/PostCard";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton";
import PostCreationField from "../../components/PostCreationField/PostCreationField";
import SideNav from "../../components/SideNav/SideNav";
import { authContext } from "../../Context/AuthContextProvider";
import { getAllPosts } from "../../Services/getAllPosts";
import { getUserData } from "../../Services/getUserData";
import PostEditModal from "../../components/PostEditModal/PostEditModal";
import SuggestedFriendsGroup from "../../components/SuggestedFriendsGroup/SuggestedFriendsGroup";

export default function Feed() {


  // Token Authentication Hook
  const { token } = useContext(authContext);

  // Using TANSTACK Query For State Management
  const {data : postsRes , isLoading} = useQuery({
    queryFn: ()=> getAllPosts(token),
    queryKey: ["posts" , token],
    enabled: !!token
  })

  const {data: userDataRes , isLoading : isUserDataLoading} = useQuery({
    queryFn: ()=> getUserData(token),
    queryKey: ["userData" , token],
    enabled: !!token
  })

  const userData = userDataRes?.data?.data?.user
  const posts = postsRes?.data?.data?.posts || []


  const numberOfSkeletons = 3;

  return (
    <>
    <div className="flex min-h-screen justify-center bg-[#f0f2f5]">
      <div className="relative flex basis-7xl justify-center gap-4 px-3 py-3.5 flex-col xl:flex-row">

        <SideNav />
        

        <div className="flex h-fit xl:basis-171 flex-col gap-4 rounded-xl overflow-hidden w-full">
          <PostCreationField userData={userData} isUserDataLoading={isUserDataLoading}/>

          {isLoading ? Array.from({ length : numberOfSkeletons}).map((_ , index) => (<PostCardSkeleton key={index} />)) : posts?.map((post) => (<PostCard postData={post} userData={userData} fullDetails={false} key={post.id} />))}

        </div>

        <div className="sticky top-20 h-fit basis-75 rounded-2xl bg-white shadow p-4 hidden xl:block">
          <SuggestedFriendsGroup />
        </div>
      </div>
    </div>
  </>
  );
}
