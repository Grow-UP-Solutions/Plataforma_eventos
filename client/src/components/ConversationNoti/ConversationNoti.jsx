
import React, { useEffect, useState } from 'react';
import style from './ConversationNoti.module.css';
import avatar from '../../assets/imgs/no-avatar.png';
import { format, register } from "timeago.js";
import eventsApi from '../../axios/eventsApi';

const localeFunc = (number, index, total_sec) => {
  return [
    ['justo ahora', 'en un rato'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index];
};
register('es_ES', localeFunc);

const ConversationNoti = (msgs, id) => {

  const [name, setName] = useState([]);

  useEffect(() => {
    const getUserName = async () => {
      let userResultName = {};
      try {
        userResultName = await eventsApi.get(`/users/${msgs.msgs.sender}`);
        const result = userResultName.data;
        setName(result);
      } 
      catch (error) {
        console.log(error);
      }
    };
    getUserName();
  }, [id]);  

  return (
    <div className={style.container}> 
      <div className={style.container_image}>
        <img 
          style={{width: '4.7rem', height: '4.7rem', borderRadius: '50%'}} 
          src={name.userpicture ? name.userpicture : avatar} 
          alt="avatar" 
        />
      </div>

      <div className={style.container_texts}>
        <p className={style.text_name}>{name.name}</p>
        <p className={style.text_text}>{msgs.msgs.text}</p>
        <p className={style.text_date}>{format(msgs.msgs.createdAt, 'es_ES')}</p>
      </div>
    </div>
  );
}

export default ConversationNoti;
