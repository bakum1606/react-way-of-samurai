import React from 'react';
import {connect} from "react-redux";
import {
    follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, toggleIsFollowingProgress, unfollow

} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
            this.props.toggleIsFetching(false)
        })
    }

    changedCurrentPage = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
            this.props.setUsers(data.items);
            this.props.toggleIsFetching(false)
        })

    }

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      currentPage={this.props.currentPage}
                      isFetching={this.props.isFetching}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      setUsers={this.props.setUsers}
                      isFollowingProgress={this.props.isFollowingProgress}
                      changedCurrentPage={this.changedCurrentPage}
                      setTotalUsersCount={this.props.setTotalUsersCount}
                      toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}


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
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsFollowingProgress
})(UsersContainer);