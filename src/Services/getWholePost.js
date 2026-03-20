import axios from "axios";

export function getWholePost(postId , token) {
      return axios.get(`https://route-posts.routemisr.com/posts/${postId}` , {
      headers: {
        token : token
      }
    }) 
  }