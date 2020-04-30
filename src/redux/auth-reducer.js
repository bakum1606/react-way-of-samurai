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
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }


}

export const setAuthUsersData = (login, email, id) => ({type: SET_AUTH_USERS_DATA, data: {login, email, id}});

export default authReducer;