import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useParams } from 'react-router'
import PostCard from '../../components/PostCard/PostCard'
import { authContext } from '../../Context/AuthContextProvider'
import { getUserData } from '../../Services/getUserData'
import { getWholePost } from '../../Services/getWholePost'
import PostCardSkeleton from './../../components/PostCard/PostCardSkeleton'

export default function WholePost() {
  // Using React Router Hook To Get postId From The Params
  const {postId} =  useParams()

  // Token Authentication Hook
  const {token} = useContext(authContext)

  const {data , isLoading} = useQuery({
    queryFn:() => getWholePost(postId , token),
    queryKey: ["wholePost" , postId]
  })  

  const {data : userDataRes} = useQuery({
    queryFn:() => getUserData(token),
    queryKey: ["userData" , token],
    enabled: !!token
  })  
  const userData = userDataRes?.data?.data?.user

  return (
    <>
    <div className="flex w-full content-height bg-[#f0f2f5] justify-center p-5">
      <div className="flex h-fit basis-171 flex-col gap-4 rounded-xl overflow-hidden">
        {isLoading ? <PostCardSkeleton /> : <PostCard postData={data?.data?.data?.post} userData={userData} fullDetails={true} key={data?.data?.data?.post?.id} />}
      </div>
    </div>
    </>
  )
}
