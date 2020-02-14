import React from 'react';
import {addMessageCreator, updateNewMessageCreator} from "../../redux/store";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState();
    let addMessage = () => {
         props.store.dispatch(addMessageCreator())
    };

    let changeMessage = (text) => {
        let action = updateNewMessageCreator(text);
        props.store.dispatch(action);
    }

    return (
       <Dialogs  updateNewMessageText={changeMessage} addMessage={addMessage}
                 messages={state.dialogsPage.messages}
                 dialogs={state.dialogsPage.dialogs}
                 newMessageText={state.dialogsPage.newMessageText}

       />
    )
}

export default DialogsContainer;