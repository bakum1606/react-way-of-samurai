import React, {Component} from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUsersProfile, setUsersProfile} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
       this.props.getUsersProfile(userId)
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}
export default compose(
    connect(mapStateToProps, {getUsersProfile}),
    withRouter,
    withAuthRedirectComponent
)(ProfileContainer)


