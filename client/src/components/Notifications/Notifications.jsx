import React, { useContext } from 'react';
import style from './Notifications.module.css';
import { HiBell } from 'react-icons/hi';
import { stateContext } from '../../context/state/stateContext';

const Notifications = () => {

  const { result } = useContext(stateContext);

  return (
    <div className={style.container}>

      <div className={style.container_title}>
        <h1 className={style.title}>Notificaciones</h1>
        <button className={style.button}><p className={style.text}>Marcar todos como visto</p></button>
      </div>

      <div className={style.container_notifications}>
        {
          result.notifications.map(noti => (
            <div className={style.notification}>
              <HiBell className={style.icon}/>
              <p>{noti.msg}</p>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default Notifications;
