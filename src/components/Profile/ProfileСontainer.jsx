import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUsersProfile,
    savePhoto,
    saveProfile,
    setUsersProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authenticationId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // debugger
        if (prevProps.match.params.userId != this.props.match.params.userId) {
            this.refreshProfile();
        }

    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authenticationId: state.auth.id
    }
}
export default compose(
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
    // withAuthRedirectComponent
)(ProfileContainer)


