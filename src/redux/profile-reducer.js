import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/samurai/ADD-POST';
const SET_USERS_PROFILE = 'profile/samurai/SET-USERS_PROFILE';
const SET_STATUS = 'profile/samurai/SET-STATUS';
const DELETE_POST = 'profile/samurai/DELETE_POST';
const SET_PHOTOS_SUCCESS = 'profile/samurai/SET_PHOTOS_SUCCESS';
const TOGGLE_TOO_LONG = 'profile/samurai/TOGGLE_TOO_LONG';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: "",
    tooLong: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile

            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SET_PHOTOS_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case TOGGLE_TOO_LONG:
            return {
                ...state,
                tooLong: action.toggle
            }

        default:
            return state;
    }


}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setPhotosSuccess = (photos) => ({type: SET_PHOTOS_SUCCESS, photos});
export const toggleTooLong = (toggle) => ({type: TOGGLE_TOO_LONG, toggle});


export const getUsersProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getProfile(userId)
    dispatch(setUsersProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
    if (status.length > 300) {
        dispatch(toggleTooLong(true));
        setTimeout(() => {
                dispatch(toggleTooLong(false));
            }, 5000
        )
    }

}
export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(setPhotosSuccess(data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUsersProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }

}


export default profileReducer;