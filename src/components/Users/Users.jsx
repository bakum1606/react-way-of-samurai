import React from 'react';
import Preloader from "../common/preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


function Users({usersTotalCount, pageSize, currentPage, changedCurrentPage, users, ...props}) {


    return <div>
        {props.isFetching
            ?
            <Preloader/>
            : null
        }
        <div>
            <Paginator itemsTotalCount={usersTotalCount} pageSize={pageSize} currentPage={currentPage} changedCurrentPage={changedCurrentPage}/>

        </div>
        {
            users.map(u => <User key={u.id}
                                       user={u}
                                       isFollowingProgress={props.isFollowingProgress}
                                       thunkFollow={props.thunkFollow}
                                       thunkUnfollow={props.thunkUnfollow}
            />)

        }
    </div>
}

export default Users;