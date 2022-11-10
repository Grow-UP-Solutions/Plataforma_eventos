import React, { useContext, useEffect, useState } from 'react';
import style from './SearchResult.module.css';
import { animateScroll as scroll } from 'react-scroll';
import { stateContext } from '../../context/state/stateContext';
import { Card } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';

const SearchResult = () => {
  
  const { result, muni } = useContext(stateContext);
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
    const localEvents = events.filter((event)=>event.municipio.toLowerCase().includes(muni.toLowerCase()))
    if(result){
    const getSearch = () => {
      setLocal(localEvents.filter((event) => event.title.toLowerCase().includes(result.toLowerCase())));
    }
    getSearch();
    }else{
      const getSearch = () => {
        setLocal(localEvents);
      }
      getSearch();
    }
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>Resultado de búsqueda: {result}</p>
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

export default SearchResult;
