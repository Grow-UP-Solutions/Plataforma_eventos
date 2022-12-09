import React, { useContext, useState } from 'react';
import { Card, UserForm } from '..';
import styles from './MyListUser.module.css';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { FaCaretSquareRight } from 'react-icons/fa';
import { UIContext } from '../../context/ui';

const MyListUser = ({ myFavorites, myEventsBooked }) => {

  const { eventsFavourites } = useContext(UIContext);

  const eventos = eventsFavourites.concat(myEventsBooked);

  const orderByDate = eventos.sort((a, b) => {
    if (a.dates[0].date < b.dates[0].date) return -1;
    if (b.dates[0].date < a.dates[0].date) return 1;
    return 0;
  });

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 6;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = orderByDate.slice(indexOfFirstCard, indexOfLastCard);
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
          state={eventos.length} 
          paginado={paginado} 
          page={currentPage} 
        />
      </div>
    </div>
  );
};

export default MyListUser;

/* 

useEffect(() => {
    const getfav = async () => {
      try {
        const res = await eventsApi.get(`/users/${user.uid}`);
        const json = res.data.myFavorites;
        const event = json.concat(myEventsBooked);
        const orden = event.sort((a, b) => {
          if (a.dates[0].date < b.dates[0].date) return -1;
          if (b.dates[0].date < a.dates[0].date) return 1;
          return 0;
        });
        setGetFav(json);
        setState(orden);
      } 
      catch (error) {
        console.log(error);
      }
    }
    getfav();
  }, [user]);


  const { user } = useContext(AuthContext);
  const { setGetFav } = useContext(UIContext);
  const [state, setState] = useState([]);

import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';
import { UIContext } from '../../context/ui';

*/



