import React from 'react';
import {} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {addMessageCreator, updateNewMessageCreator} from "../../redux/dialogs-reducer";


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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // withAuthRedirectComponent
)(Dialogs)



