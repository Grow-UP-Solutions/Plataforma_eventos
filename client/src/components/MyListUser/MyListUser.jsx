import React, { useContext, useState } from 'react';
import { Card, UserForm } from '..';
import styles from './MyListUser.module.css';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { FaCaretSquareRight } from 'react-icons/fa';
import { UIContext } from '../../context/ui';

const MyListUser = ({ /* myFavorites, */ myEventsBooked }) => {

  function eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup  = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
  }

  //const eventos = myFavorites.concat(myEventsBooked);
  const { eventsFavourites } = useContext(UIContext);
  let eventos = eventsFavourites.concat(myEventsBooked);
  /* let hash = {};
  eventos = eventos.filter((o) => (hash[o._id] ? false : (hash[o._id] = true))); */

  const eventosPublicos = eventos.filter((evento) => evento.isPublic === true && evento.inRevision === false);

  const respo = eliminarObjetosDuplicados(eventosPublicos, '_id');
  console.log('unicos:', respo);

  const orderByDate = respo.sort((a, b) => {
    if (a.dates[0].date < b.dates[0].date) return -1;
    if (b.dates[0].date < a.dates[0].date) return 1;
    return 0;
  });

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 24;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = orderByDate.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Mi Lista</p>

      {currentCard.length > 0 ? (
        <div className={styles.containercard}>
          {currentCard.map((event) => (
            <div className={styles.card}>
              <Card event={event} />
            </div>
          ))}
        </div>
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

      <div className={styles.container_pagination}>
        <Pagination billsPerPage={CardPerPage} state={respo.length} paginado={paginado} page={currentPage} />
      </div>
    </div>
  );
};

export default MyListUser;

/* 
const { eventsFavourites } = useContext(UIContext);

const eventos = eventsFavourites.concat(myEventsBooked);

state={eventos.length}
*/
