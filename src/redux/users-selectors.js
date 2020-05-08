export const getUsers = (state) => {
    return    state.usersPage.users
}
export const getPageSize = (state) => {
    return    state.usersPage.pageSize
}

export const getUsersTotalCount = (state) => {
    return    state.usersPage.usersTotalCount
}
export const getCurrentPage = (state) => {
    return    state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return    state.usersPage.isFetching
}

export const getToggleIsFetching = (state) => {
    return    state.usersPage.toggleIsFetching
}

export const getIsFollowingProgress = (state) => {
    return    state.usersPage.isFollowingProgress
}

