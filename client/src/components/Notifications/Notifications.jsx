import React, { useContext, useEffect, useState } from 'react';
import style from './Notifications.module.css';
import { HiBell } from 'react-icons/hi';
import { stateContext } from '../../context/state/stateContext';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import swal from 'sweetalert';

const Notifications = () => {

  const { setNotes } = useContext(stateContext);
  const { user } = useContext(AuthContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    userResult = await axios.get('https://plataformaeventos-production-6111.up.railway.app/users/' + user.uid);
    setState(userResult.data.notifications);
  }

  const handleClickRead = async (noti) => {
    const data = {
      read: true,
      idNotifications: noti._id
    }
    const json = await axios.put('https://plataformaeventos-production-6111.up.railway.app/users/notifications', data);
    console.log('data:', data);
    console.log('json.data:', json.data);
    setState(json.data);
    setNotes(json.data.filter(e => e.read === false));
    swal({
      text: 'Notificacion Leída',
      icon: 'success',
      button: 'OK',
    });
  }

  return (
    <div className={style.container}>

      <div className={style.container_title}>
        <h1 className={style.title}>Notificaciones</h1>
        <button className={style.button}><p className={style.text}>Marcar todos como visto</p></button>
      </div>

      <div className={style.container_notifications}>
        {
          state ? (
            <>
              <div>
                {
                  state.map((noti) => (
                    <div 
                      className={noti.read === false ? style.notification : style.notification_read}
                      onClick={() => handleClickRead(noti)}
                    >
                      <HiBell className={style.icon}/>
                      <p>{noti.msg}</p>
                    </div>
                  )).reverse()
                }
              </div>
            </>
          ) : <p>No hay notificaciones</p>
        }
      </div>
    </div>
  );
}

export default Notifications;
