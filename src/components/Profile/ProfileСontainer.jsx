import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, setUsersProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authenticationId;
            if(!userId){
                this.props.history.push("/login")
            }
        }
       this.props.getUsersProfile(userId)
       this.props.getStatus(userId)
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
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
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatus}),
    withRouter
    // withAuthRedirectComponent
)(ProfileContainer)


