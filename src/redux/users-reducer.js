import {usersAPI} from "../api/api";
import applyMiddleware from "redux-thunk";
import {updateObjectInArray} from "../Utils/object-helpers";

const FOLLOW = 'users/samurai/FOLLOW';
const UNFOLLOW = 'users/samurai/UNFOLLOW';
const SET_USERS = 'users/samurai/SET_USERS';
const SET_CURRENT_PAGE = 'users/samurai/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/samurai/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/samurai/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/samurai/TOGGLE-IS-FOLLOWING-PROGRESS';


let initialState = {
    users: [],
    pageSize: 10,
    usersTotalCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                usersTotalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching ?
                    [...state.isFollowingProgress, action.userId] :
                    [state.isFollowingProgress.filter(id => id != action.userId)]
            }


        default:
            return state;
    }


}

export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const getUsersThunkCreator = (pageSize, page) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.requestUsers(pageSize, page).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(toggleIsFetching(false));
        });
    }

}

export const thunkFollowUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        let data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleIsFollowingProgress(false, userId));
}

export const thunkFollow = (userId) => {
    return async (dispatch) => {
        let actionCreator = unfollow;
        let apiMethod = await usersAPI.unfollowSuccess.bind(usersAPI)
        thunkFollowUnfollowFlow(userId, dispatch, apiMethod, actionCreator)
    }
}


export const thunkUnfollow = (userId) => {
    return async (dispatch) => {
        let actionCreator = follow;
        let apiMethod = usersAPI.followSuccess.bind(usersAPI)
        thunkFollowUnfollowFlow(userId, dispatch, apiMethod, actionCreator)
    }
}


export default usersReducer;