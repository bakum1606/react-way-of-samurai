import React from 'react'
import Preloader from "../preloader/Preloader";
import styles from './Paginator.module.css';

const Paginator = ({usersTotalCount, pageSize, currentPage, changedCurrentPage}) => {

    let pages = [];
    let countPage = Math.ceil(usersTotalCount / pageSize);
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }
    return <div>
        {pages.map(p => {
            return <span className={currentPage === p && styles.selectedPage}
                         onClick={() => changedCurrentPage(p)}>{p}</span>

        })}
    </div>
}

export default Paginator
