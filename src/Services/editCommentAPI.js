import axios from "axios";

export function editCommentAPI(token, content, postId , commentData) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentData?._id}`,
      { content },
      {
        headers: { token },
      },
    );
  }