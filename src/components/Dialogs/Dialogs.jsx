import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/formControls/FormControls";
import {maxLength, required} from "../../Utils/validates";
const Dialogs = (props) => {

    let onAddMessage = (values) => {
         props.addMessage(values.newMessageElement);
    };


    let dialogsElements = props.dialogs.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = props.messages.map( m => <Message message={m.message}/> );

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
            <AddMessageFormRedux onSubmit={onAddMessage}/>

        </div>
    )
}

let maxlength20 = maxLength(20)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} validate={[required, maxlength20]} name='newMessageElement' placeholder='Enter new message'/></div>
            <div>
                <button >Add</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'messageForm'})(AddMessageForm);

export default Dialogs;