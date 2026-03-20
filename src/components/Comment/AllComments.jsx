import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from './../../Context/AuthContextProvider';
import CommentInputField from './CommentInputField';
import NoCommentsMsg from './NoCommentsMsg';
import RegularComment from './RegularComment';

export default function AllComments({postId}) {
  // Token Authentication Hook
  const { token } = useContext(authContext);

  // Getting All Posts From The API
  function getAllComments() {

      return axios.get(
        `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
        {
          headers: {
            token: token,
          },
        },
      );

  }

  const {data} = useQuery({
    queryFn: getAllComments,
    queryKey: ["All Comments" , postId]
  })

  const comments = data?.data?.data?.comments

  return (
    <div className="bg-[#F7F8FA] p-4">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 mb-3">
          <div className="flex gap-2">
            <span className="text-sm font-extrabold">Comments</span>
            <span className="flex h-fit items-center justify-center rounded-full bg-[#E7F3FF] px-2 py-0.5 text-xs font-bold text-[#1877F2]">
              {comments?.length}
            </span>
          </div>
          <div>
            <select
              name="commentSorting"
              id="commentSortingSelect"
              className="w-fit rounded-lg border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 text-xs font-bold whitespace-pre-line"
            >
              <option value="most relevant">Most relevant</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          
        </div>
        <div className="flex flex-col gap-2">
          
          { comments?.length === 0 ? <NoCommentsMsg />  : comments?.map( (comment) => <RegularComment postId={postId} commentId={comment._id} key={comment._id} commentData={comment} />)  }

          </div>

          <CommentInputField postId={postId} />
          
      </div>
  )
}
