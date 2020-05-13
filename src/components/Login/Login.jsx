import React from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/formControls/FormControls";
import {required} from "../../Utils/validates";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../common/formControls/FormControls.module.css";
import handleSubmit from "redux-form/lib/handleSubmit";


const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', 'email', required, Input)}
            {createField('Password', 'password', required, Input, {type: 'password'})}
            {createField('null', 'remember me', null, Input, {type: 'checkbox'}, 'remember me')}
            <button>Login</button>
            {error && <div className={style.loginError}>{error}</div>
            }

        </form>
    )
}


const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)
const Login = (props) => {
    const sendForm = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={sendForm}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);