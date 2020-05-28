import {authAPI, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USERS_DATA = 'auth/samurai/SET-AUTH-USERS-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/samurai/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USERS_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUsersData = (login, email, id, isAuth) => ({
    type: SET_AUTH_USERS_DATA,
    payload: {login, email, id, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

export const getAuthorized = () => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === 0) {
        let {email, id, login} = data.data;
        dispatch(setAuthUsersData(login, email, id, true));
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getAuthorized());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUsersData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let data = await securityApi.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;