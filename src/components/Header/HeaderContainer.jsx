import React, {Component} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import Header from "./Header";
import * as axios from "axios";
import {getAuthorized, setAuthUsersData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import UsersContainer from "../Users/UsersContainer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthorized();
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

export default connect(mapStateToProps, {setAuthUsersData, getAuthorized})(HeaderContainer)
