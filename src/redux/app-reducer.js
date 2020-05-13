import React from 'react'
import {getAuthorized} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/samurai/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

 const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
        ...state,
                initialized: true
        }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthorized());
    Promise.all([promise]).then( ()=> {
         dispatch(initializedSuccess());
    })
}

export default appReducer;
