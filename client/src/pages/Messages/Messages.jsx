import React, { useContext, useEffect, useState } from 'react';
import styles from './Messages.module.css';
import { FiMail, FiArchive, FiStar } from 'react-icons/fi';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import avatar from '../../assets/imgs/no-avatar.png';
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/Message/Message';

const Messages = () => {

  const { user } = useContext(AuthContext);
  const id = user.uid;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://plataformaeventos-production-6111.up.railway.app/conversation/" + id);
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
        const res = await axios.get("https://plataformaeventos-production-6111.up.railway.app/message/" + currentChat._id);
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
        const json = await axios.get("https://plataformaeventos-production-6111.up.railway.app/users/" + id);
        setResult(json.data);
      } catch (error) {
        console.log(error)
      }
    }
    myUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("https://plataformaeventos-production-6111.up.railway.app/message/create", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };  

  const handleClickConversation = (c) => {
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
                  <div key={i} onClick={(c) => handleClickConversation(c)} >
                    <Conversations conversation={c} id={id}/>
                  </div>
                ))
              }

            </div>

          </div>
          
          <div className={styles.containerChat}>

            <div className={styles.chatHeader}>
              <img src={result.picture ? result.picture : avatar} alt="user-photo" />
              <span>{user.name}</span>
            </div>

            <div className={styles.containerChatMessage}>
              {
                currentChat ? (
                <>
                  <div>
                    {
                      messages.map((m, i) => (
                        <div key={i}>
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
