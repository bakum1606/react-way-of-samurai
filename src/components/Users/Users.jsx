import React from 'react';
import styles from './users.module.css';
import * as axios from "axios";
import userPhoto from '../../assets/images/user.png';
import {setCurrentPageAC} from "../../redux/users-reducer";

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)

        });
    }

    changedCurrentPage(pageNumber) {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageNumber}&page=${this.props.currentPage}`).then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        let pages = [];
        let countPage = Math.ceil(this.props.usersTotalCount / this.props.pageSize);
        for (let i = 1; i <= countPage; i++) {
            pages.push(i);
        }
        return <div>
            <div>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p && styles.selectedPage}
                                 onClick={() => this.changedCurrentPage(p)}>{p}</span>
                })}
            </div>
            {
                this.props.users.map(u => <div key={u.id}>

            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photo}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => this.props.unfollow(u.id)}>Follow</button>
                        : <button onClick={() => this.props.follow(u.id)}>Unfollow</button>
                    }
                </div>
            </span>
                    <span><div>{u.name}</div>
                <div>{u.status}</div></span>
                    <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>

                </div>)
            }
        </div>
    }
}

export default Users;