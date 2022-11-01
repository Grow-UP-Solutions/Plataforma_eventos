import React, { useContext, useEffect, useState } from 'react';
import styles from './Messages.module.css';
import { FiMail, FiArchive, FiStar } from 'react-icons/fi';
import eventsApi from "../../axios/eventsApi";
import avatar from '../../assets/imgs/no-avatar.png';
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/Message/Message';
import { animateScroll as scroll } from 'react-scroll';
import { AuthContext } from '../../context/auth/AuthContext';
import { UIContext } from '../../context/ui';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const Messages = () => {

  const { user } = useContext(AuthContext);
  const { getMessagesStar, msgStar } = useContext(UIContext);
  const { setMsg, block, setBlock } = useContext(stateContext);
  const id = user.uid;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [result, setResult] = useState({});
  const [star, setStar] = useState(false);
  const [clickOne, setClickOne] = useState(false);
  const [clickTwo, setClickTwo] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await eventsApi.get("/conversation/" + id);
        setConversations(res.data.filter(e => e.locked === false));
        setBlock(res.data.filter(e => e.locked === true));
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await eventsApi.get("/message/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]); 

  useEffect(() => {
    const myUser = async () => {
      try {
        const json = await eventsApi.get("/users/" + id);
        setResult(json.data);
      } catch (error) {
        console.log(error)
      }
    }
    myUser();
  }, [id]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const friendId = currentChat.members.find((m) => m !== id);
    const message = {
      sender: id,
      resiver: friendId, 
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await eventsApi.post("/message/create", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      scroll.scrollToTop();
    } 
    catch (err) {
      console.log(err);   
    }
  };  

  const handleClickConversation = async (c) => {
    setCurrentChat(c);
    setStar(false);
  } 

  const handleClickStar = (e) => {
    e.preventDefault();
    setStar(true);
    const messagesStar = async () => {
      try {
        const res = await eventsApi.get("/message/" + currentChat._id);
        getMessagesStar(res.data.filter((e) => e.outstanding === true));
      } catch (err) {
        console.log(err);
      }
    };
    messagesStar();
  }

  const handleClickAllReadMessages = async (e) => {
    e.preventDefault();
    const res = await eventsApi.put('/message/update/' + user.uid);
    setMsg(res.data.filter((e) => e.read === false));
  };

  const handleClickFile = (e) => {
    e.preventDefault();
    swal({
      title: 'Tus conversaciones ya se encuentran archivadas',
      icon: 'info',
      button: 'Cerrar',
      closeModal: true,
      dangerMode: true,
    });
  }

  const handleClickOne = (e) => {
    e.preventDefault();
    setClickOne(!clickOne);
    setClickTwo(!clickTwo);
    if(clickOne === true) setClickOne(true);
    if(clickTwo === false) setClickTwo(false);
  } 

  const handleClickTwo = (e) => {
    e.preventDefault();
    setClickTwo(!clickTwo);
    setClickOne(!clickOne);
    if(clickTwo === true) setClickTwo(true);
    if(clickOne === false) setClickOne(false);
  }
  
  return (
    <div className={`${styles.pageMessage} container`}>
      <div className={styles.containerMessage}>

        <div className={styles.containerTitle}>
          <h1 className={styles.title}>Mensajes</h1>
        </div>

        <div className={styles.gridContainer}>

          <div className={styles.containerChats}>
            
            <div className={styles.containerOptions}>
              <div onClick={handleClickAllReadMessages}>
                <FiMail />
                <span>Marcar todos como leídos</span>
              </div>

              <div onClick={handleClickFile}>
                <FiArchive />
                <span>Archivar todas las conversaciones</span>
              </div>

              <div onClick={handleClickStar}>
                <FiStar />
                <span>Mensajes destacados</span>
              </div>
            </div>

            <div className={styles.containerChats}>

              {
                clickTwo === true ?
                conversations.map((c, i) => (
                  <div key={i} onClick={() => handleClickConversation(c)} className={currentChat && currentChat._id === c._id ? styles.active : ''}>
                    <Conversations conversation={c} id={id} />
                  </div>
                )) :
                block.map((c, i) => (
                  <div key={i} onClick={() => handleClickConversation(c)} className={currentChat && currentChat._id === c._id ? styles.active : ''}>
                    <Conversations conversation={c} id={id} />
                  </div>
                ))
              }

            </div>

          </div>
          
          <div className={styles.containerChat}>

            <div className={styles.chatHeader}>
              <img src={result.userpicture ? result.userpicture : avatar} alt="user-photo" />
              <span>{user.name}</span>
            </div>

            <div className={styles.containerChatMessage}>
              {
                currentChat && star === false ? (
                <>
                  <div>
                    {
                      messages.map((m, i) => (
                        <div key={i} >
                          <Message message={m} own={m.sender === id} />
                        </div>
                      )).reverse()
                    }
                  </div> 
                </> ) : currentChat && star === true ? ( 
                <>
                  <div>
                    {
                      msgStar.map((m, i) => (
                        <div key={i} >
                          <Message message={m} own={m.sender === id} />
                        </div>
                      )).reverse()
                    }
                  </div>
                </> ) : 
                (
                  <span className={styles.noMsg}>
                    Inicia una conversación.
                  </span>
                )
              }

            </div>

          </div>

          <div className={styles.buttonsChats}>
            <div onClick={handleClickOne} className={`${clickOne ? styles.box_event : styles.box1}`}>
              <p>Usuarios Bloqueados</p>
            </div>

            <div className={styles.buttonDivisor} />

            <div onClick={handleClickTwo} className={`${clickTwo ? styles.box_event : styles.box2}`}>
              <p>Conversaciones archivadas</p>
            </div>
          </div>

          <div className={styles.containerInputMessage}>

            {
              currentChat ?
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Escribe un mensaje aquí"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea> :
              <textarea
                disabled
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Escribe un mensaje aquí"
              ></textarea>
            }

            <div className={styles.wrapperBtnInputMessage}>
              <p>
                No se permite el envío de números de teléfono, direcciones de
                correo electrónico, enlaces a sitios web o enlaces a redes
                sociales.
              </p>
              {
                currentChat ?
                <button onClick={handleSubmit}>Enviar</button> :
                <button disable >Enviar</button>
              }
              
            </div>
            
          </div> 
          
        </div>
      </div>
    </div>
  );
};

export default Messages;
