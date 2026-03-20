import axios from "axios";

export function getUserPosts(token , userData) {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userData._id}/posts`,
      {
        headers: {
          token: token,
        },
      },
    );
  }