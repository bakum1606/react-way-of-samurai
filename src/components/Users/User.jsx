import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/userPhoto.jpg'
import {NavLink} from "react-router-dom";


let User = ({user, isFollowingProgress, thunkFollow, thunkUnfollow}) => {

    return <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : userPhoto}
                                                          className={styles.photo}/></NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
                            thunkFollow(user.id)
                        }}>Follow</button>
                        : <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
                            thunkUnfollow(user.id)
                        }}

                        >Unfollow</button>
                    }
                </div>
            </span>
        <span><div>{user.name}</div>
                <div>{user.status}</div></span>
        <span>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </span>

    </div>


}

export default User;