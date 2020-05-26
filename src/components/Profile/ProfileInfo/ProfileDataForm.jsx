import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/formControls/FormControls";
import s from './ProfileInfo.module.css';
import style from "../../common/formControls/FormControls.module.css";





const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.loginError}>{error}</div>}
        <div><button onClick={ () => {}}>save</button></div>
        <div><b>aboutMe:</b>
            {createField("about me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}> <b>{key}</b>
                {createField(key, "contacts." + key, [], 'Input')}
            </div>
        })}
        </div>
        <div><b>lookingForAJob:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}</div>

        <div><b>My professional skills:</b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}</div>

        <div><b>fullName:</b>
            {createField("Full name", "fullName", [], Input)}
        </div>
    </form>

}


const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;