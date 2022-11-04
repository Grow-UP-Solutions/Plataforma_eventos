import React from 'react';
import { Card } from '..';
import styles from './MyListUser.module.css';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

const MyListUser = ({ myFavorites }) => {

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 24;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage; 
  const currentCard = myFavorites.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);
  
  return (
    <div className={styles.container}>
      <p className={styles.title}>Mi Lista</p>

      <div className={styles.containercard}>
        {currentCard.length > 0 ? (
          currentCard.map((event) => (
            <div className={styles.card}>
              <Card event={event} isFavorite={false} />
            </div>
          ))
        ) : (
          <div className={styles.containerSeeEvents}>
            <hr className={styles.hr}></hr>
            <p className={styles.text}>Aún no tienes eventos en “Mi lista”. ¡Prográmate con “LO QUE QUIERO HACER”!</p>
            <button className={styles.btn}>
              <Link to='/'>Ver eventos</Link>
            </button>
            <hr className={styles.hr}></hr>
          </div>
        )}
      </div>

      <div className={styles.container_pagination}>
        <Pagination 
          billsPerPage={CardPerPage}
          state={myFavorites.length}
          paginado={paginado}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default MyListUser;
