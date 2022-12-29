import React, { useContext, useEffect, useState } from 'react';
import style from './Notifications.module.css';
import { HiBell } from 'react-icons/hi';
import { stateContext } from '../../context/state/stateContext';
import { AuthContext } from '../../context/auth';
import eventsApi from '../../axios/eventsApi';
import swal from 'sweetalert';
import Pagination from '../../components/Pagination/Pagination';
import { Loading } from '../../components';
import { animateScroll as scroll } from 'react-scroll';

const Notifications = () => {
  const { setNotes } = useContext(stateContext);
  const { user } = useContext(AuthContext);
  const [state, setState] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = state.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const getUserData = async () => {
    let userResult = {};
    userResult = await eventsApi.get('/users/' + user.uid);
    const reversed = userResult.data.notifications.reverse();
    setState(reversed);
    setLoad(false);
  };

  const handleClickRead = async (noti) => {
    const data = {
      read: true,
      idNotifications: noti._id,
    };
    const json = await eventsApi.put('/users/notifications', data);
    setState(json.data.reverse());
    setNotes(json.data.filter((e) => e.read === false));
    swal({
      text: 'Notificacion Leída',
      icon: 'success',
      button: 'OK',
    });
  };

  const handleClickAllRead = async (e) => {
    e.preventDefault();
    const res = await eventsApi.put(`/users/${user.uid}/notifications`);
    setState(res.data);
    setNotes(res.data.filter((e) => e.read === false));
  };

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.container}>
        <div className={style.container_title}>
          <h1 className={style.title}>Notificaciones</h1>
          <button className={style.button} onClick={handleClickAllRead}>
            <p className={style.text}>Marcar todos como visto</p>
          </button>
        </div>

        <div className={style.container_notifications}>
          {state ? (
            <>
              <div>
                {currentCard.map((noti) => (
                  <div
                    className={noti.read === false ? style.notification : style.notification_read}
                    onClick={() => handleClickRead(noti)}
                  >
                    <HiBell className={style.icon} />
                    <p>{noti.msg}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No hay notificaciones</p>
          )}
        </div>

        <div className={style.container_pagination}>
          <Pagination billsPerPage={CardPerPage} state={state.length} paginado={paginado} page={currentPage} />
        </div>
      </div>
    );
  }
};

export default Notifications;
