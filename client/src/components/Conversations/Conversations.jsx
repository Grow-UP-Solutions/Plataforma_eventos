
import React, { useContext, useEffect, useState } from 'react';
import styles from './Conversations.module.css';
import { BiBlock, BiPin } from 'react-icons/bi';
import { FiMail, FiArchive } from 'react-icons/fi';
import avatar from '../../assets/imgs/no-avatar.png';
import eventsApi from '../../axios/eventsApi';
import { stateContext } from '../../context/state/stateContext';

const Conversations = ({ conversation, id }) => {

  const { setMsg } = useContext(stateContext);
  const [user, setUser] = useState('hola');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== id);
    const getUser = async () => {
      try {
        const res = await eventsApi.get("/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id, conversation]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await eventsApi.get('/message/' + conversation._id);
      const result = res.data.filter(e => e.read === false);
      const final = result.filter(e => e.sender !== id);
      setMessages(final);
    }
    getMessages();
  }, [conversation]);

  const hanldeClickMsg = async (e) => {
    e.preventDefault();
    const data = {
      conversationId: conversation._id
    }
    const res = await eventsApi.put('/message/update/' + id, data);
    const result = res.data.filter(e => e.read === false);
    const final = result.filter(e => e.sender !== id);
    //console.log('res.dataconversa:', res.data);
    //console.log('data:', data);
    setMessages(final);
    setMsg(final);
  }

  return (
    <div className={styles.listChats} >

      <div className={styles.itemChat} >
        <img src={user.userpicture ? user.userpicture : avatar} 
          alt="imageAvatar" 
          onClick={hanldeClickMsg}
        />
        <span >{user.name}</span>

        <div className={styles.itemChatDivisor} />

        <div className={styles.itemOptionsChat}>

          <div className={styles.itemChatNumberMessage}>
            {
              messages.length
            }
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
    </div>
  );
}

export default Conversations;
