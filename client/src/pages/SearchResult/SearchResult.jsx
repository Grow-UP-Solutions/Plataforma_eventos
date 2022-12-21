import React, { useContext, useEffect, useState } from 'react';
import style from './SearchResult.module.css';
import { animateScroll as scroll } from 'react-scroll';
import { stateContext } from '../../context/state/stateContext';
import { Card } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';
import { useParams } from 'react-router-dom';
import { Loading } from "../../components";
import {fechaActual , hora , minutes } from '../../utils/fechaActual'

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

    const eventos = events


    eventos.map(event=>{
      if (fechaActual ) {
       event.dates.map((date) => {
         if (new Date(date.date) < new Date(fechaActual)) {
           if (event.dates.length === 1) {
             date.isOld = true;
             event.isOld = true;
           } else {
             date.isOld = true;
           }
         } else if (date.date === fechaActual) {
           if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
             if (event.dates.length === 1) {
               date.isOld = true;
               event.isOld = true;
             } else {
               event.isOld = true;
             }
           }
         }
       });
     }
 
    })

   

    const eventsToShow = []

      for (let i = 0 ; i< events.length ; i ++){
        for (let j = 0 ; j< events[i].dates.length ; j ++){
          if(events[i].dates[j].isOld === false &&
            events[i].dates[j].isPublic === true &&
            events[i].dates[j].inRevision === false
            ){
              eventsToShow.push(events[i])
            }
        }
      }

    

      eventsToShow.forEach(function(item) {
        if (!eventsToShow.includes(item)) {
          eventsToShow.push(item);
        }
      });

      
      const order = eventsToShow.sort((a, b) => {
       
        if (a.dates[0].date > b.dates[0].date) return 1;
        if ( b.dates[0].date > a.dates[0].date) return -1;
        if (a.dates[0].date === b.dates[0].date){
          if (a.sells > b.sells) return -1;
          if ( b.sells > a.sells) return 1;
          if (a.sells === b.sells){
            if (a.title > b.title) return 1;
            if ( b.title > a.title) return -1;
            return 0
          }
        }
        return 0;
      });

   
     const localEvents = order.filter((event)=>event.municipio.toLowerCase().includes(muni.toLowerCase()))


    if(result !== '' && muni  !== '' ){

    
      setLocal(localEvents.filter((event) => event.title.toLowerCase().includes(result.toLowerCase())));
      setLoad(false);
    
   
    }else if( muni  !== '' && result === ''){

        setLocal(localEvents);
        setLoad(false);
      
    }else if(result !== '' && muni === ''){

        setLocal(order.filter((event) => event.title.toLowerCase().includes(result.toLowerCase())));
        setLoad(false);

    }else if(result ==='' && muni===''){
     
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