import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, thunkFollow,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollow

} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.pageSize, this.props.currentPage);
    }

    changedCurrentPage = (pageNumber) => {
        this.props.getUsersThunkCreator(this.props.pageSize, pageNumber);
    }

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      currentPage={this.props.currentPage}
                      isFetching={this.props.isFetching}
                      thunkFollow={this.props.thunkFollow}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      setUsers={this.props.setUsers}
                      isFollowingProgress={this.props.isFollowingProgress}
                      changedCurrentPage={this.changedCurrentPage}
                      setTotalUsersCount={this.props.setTotalUsersCount}
                      toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                      getUsersThunkCreator={this.props.getUsersThunkCreator}
        />
    }

}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersTotalCount: state.usersPage.usersTotalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        toggleIsFetching: state.usersPage.toggleIsFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress
    }
};


export default connect(mapStateToProps, {
    thunkFollow, unfollow, follow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsFollowingProgress, getUsersThunkCreator
})(UsersContainer);