import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Bookmark,
  Dot,
  Earth,
  MessageCircle,
  Repeat2,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authContext } from "../../Context/AuthContextProvider";
import { deletePost } from "../../Services/deletePost";
import { timeAgo } from "../../utils/timeAgo";
import TopComment from "../Comment/TopComment";
import AllComments from "./../Comment/AllComments";
import PostEditModal from "../PostEditModal/PostEditModal";

export default function PostCard({ postData, fullDetails, userData }) {
  const queryClient = useQueryClient();

  // Token Authentication Hook
  const { token } = useContext(authContext);

  const postId = postData?._id;

  // Post Deletion
  const { mutate } = useMutation({
    mutationFn: () => deletePost(token, postId),
    onSuccess() {
      queryClient.invalidateQueries(["posts", token]);
      toast.success("Post Deleted Successfully!", {
        position: "top-center",
      });
    },
    onError(error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  function EditPostAPI(token, postTextInput, postImageInput, postId) {
    const postData = new FormData();

    {
      postTextInput.current.value &&
        postData.append("body", postTextInput.current.value);
    }
    {
      postImageInput.current.files.length > 0 &&
        postData.append("image", postImageInput.current.files[0]);
    }

    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      postData,
      {
        headers: {
          token: token,
        },
      },
    );
  }

  return (
    <>
      <Card className="h-full max-h-max w-full rounded-xl shadow xl:h-full">
        <CardHeader className="justify-between p-4 pb-3">
          <div className="flex gap-3">
            <Avatar
              isBordered={false}
              radius="full"
              size="md"
              src={postData?.user?.photo}
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h4 className="text-foreground truncate text-sm font-bold hover:underline">
                {postData?.user?.name}
              </h4>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <span>@{postData?.user?.username}</span>
                <span className="flex leading-1">
                  <Dot size={10} />
                </span>
                <span className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline">
                  {timeAgo(postData?.createdAt)}
                </span>
                <span className="flex leading-1">
                  <Dot size={10} />
                </span>
                <span className="flex items-center gap-1">
                  <Earth size={10} />
                  {postData?.privacy}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <button className="cursor-pointer rounded-full p-2 transition hover:text-[#1877f2]">
              <Bookmark size={16} />
            </button>

            {postData?.user?._id === userData?._id && (
              <>
                <PostEditModal postId={postId} />
                <button
                  className="cursor-pointer rounded-full p-2 transition hover:text-rose-600"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </CardHeader>
        <CardBody className="text-foreground max-w-full overflow-visible px-0 py-0 text-sm leading-relaxed whitespace-pre-wrap">
          {postData?.body && (
            <span className="mb-4 line-clamp-3 w-full px-4 pt-0">
              {postData?.body}
            </span>
          )}
          {postData?.image && (
            <Image
              removeWrapper
              radius="none"
              className="max-h-162.5 w-full object-cover"
              alt={postData?.body}
              src={postData?.image}
            />
          )}
        </CardBody>
        <div className="mx-4 flex justify-between border-b border-slate-200 pt-3 pb-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-white">
              <ThumbsUp size={12} />
            </span>
            <span>{postData?.likesCount} Likes</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span>
                <Repeat2 size={12} />
              </span>
              {postData?.sharesCount} Shares
            </span>
            <span>{postData?.commentsCount} Comments</span>
            <Link
              to={`/WholePost/${postData.id}`}
              className="cursor-pointer rounded-md bg-transparent px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff]"
            >
              View Details
            </Link>
          </div>
        </div>
        <CardFooter className="flex justify-center gap-2 p-1">
          <div className="post-footer-element">
            <span>
              <ThumbsUp size={16} />
            </span>
            <span>Like</span>
          </div>
          <Link
            to={`/WholePost/${postData.id}`}
            className="post-footer-element"
          >
            <span>
              <MessageCircle size={16} />
            </span>
            <span>Comment</span>
          </Link>
          <div className="post-footer-element">
            <span>
              <Share2 size={16} />
            </span>
            <span>Share</span>
          </div>
        </CardFooter>
        {/* Top Comment Componnent */}

        {!fullDetails && postData?.topComment && (
          <TopComment topComment={postData?.topComment} />
        )}

        {/* All Comments Component */}

        {fullDetails && <AllComments postId={postData?.id} />}
      </Card>
    </>
  );
}
