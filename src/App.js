import './App.css';
import Navbar from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileСontainer";
import Login from "./components/Login/Login";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp, getErrorMessage} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import Switch from "react-router-dom/Switch";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const errorMessage = "Some error occurred!"

class App extends Component {

    catchAllUnhandledErrors = () => {
           this.props.getErrorMessage(errorMessage);
    }


    componentDidMount() {
        this.props.initializedApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.addEventListener("unhandledrejection", this.props.getErrorMessage(56));
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        
        return (
            <div className='app-wrapper'>
                {this.props.globalError && <h1>globalError: {this.props.globalError}</h1>}
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?'

                               render={() =>
                                   <ProfileContainer/>
                               }/>

                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError

})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp, getErrorMessage})
)(App)

const SamuraiJsApp = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJsApp
