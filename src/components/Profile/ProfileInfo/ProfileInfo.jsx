import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import user from '../../../assets/images/user.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateStatus, savePhoto, saveProfile, isOwner}) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    let mainPhotoChange = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);

            });
    }
    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
                <div><img src={!profile.photos.large ? user : profile.photos.large}/></div>
                {isOwner && <input type="file" onChange={mainPhotoChange}/>}
                {editMode ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <p><b>aboutMe:</b> {profile.aboutMe}</p>
        <div>
            <b>contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}
            />
        })}
        </div>
        <p><b>lookingForAJob:</b> {profile.lookingForAJob ? 'yes' : 'no'}</p>
        {profile.lookingForAJob && <p><b>My professional skills:</b> {profile.lookingForAJobDescription}</p>}

        <p><b>fullName:</b> {profile.fullName}</p>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
}


export default ProfileInfo;