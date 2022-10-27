import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { FiMail, FiArchive, FiStar } from 'react-icons/fi';
import eventsApi from "../../axios/eventsApi";
import { AuthContext } from '../../context/auth/AuthContext';
import avatar from '../../assets/imgs/no-avatar.png';
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/Message/Message';
import { animateScroll as scroll } from 'react-scroll';

const Messages = () => {

  const { user } = useContext(AuthContext);
  const id = user.uid;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [result, setResult] = useState({});
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await eventsApi.get("/conversation/" + id);
        setConversations(res.data);
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

  /* useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else {
      console.log('ref:', scrollRef.current)
    }
  }, [messages]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      resiver: currentChat.members[1], 
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await eventsApi.post("/message/create", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };  

  const handleClickConversation = async (c) => {
    setCurrentChat(c);
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
              <div>
                <FiMail />
                <span>Marcar todos como leídos</span>
              </div>

              <div>
                <FiArchive />
                <span>Archivar todas las conversaciones</span>
              </div>

              <div>
                <FiStar />
                <span>Mensajes destacados</span>
              </div>
            </div>

            <div className={styles.containerChats}>

              {
                conversations.map((c, i) => (
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
                currentChat ? (
                <>
                  <div>
                    {
                      messages.map((m, i) => (
                        <div key={i} ref={scrollRef}>
                          <Message message={m} own={m.sender === id} />
                        </div>
                      ))
                    }
                  </div> 
                </> ) : 
                (
                  <span>
                    Inicia una conversación.
                  </span>
                )
              }

            </div>

          </div>

          <div className={styles.buttonsChats}>
            <div>
              <p>Usuarios Bloqueados</p>
            </div>

            <div className={styles.buttonDivisor} />

            <div>
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
