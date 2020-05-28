import React from 'react';
import {reduxForm} from 'redux-form';
import {createField, Input} from '../common/formControls/FormControls';
import {required} from '../../Utils/validates';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import style from '../common/formControls/FormControls.module.css';


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', 'email', required, Input)}
            {createField('Password', 'password', required, Input, {type: 'password'})}
            {createField('null', 'rememberMe', null, Input, {type: 'checkbox'}, 'remember me')}
            <button>Login</button>
            {error && <div className={style.loginError}>{error}</div>
            }
            {captchaUrl && createField('Symbols from image', 'captcha', required, Input)}
        </form>
    )
}


const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)
const Login = (props) => {
    const sendForm = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={sendForm} captchaUrl={props.captchaUrl}/>
            {props.captchaUrl && <img src={props.captchaUrl} />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);