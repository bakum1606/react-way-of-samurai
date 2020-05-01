import React from 'react';
import {addMessageCreator, updateNewMessageCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";


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
        updateNewMessageText: (text) => {
            let action = updateNewMessageCreator(text);
            dispatch(action);
        },
        addMessage: () => {
            dispatch(addMessageCreator());
        }
    }
}

let authRedirectComponent = withAuthRedirectComponent(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(authRedirectComponent);


export default DialogsContainer;