import React, {useState} from 'react'
import styles from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({itemsTotalCount, pageSize, currentPage, changedCurrentPage, portionSize = 10}) => {

    let pages = [];
    let countPage = Math.ceil(itemsTotalCount / pageSize);
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(countPage / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;



    return <div className={styles.paginator} >
        {portionNumber > 1 &&
        <button onClick={ () => setPortionNumber(portionNumber - 1)}>PREV</button>
        }
        {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map(p => {
                return <span className={ cn({[styles.selectedPage] : currentPage === p}, styles.pageNumber)}
                             key={p}
                             onClick={() => changedCurrentPage(p)}>{p}</span>

            })}
        {portionCount > portionNumber  &&
        <button onClick={ () => setPortionNumber(portionNumber + 1)}>NEXT</button>
        }

    </div>
}

export default Paginator
