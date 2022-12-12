import React, { useContext, useEffect, useState } from 'react';
import style from './CategoriesResult.module.css';
import { Card } from '../../components';
import { animateScroll as scroll } from 'react-scroll';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components';

const CategoriesResult = () => {
  const name = useParams().data;
  const { events } = useContext(UIContext);
  const [local, setLocal] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = local.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const getCategories = () => {
      setLocal(events.filter((event) => event.categories.find((e) => e.name === name)));
      setLoad(false);
    };
    getCategories();
  }, [currentCard]);

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={`${style.container}`}>
        <p className={style.title}>{name}</p>
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
            <p className={style.not_event}>No hay eventos ...</p>
          )}
        </div>

        <div className={style.container_pagination}>
          <Pagination billsPerPage={CardPerPage} state={local.length} paginado={paginado} page={currentPage} />
        </div>
      </div>
    );
  }
};

export default CategoriesResult;
