import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageCreator, updateNewMessageCreator} from "../../redux/store";

const Dialogs = (props) => {

    let newMessageElement = React.createRef();

    let addMessage = () => {
         props.dispatch(addMessageCreator())
    };

    let changeMessage = () => {
        let text = newMessageElement.current.value;
        props.dispatch(updateNewMessageCreator(text))
    }

    let dialogsElements = props.state.dialogs.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = props.state.messages.map( m => <Message message={m.message}/> );

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
                <div><textarea ref={newMessageElement} onChange={changeMessage} value={props.newMessageText}/></div>
                <div>
                    <button onClick={ addMessage }>Add</button>
                </div>

            </div>

        </div>
    )
}

export default Dialogs;