import React from 'react';
import {} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {addMessageCreator} from "../../redux/dialogs-reducer";


const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageText) => {
            dispatch(addMessageCreator(newMessageText));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // withAuthRedirectComponent
)(Dialogs)



