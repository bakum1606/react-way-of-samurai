import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "02ca6cbf-3056-4737-b1eb-4303478554c9"
    }
})

export const usersAPI = {
    requestUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => {
                return response.data;
            });
    },
    followSuccess(userId) {
        return instance.post(`/follow/${userId}`, {})
            .then(response => {
                return response.data;
            });
    },
    unfollowSuccess(userId) {
        return instance.delete(`/follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId) {
        console.warn('Obsolete method');
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`/profile/` + userId)
            .then(response => {
                return response.data;
            });
    },
}
export const authAPI = {
    me() {
        return instance.get(`/auth/me`)
            .then(response => {
                return response.data;
            });
    },
    getStatus(userId) {
        return instance.get(`/profile/status/` + userId)
            .then(response => {
                return response.data;
            });
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status})
            .then(response => {
                return response.data;
            });
    },
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data;
            });
    },
    logout() {
        return instance.delete(`/auth/login`)
            .then(response => {
                return response.data;
            });
    }

}



