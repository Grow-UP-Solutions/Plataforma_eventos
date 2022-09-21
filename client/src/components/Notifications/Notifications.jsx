import React from 'react';
import style from './Notifications.module.css';
import { HiBell } from 'react-icons/hi';

const Notifications = () => {

  return (
    <div className={style.container}>

      <div className={style.container_title}>
        <h1 className={style.title}>Notificaciones</h1>
        <button className={style.button}><p className={style.text}>Marcar todos como visto</p></button>
      </div>

      <div className={style.container_notifications}>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
        <div className={style.notification}><HiBell className={style.icon}/><p>Pepito tambien asistira al evento Hiking with my dog</p></div>
      </div>

    </div>
  );
}

export default Notifications;
