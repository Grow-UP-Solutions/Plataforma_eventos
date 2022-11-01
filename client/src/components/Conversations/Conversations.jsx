
import React, { useContext, useEffect, useState } from 'react';
import styles from './Conversations.module.css';
import { BiBlock, BiPin } from 'react-icons/bi';
import { FiMail, FiArchive } from 'react-icons/fi';
import avatar from '../../assets/imgs/no-avatar.png';
import eventsApi from '../../axios/eventsApi';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const Conversations = ({ conversation, id }) => {

  const { setMsg, block } = useContext(stateContext);
  const [user, setUser] = useState('hola');
  const [messages, setMessages] = useState([]);
  const [click, setClick] = useState(false);

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
    setMessages(final);
    setMsg(final);
  }

  const handleClickFile = (e) => {
    e.preventDefault();
    swal({
      title: 'Tu conversació ya se encuentran archivada',
      icon: 'info',
      button: 'Cerrar',
      closeModal: true,
      dangerMode: true,
    });
  }

  const handleClickPinUp = (e) => {
    e.preventDefault();
    console.log('pinup');
  }
  
  const handleClickBlock = async (e) => {
    e.preventDefault();
    setClick(true);
    const res = await eventsApi.put('/conversation/' + conversation._id);
    const result = res.data.conversation;
    console.log(result);
    swal({
      title: 'Conversación Bloqueada',
      icon: 'info',
      button: 'Cerrar',
      closeModal: true,
      dangerMode: true,
    });
  }

  return (
    <div className={styles.listChats} >

      <div className={click === false ? styles.itemChat : styles.itemChatC} >
        <img src={user.userpicture ? user.userpicture : avatar} 
          alt="imageAvatar" 
          onClick={hanldeClickMsg}
        />
        <span>{user.name}</span>

        <div className={styles.itemChatDivisor} />

        {
          conversation.locked === false ?
          
          <div className={styles.itemOptionsChat}>

            <div className={styles.itemChatNumberMessage}>
              {
                messages.length
              }
            </div>

            <div className={styles.containerItemMenu} onClick={hanldeClickMsg}>
              <FiMail className={styles.itemMenuIcon} />
              <div className={styles.helperMenu} >
                <p>Marcar como leído</p>
              </div>
            </div>

            <div className={styles.containerItemMenu} onClick={handleClickFile}>
              <FiArchive className={styles.itemMenuIcon} />
              <div className={styles.helperMenu}>
                <p>Archivar conversación</p>
              </div>
            </div>

            <div className={styles.containerItemMenu} onClick={handleClickPinUp}>
              <BiPin className={styles.itemMenuIcon} />
              <div className={styles.helperMenu}>
                <p>Fijar conversacion</p>
              </div>
            </div>

            <div className={styles.containerItemMenu} onClick={handleClickBlock}>
              <BiBlock className={styles.itemMenuIcon} />
              <div className={styles.helperMenu}>
                <p>Bloquear usuario</p>
              </div>
            </div>

          </div> : ''

        }

      </div>     
    </div>
  );
}

export default Conversations;
