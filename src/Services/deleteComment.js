import axios from "axios";

export function deleteComment(token, postId , commentId) {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          token: token,
        },
      },
    );
  }