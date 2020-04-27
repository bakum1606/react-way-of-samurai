import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>

    }

    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
                <div><img src={props.profile.photos.large}/></div>
                <p>{props.profile.aboutMe}</p>
                <p>{props.profile.contacts.facebook}</p>
                <p>{props.profile.contacts.website}</p>
                <p>{props.profile.contacts.vk}</p>
                <p>{props.profile.contacts.twitter}</p>
                <p>{props.profile.contacts.instagram}</p>
                <p>{props.profile.contacts.youtube}</p>
                <p>{props.profile.contacts.github}</p>
                <p>{props.profile.contacts.mainLink}</p>
                <p>{props.profile.lookingForAJob}</p>
                <p>{props.profile.lookingForAJobDescription}</p>
                <p>{props.profile.fullName}</p>
            </div>
        </div>
    )
}

export default ProfileInfo;