import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import style from './CategoriesResult.module.css';
import { Card } from '../../components';
import { animateScroll as scroll } from 'react-scroll';
import Pagination from '../../components/Pagination/Pagination';

const CategoriesResult = () => {

  const { result } = useContext(Context);
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage; 
  const currentCard = result.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>Eventos</p>
      <div className={style.containerCard}>
        {currentCard.length ? (
          currentCard.map((event, index) => {
            return (
              <div key={index} className={style.card}>
                <Card event={event} />
              </div>
            );
          })
        ) : (
          <h5>No hay eventos</h5>
        )}
      </div>

      <div className={style.container_pagination}>
        <Pagination 
          billsPerPage={CardPerPage}
          state={result.length}
          paginado={paginado}
        />
      </div>

    </div>
  );
};

export default CategoriesResult;
