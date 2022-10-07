
import React, { useContext, useState } from 'react';
import styles from './Message.module.css';
import { FiStar } from 'react-icons/fi';

const Message = ({ message, own }) => {

  return (
    <div className={own ? styles.ownMessage : styles.otherMessage}>

      <p className={styles.messageText}>{message.text}</p>

      <div className={styles.wrapperInfoMessage}>
        <FiStar className={styles.iconMessage}/>
        <span className={styles.messageBottom}>{message.createdAt}</span>
      </div>
    </div>
  );
}

export default Message;





/* 
const handleChangeMessages = (e) => {
    e.preventDefault();
    setMessage({
      idGet: '112233',
      msg: e.target.value,
    })
  }

  const handleClickMessages = (e) => {
    e.preventDefault();
    axios.post('https://plataformaeventos-production-6111.up.railway.app/users/message/' + id, message)
    .then((response) => {
      console.log('axios response', response.data);
    });
    setMessage(initialState);
  }
*/










{/* <div className={styles.ownMessage}>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>

          <div className={styles.wrapperInfoMessage}>
            <FiStar className={styles.iconMessage} />
            <span>Enero 25 2020 - 10:50 a.m</span>
          </div>
        </div>

        <div className={styles.otherMessage}>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>

          <div className={styles.wrapperInfoMessage}>
            <FiStar className={styles.iconMessage} />
            <span>Enero 25 2020 - 10:50 a.m</span>
          </div>
        </div>

        <div className={styles.ownMessage}>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>

          <div className={styles.wrapperInfoMessage}>
            <FiStar className={styles.iconMessage} />
            <span>Enero 25 2020 - 10:50 a.m</span>
          </div>
        </div> */}
