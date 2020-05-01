import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "02ca6cbf-3056-4737-b1eb-4303478554c9"
    }
})

export const usersAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response  => {
                    return response.data;
        });
    },
    follow(userId) {
        return instance.post(`/follow/${userId}`, {})
            .then(response  => {
                    return response.data;
        });
    },
    unfollow(userId) {
        return instance.delete(`/follow/${userId}`)
            .then(response  => {
                    return response.data;
        });
    },
    getProfile(userId) {
        return instance.get(`/profile/` + userId)
            .then(response  => {
                    return response.data;
        });
    },
    authorization() {
        return instance.get(`/auth/me`)
            .then(response  => {
                    return response.data;
        });
    }


}

