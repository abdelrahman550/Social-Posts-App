import { Avatar } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dot, Trash2 } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authContext } from "../../Context/AuthContextProvider";
import { deleteComment } from "../../Services/deleteComment";
import { getUserData } from "../../Services/getUserData";
import { timeAgo } from "../../utils/timeAgo";
import CommentEditModal from "../CommentEditModal/CommentEditModal";

export default function RegularComment({ commentData, commentId, postId }) {
  const queryClient = useQueryClient();

  // Token Authentication Hook
  const { token } = useContext(authContext);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Comment will be permanently deleted!",
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

  const { data: userDataRes } = useQuery({
    queryFn: () => getUserData(token),
    queryKey: ["userData", token],
    enabled: !!token,
  });

  const userData = userDataRes?.data?.data?.user;

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteComment(token, postId, commentId),
    onSuccess() {
      queryClient.invalidateQueries(["All Comments", postId]);
      toast.success("Comment Deleted Successfully!", {
        position: "top-center",
      });
    },
    onError(error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
      });
    },
  });
  return (
    <div className="flex gap-2">
      <div>
        <Avatar
          isBordered={false}
          radius="full"
          size="sm"
          src={commentData?.commentCreator?.photo}
        />
      </div>
      <div className="w-full">
        <div className="flex w-fit flex-col rounded-2xl bg-[#F0F2F5] px-3 py-2">
          <span className="text-xs font-bold">
            {commentData?.commentCreator?.name}
          </span>
          <span className="mt-0.5 flex items-center text-xs leading-4 text-slate-700">
            @{commentData?.commentCreator?.username}
            <span className="leading-0">
              <Dot size={10} />
            </span>
            {timeAgo(commentData?.createdAt)}
          </span>
          <span className="text-sm leading-5">{commentData?.content}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-2 flex gap-3 text-xs font-semibold text-slate-700">
            <span>{timeAgo(commentData?.createdAt)}</span>
            <span>Like ({commentData?.likes?.length})</span>
            <span className="transition hover:text-[#4592F4] hover:underline">
              Reply
            </span>
          </div>
          {isPending && (
            <span className="text-sm text-rose-600">Deleting...</span>
          )}
          {/* // <CommentDropDown handelCommentDelete={handleDelete} /> */}
          {commentData?.commentCreator?._id === userData?._id && !isPending &&
            <div>
              <CommentEditModal commentData={commentData} postId={postId} />
              <button
                className="cursor-pointer rounded-full p-2 transition text-slate-500 hover:text-rose-600"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

