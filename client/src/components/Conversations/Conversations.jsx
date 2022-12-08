
import React, { useContext, useEffect, useState } from 'react';
import styles from './Conversations.module.css';
import { BiBlock, BiPin } from 'react-icons/bi';
import { FiMail, FiArchive } from 'react-icons/fi';
import avatar from '../../assets/imgs/no-avatar.png';
import avatar_group from '../../assets/imgs/avatar-grupal.png';
import eventsApi from '../../axios/eventsApi';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const Conversations = ({ conversation, id }) => {

  const { setMsg } = useContext(stateContext);
  const [user, setUser] = useState('hola');
  const [messages, setMessages] = useState([]);
  const [click, setClick] = useState(null);
  const [blocked, setBlocked] = useState(false);
  const [group, setGroup] = useState(false);

  useEffect(() => {
    if (conversation.members.length < 3) {
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
    }
    else {
      setGroup(true);
    }
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

  useEffect(() => {
    setClick(conversation.pinup);
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

  const handleClickPinUp = async (e) => {
    e.preventDefault();
    setClick(!click);
    const res = await eventsApi.put(`/conversation/${conversation._id}/pinup`);
  }
  
  const handleClickBlock = async (e) => {
    e.preventDefault();
    setBlocked(true);
    const res = await eventsApi.put('/conversation/' + conversation._id);
    swal({
      title: 'Conversación Bloqueada',
      icon: 'info',
      button: 'Cerrar',
      closeModal: true,
      dangerMode: true,
    });
  }

  return (
    <div className={blocked === true ? styles.listChatC : styles.listChats} >

      {
        group ? 
        <div className={styles.itemChat}>
          <img src={avatar_group} alt="imageAvatar" onClick={hanldeClickMsg}/>

          <span><p className={styles.texto_p}>Grupo Evento</p></span>

          <div className={styles.itemChatDivisor} />
        </div> :

        <div className={styles.itemChat} >

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

              {
                click === true ?
                (<div className={styles.containerItemMenu} onClick={handleClickPinUp}>
                  
                  <BiPin className={styles.itemMenuIcon} style={{color: '#d53e27'}}/>
                  <div className={styles.helperMenu}>
                    <p>Mensajes prioritarios</p>
                  </div> 
                    
                </div>) : 
                
                (<div className={styles.containerItemMenu} onClick={handleClickPinUp}>
                  
                  <BiPin className={styles.itemMenuIcon} />
                  <div className={styles.helperMenu}>
                    <p>Mensajes prioritarios</p>
                  </div> 
                  
                </div>) 
              }

              <div className={styles.containerItemMenu} onClick={handleClickBlock}>
                <BiBlock className={styles.itemMenuIcon} />
                <div className={styles.helperMenu}>
                  <p>Bloquear usuario</p>
                </div>
              </div>

            </div> : ''
          }
        </div>   
      }   
    </div>
  );
}

export default Conversations;
