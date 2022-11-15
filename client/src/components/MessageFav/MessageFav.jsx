
import React from 'react';
import styles from './MessageFav.module.css';
import { format, register } from "timeago.js";
import StarIcon from '@mui/icons-material/Star';

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

const MessageFav = ({ message, own }) => {

  return (
    <div className={styles.containerChatMessage}>
      <div className={own ? styles.ownMessage : styles.otherMessage}>

        <p className={styles.messageText}>{message.text}</p>

        <div className={styles.wrapperInfoMessage}>
         
          <StarIcon 
            className={styles.iconMessageColor}
            sx={{color: "#ffe234", fontSize: "2.2rem"}}  
          />
          <span className={styles.messageBottom}>{format(message.createdAt, 'es_ES')}</span>
        </div>
      </div>
    </div>
  );
}

export default MessageFav;
