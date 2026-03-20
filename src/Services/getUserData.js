import axios from "axios";

    export function getUserData(token) {
        return axios.get("https://route-posts.routemisr.com/users/profile-data" , {
            headers: {
                token : token
            }
        })
    }