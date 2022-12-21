import React, { useContext, useEffect, useState } from 'react';
import style from './CategoriesResult.module.css';
import { Card } from '../../components';
import { animateScroll as scroll } from 'react-scroll';
import Pagination from '../../components/Pagination/Pagination';
import { UIContext } from '../../context/ui';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components';
import {fechaActual , hora , minutes } from '../../utils/fechaActual'
import { useSelector } from 'react-redux';

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

  const todosLosEventos = useSelector((state) => state.events);

  console.log('todosLosEventos',todosLosEventos)

  useEffect(() => {
    

   const categorieEvents = todosLosEventos.filter((event) => event.categories.find((e) => e.name === name))

   categorieEvents.map(event=>{
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

      for (let i = 0 ; i< categorieEvents.length ; i ++){
        for (let j = 0 ; j< categorieEvents[i].dates.length ; j ++){
          if(categorieEvents[i].dates[j].isOld === false &&
            categorieEvents[i].dates[j].isPublic === true &&
            categorieEvents[i].dates[j].inRevision === false
            ){
              eventsToShow.push(categorieEvents[i])
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





      setLocal(order);
      setLoad(false);
   
    
  }, [todosLosEventos]);

  // if (load) {
  //   return <Loading />;
  // } else {
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
// };

export default CategoriesResult;
