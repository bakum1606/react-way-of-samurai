import {authAPI, profileAPI} from "../api/api";

const SET_AUTH_USERS_DATA = 'SET-AUTH-USERS-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USERS_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export const setAuthUsersData = (login, email, id, isAuth) => ({type: SET_AUTH_USERS_DATA, data: {login, email, id, isAuth}});
export const getAuthorized = () => (dispatch) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {email, id, login} = data.data;
            dispatch(setAuthUsersData(login, email, id,  true));
        }
    })
};

export const login = (login, password, rememberMe) => (dispatch) => {
    authAPI.login(login, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthorized());
        }
    })
}

export const logout = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUsersData(null, null, null,  false));
        }
    })
}

export default authReducer;