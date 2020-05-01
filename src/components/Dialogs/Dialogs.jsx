import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageCreator, updateNewMessageCreator} from "../../redux/store";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {

    let newMessageElement = React.createRef();

    let onAddMessage = () => {
         props.addMessage();
    };

    let changeMessage = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
    }


    let dialogsElements = props.dialogs.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = props.messages.map( m => <Message message={m.message}/> );
   if(props.isAuth===false) return   <Redirect to={'/login'}/>

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
                <div><textarea ref={newMessageElement} onChange={changeMessage} value={props.newMessageText}/></div>
                <div>
                    <button onClick={ onAddMessage }>Add</button>
                </div>

            </div>

        </div>
    )
}

export default Dialogs;