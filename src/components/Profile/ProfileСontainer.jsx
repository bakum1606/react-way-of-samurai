import React, {Component} from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, setUsersProfile, updateStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 6356;
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
    }
}
export default compose(
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirectComponent
)(ProfileContainer)


