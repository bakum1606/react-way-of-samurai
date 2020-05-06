import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/preloader/formControls/FormControls";
import {required} from "../../Utils/validates";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../../components/common/preloader/formControls/FormControls.module.css";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field type="text" placeholder={'Login'} name={'email'}  validate={required} component={Input}/></div>
            <div><Field type="password" placeholder={'Password'} name={'password'} component={Input}
                        validate={required}/></div>
            <div><Field type="checkbox" component={"input"} name={'rememberMe'}/>remember me</div>
            <div>
                <button>Login</button>
            </div>
            {props.error && <div className={style.loginError}>{props.error}</div>
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