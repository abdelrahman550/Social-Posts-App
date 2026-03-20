import axios from "axios";

export function editPostAPI(token, body, postImageInput, postId) {
  const postData = new FormData();

  if (body) {
    postData.append("body", body);
  }

  if (postImageInput.current.files.length > 0) {
    postData.append("image", postImageInput.current.files[0]);
  }

  return axios.put(
    `https://route-posts.routemisr.com/posts/${postId}`,
    postData,
    {
      headers: { token },
    }
  );
}