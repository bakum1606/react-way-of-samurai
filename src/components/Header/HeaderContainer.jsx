import React, {Component} from 'react';
import s from './Header.module.css';
import Header from "./Header";
import {getAuthorized, logout, setAuthUsersData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

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

export default connect(mapStateToProps, {logout, getAuthorized})(HeaderContainer)
