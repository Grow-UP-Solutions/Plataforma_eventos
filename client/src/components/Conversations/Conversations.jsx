
import React, { useEffect, useState } from 'react';
import styles from './Conversations.module.css';
import { BiBlock, BiPin } from 'react-icons/bi';
import axios from "axios";
import avatar from '../../assets/imgs/no-avatar.png';

const Conversations = ({ conversation, id }) => {

  const [user, setUser] = useState('hola');

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== id);

    const getUser = async () => {
      try {
        const res = await axios("https://plataformaeventos-production-6111.up.railway.app/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id, conversation]);

  return (
    

      <div className={styles.listChats}>

        <div className={styles.itemChat}>
          <img src={user.picture ? user.picture : avatar} 
            alt="imageAvatar" 
          />
          <span >{user.name}</span>
        </div>
        


        {/* {
          users.map((user) => (
          <div className={styles.itemChat}>
            <div className={styles.userChat}>
              <img src={user.img} alt={user.name} />
              <span>{user.name}</span>
            </div>

            <div className={styles.itemChatDivisor} />

            <div className={styles.itemOptionsChat}>

              <div className={styles.itemChatNumberMessage}>
                1
              </div>

              <div className={styles.containerItemMenu}>
                <FiMail className={styles.itemMenuIcon} />
                <div className={styles.helperMenu}>
                  <p>Marcar como leído</p>
                </div>
              </div>

              <div className={styles.containerItemMenu}>
                <FiArchive className={styles.itemMenuIcon} />
                <div className={styles.helperMenu}>
                  <p>Archivar conversación</p>
                </div>
              </div>

              <div className={styles.containerItemMenu}>
                <BiPin className={styles.itemMenuIcon} />
                <div className={styles.helperMenu}>
                  <p>Fijar conversacion</p>
                </div>
              </div>

              <div className={styles.containerItemMenu}>
                <BiBlock className={styles.itemMenuIcon} />
                <div className={styles.helperMenu}>
                  <p>Bloquear usuario</p>
                </div>
              </div>

            </div>
          </div>
          ))
        } */}
      

      {/* <div className={styles.buttonsChats}>
        <div>
          <p>Usuarios Bloqueados</p>
        </div>

        <div className={styles.buttonDivisor} />

        <div>
          <p>Conversaciones archivadas</p>
        </div>
      </div> */}
    </div>
  );
}

export default Conversations;
