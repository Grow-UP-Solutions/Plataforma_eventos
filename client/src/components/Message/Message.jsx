
import React from 'react';
import styles from './Message.module.css';
import { FiStar } from 'react-icons/fi';
import { format, register } from "timeago.js";

const localeFunc = (number, index, total_sec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // total_sec: total seconds between date to be formatted and today's date;
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

const Message = ({ message, own }) => {

  const handleClickStar = (e) => {
    e.preventDefault();
    styles={'color': 'black'}
  }
  
  return (
    <div className={styles.containerChatMessage}>
      <div className={own ? styles.ownMessage : styles.otherMessage}>

        <p className={styles.messageText}>{message.text}</p>

        <div className={styles.wrapperInfoMessage}>
          <FiStar className={styles.iconMessage} onClick={handleClickStar}/>
          <span className={styles.messageBottom}>{format(message.createdAt, 'es_ES')}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
