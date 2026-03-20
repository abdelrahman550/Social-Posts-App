import axios from "axios";

export function createPost(token , postTextInput , postImageInput) {
    const postData = new FormData();

    {
      postTextInput.current.value &&
        postData.append("body", postTextInput.current.value);
    }
    {
      postImageInput.current.files.length > 0 &&
        postData.append("image", postImageInput.current.files[0]);
    }

    return axios.post("https://route-posts.routemisr.com/posts", postData, {
      headers: {
        token: token,
      },
    });
  }