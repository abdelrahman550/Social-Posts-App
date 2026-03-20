import axios from "axios";

export function getAllPosts(token) {
  return axios.get("https://route-posts.routemisr.com/posts", {
    headers: {
      token: token,
    },
  });
}
