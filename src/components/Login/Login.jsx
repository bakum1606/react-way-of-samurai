import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/preloader/formControls/FormControls";
import {required} from "../../Utils/validates";


const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div><Field type="text" placeholder={'Login'}name={'login'}  component={Input} validate={required}/></div>
                <div><Field type="password" placeholder={'Password'}name={'password'}  component={Input} validate={required}/></div>
                <div><Field type="checkbox" component={"input"} name={'rememberMe'}/></div>
                <div>
                    <button>Login</button>remember me
                </div>
            </form>
    )
}

const sendForm = (formData) => {
    console.log(formData)
}

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)
const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={sendForm}/>
        </div>
    )
}

export default Login;