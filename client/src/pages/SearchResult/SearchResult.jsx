import React, { useContext, useEffect, useState } from 'react';
import style from './SearchResult.module.css';
import { animateScroll as scroll } from 'react-scroll';
import { stateContext } from '../../context/state/stateContext';
import { Card } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';
import { useParams } from 'react-router-dom';
import { Loading } from "../../components";

const SearchResult = () => {
  
  const { muni } = useContext(stateContext);
  const { result } = useContext(stateContext);
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

    console.log('result',result)
    console.log('muni',muni)

    
    const localEvents = events.filter((event)=>event.municipio.toLowerCase().includes(muni.toLowerCase()))

    console.log('localEvents',localEvents)

    if(result !== '' && muni  !== '' ){

      console.log('1')
    
      setLocal(localEvents.filter((event) => event.title.toLowerCase().includes(result.toLowerCase())));
      setLoad(false);
    
   
    }else if( muni  !== '' && result===''){

      console.log('2')
      
        setLocal(localEvents);
        setLoad(false);
      
    }else if(result !== '' && muni === ''){

      console.log('3')
        setLocal(events.filter((event) => event.title.toLowerCase().includes(result.toLowerCase())));
        setLoad(false);
    }else if(result ==='' && muni===''){
      console.log('4')
      setLoad(true);
    }
  }, [events]);

  if (load) {
    return <Loading />;
  }
  else {
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
            <p className={style.not_event}>No hay eventos ...</p>
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
  }
};

export default SearchResult;