import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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

export const setAuthUsersData = (login, email, id, isAuth) => ({
    type: SET_AUTH_USERS_DATA,
    data: {login, email, id, isAuth}
});
export const getAuthorized = () => (dispatch) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {email, id, login} = data.data;
            dispatch(setAuthUsersData(login, email, id, true));
        }
    })
};

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthorized());
        } else {
            let message = data.messages.length > 0 ? data.messages[0]
                : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    })
}

export const logout = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUsersData(null, null, null, false));
        }
    })
}

export default authReducer;