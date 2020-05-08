import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileСontainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect} from "react-redux";
import {getAuthorized} from "./redux/auth-reducer";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";


class App extends Component {
    componentDidMount() {
        this.props.initializedApp();
    }
    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer

                           />}/>

                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer

                           />}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(App)

