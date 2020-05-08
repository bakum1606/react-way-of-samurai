import React, {Component} from 'react';
import s from './Header.module.css';
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {


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

export default connect(mapStateToProps, {logout})(HeaderContainer)
