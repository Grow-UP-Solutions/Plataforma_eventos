import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../../context/state/stateContext';
import style from './CategoriesResult.module.css';
import { Card } from '../../components';
import { animateScroll as scroll } from 'react-scroll';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';

const CategoriesResult = () => {

  const { result } = useContext(stateContext);
  const { events } = useContext(UIContext);
  const [local, setLocal] = useState([]);
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage; 
  const currentCard = local.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    scroll.scrollToTop();
    const getCategories = () => {
      setLocal(events.filter((event) => event.categories.find((e) => e.name === result)));  
    }
    getCategories();
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>{result}</p>
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
          state={local.length}
          paginado={paginado}
          page={currentPage}
        />
      </div>

    </div>
  );
};

export default CategoriesResult;
