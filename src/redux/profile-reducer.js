const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
const SET_USERS_PROFILE = 'SET-USERS_PROFILE';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.newText

            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile

            }

        default:
            return state;
    }


}

export const addPost = () => ({type: ADD_POST});
export const updateNewPost = (text) => ({type: UPDATE_NEW_POST, newText: text});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});

export default profileReducer;