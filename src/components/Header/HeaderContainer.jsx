import React, {Component} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import Header from "./Header";
import * as axios from "axios";
import {setAuthUsersData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import UsersContainer from "../Users/UsersContainer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {
            withCredentials: true
        }).then(response => {
            if(response.data.resultCode === 0){
                let {email, id, login} = response.data.data;
                this.props.setAuthUsersData(login, email, id);
            }


        })
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        email: state.auth.email,
        id: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setAuthUsersData})(HeaderContainer)
