import React from 'react'
import {getAuthorized} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/samurai/INITIALIZED_SUCCESS';
const SET_ERROR_MESSAGE = 'app/samurai/SET_ERROR_MESSAGE';

let initialState = {
    initialized: false,
    globalError: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                globalError: action.errorMessage
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const setErrorMessage = (errorMessage) => ({type: SET_ERROR_MESSAGE, errorMessage});

export const initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthorized());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export const getErrorMessage = (message) => {
    return (dispatch) => {
        dispatch(setErrorMessage(message));
        setTimeout( ()  => {dispatch(setErrorMessage(null))}, 5000);
    }
}


export default appReducer;
