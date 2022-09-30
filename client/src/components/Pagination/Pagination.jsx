import React from 'react';
import style from './Pagination.module.css';

const Pagination = ({ billsPerPage, state, paginado, page }) => {

  const pageNumbers = [];

  for(let i=1; i<=Math.ceil(state/billsPerPage); i++){
    pageNumbers.push(i);
  }

  const handleClick = (num) => {
    paginado(num);
  }

  return (
    <nav className={style.container}> 
      {
        pageNumbers.map(num => {
          return (
            <li key={num} className={style.page}>
              <a 
                className={num === page ? style.number_sel : style.number_nav} 
                onClick={() => handleClick(num)}
              >
                {num} 
              </a>
            </li>
          );
        })
      }
    </nav>      
  );
}

export default Pagination;