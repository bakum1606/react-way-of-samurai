import React from 'react';
import {connect} from "react-redux";
import {
    getUsersThunkCreator,
    thunkFollow, thunkUnfollow

} from "../../redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching, getIsFollowingProgress,
    getPageSize,
    getToggleIsFetching,
    getUsers,
    getUsersTotalCount
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(pageSize, currentPage);
    }
    changedCurrentPage = (pageNumber) => {
        const  {pageSize} = this.props;
        this.props.getUsersThunkCreator(pageSize, pageNumber);
    }

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      currentPage={this.props.currentPage}
                      isFetching={this.props.isFetching}
                      isFollowingProgress={this.props.isFollowingProgress}
                      thunkFollow={this.props.thunkFollow}
                      thunkUnfollow={this.props.thunkUnfollow}
                      changedCurrentPage={this.changedCurrentPage}
                      getUsersThunkCreator={this.props.getUsersThunkCreator}
        />
    }

}


let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        usersTotalCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        toggleIsFetching: getToggleIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state)
    }
};

export default compose(
    connect(mapStateToProps, {
        thunkFollow, thunkUnfollow,
        getUsersThunkCreator
    })
)(UsersContainer)