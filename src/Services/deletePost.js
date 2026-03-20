import axios from "axios";

export function deletePost(token , postId){
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}` , {
      headers: {
        token: token
      }
    })
  }