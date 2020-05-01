import React, {Component} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import Header from "./Header";
import * as axios from "axios";
import {setAuthUsersData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import UsersContainer from "../Users/UsersContainer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        usersAPI.authorization().then(data => {
            if(data.resultCode === 0){
                let {email, id, login} = data.data;
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
