
import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../../context/state/stateContext';
import style from './EventsOrganizerResult.module.css';
import { Card } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from "../../axios/eventsApi";

const EventsOrganizerResult = () => {

  const { result } = useContext(stateContext);
  const [local, setLocal] = useState([]);
  const [name, setName] = useState('');
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage; 
  const currentCard = local.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    scroll.scrollToTop();
    const getEventsOrganizer = async () => {
      const res = await eventsApi.get('/users/' + result);
      setLocal(res.data.myEventsCreated);
      setName(res.data.name)
    }
    getEventsOrganizer();
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>Eventos del Organizador: {name}</p>
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
}

export default EventsOrganizerResult;
