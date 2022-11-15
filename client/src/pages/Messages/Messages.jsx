import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { FiArchive, FiMail, FiStar } from 'react-icons/fi';
import { animateScroll as scroll } from 'react-scroll';
import swal from 'sweetalert';
import avatar from '../../assets/imgs/no-avatar.png';
import eventsApi from '../../axios/eventsApi';
import Conversations from '../../components/Conversations/Conversations';
import Message from '../../components/Message/Message';
import MessageFav from '../../components/MessageFav/MessageFav';
import Modal from '../../components/Modal/Modal';
import ModalMsg from '../../components/Modals/ModalMsg';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import { UIContext } from '../../context/ui';
import { useModal } from '../../hooks/useModal';
import styles from './Messages.module.css';

const validate = (form) => {
  let errors = {};

  // let letras = /^[a-zA-Z]*$/g;
  let mail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  let webSite = /\b(http|https|www)\b/i;
  let offensiveWord = /\b(puta|hijieputa|pirobo|pirovo|piroba|pirova|marica|maricon|maricona|malparido|malparida|caremonda|chimba|chimbo|gurrupleta|gonorrea|gonorriento|gonorrienta|gueva|guevon|guevona|zuripanta|pichurria)\b/i;

  if (!form.text) {
    errors.text = true;
  }

  if (form.text.match(mail)) {
    errors.title = 'No puedes ingresar un email o link a redes sociales';
  }

  if (form.text.match(webSite)) {
    errors.title = 'No puedes ingresar un dominio o pagina web';
  }

  if (form.text.match(offensiveWord)) {
    errors.title = 'Palabra ofensiva';
  }

  return errors;
};

const Messages = () => {
  const { user } = useContext(AuthContext);
  const { getMessagesStar, msgStar } = useContext(UIContext);
  const { setMsg } = useContext(stateContext);
  const id = user.uid;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [result, setResult] = useState({});
  const [star, setStar] = useState(false);
  const [clickOne, setClickOne] = useState(false);
  const [clickTwo, setClickTwo] = useState(true);
  const [block, setBlock] = useState([]);
  const [form] = useState({ text: '' });
  const [errors, setErrors] = useState({ text: '' });
  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await eventsApi.get('/conversation/' + id);
        setConversations(res.data.filter((e) => e.locked === false));
        setBlock(res.data.filter((e) => e.locked === true));
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await eventsApi.get('/message/' + currentChat._id);
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
        const json = await eventsApi.get('/users/' + id);
        setResult(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    myUser();
  }, [id]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleChangeNewMessages = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
    setErrors(
      validate({
        ...form,
        text: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const friendId = currentChat.members.find((m) => m !== id);
    const message = {
      sender: id,
      resiver: friendId,
      text: newMessage,
      conversationId: currentChat._id,
    };
    if (Object.values(errors).length > 0) {
      return openModal();
    }
    try {
      const res = await eventsApi.post('/message/create', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
      scroll.scrollToTop();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickConversation = async (c) => {
    setCurrentChat(c);
    setStar(false);
  };

  const handleClickStar = (e) => {
    e.preventDefault();
    if (currentChat === null) {
      swal({
        title: 'Debes seleccionar una conversación',
        icon: 'info',
        button: 'Cerrar',
        closeModal: true,
        dangerMode: true,
      });
    } else {
      setStar(true);
      const messagesStar = async () => {
        try {
          const res = await eventsApi.get('/message/' + currentChat._id);
          const response = res.data.map((e) =>
            e.outstanding.filter((e) => e.isOutstanding === true && e.idUser === user.uid)
          );
          const responsive = response.filter((e) => e.length > 0).flat();
          getMessagesStar(responsive);
        } catch (err) {
          console.log(err);
        }
      };
      messagesStar();
    }
  };

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
  };

  const handleClickOne = (e) => {
    e.preventDefault();
    setClickOne(!clickOne);
    setClickTwo(!clickTwo);
    if (clickOne === true) setClickOne(true);
    if (clickTwo === false) setClickTwo(false);
    scroll.scrollToTop();
    const userBlock = async () => {
      try {
        const res = await eventsApi.get('/conversation/' + id);
        setBlock(res.data.filter((e) => e.locked === true));
      } catch (error) {
        console.log(error);
      }
    };
    userBlock();
  };

  const handleClickTwo = (e) => {
    e.preventDefault();
    setClickTwo(!clickTwo);
    setClickOne(!clickOne);
    if (clickTwo === true) setClickTwo(true);
    if (clickOne === false) setClickOne(false);
    scroll.scrollToTop();
    const userNotBlock = async () => {
      try {
        const res = await eventsApi.get('/conversation/' + id);
        setConversations(res.data.filter((e) => e.locked === false));
      } catch (error) {
        console.log(error);
      }
    };
    userNotBlock();
  };

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
                <FiMail className={styles.iconOptions} />
                <span>Marcar todos como leídos</span>
              </div>

              <div onClick={handleClickFile}>
                <FiArchive className={styles.iconOptions} />
                <span>Archivar todas las conversaciones</span>
              </div>

              <div onClick={handleClickStar}>
                <FiStar className={styles.iconOptions} />
                <span>Mensajes destacados</span>
              </div>
            </div>

            <Modal isOpen={isOpenModal} closeModal={closeModal}>
              <ModalMsg closeModal={closeModal} />
            </Modal>

            <div className={styles.containerChats}>
              {clickTwo === true
                ? conversations.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => handleClickConversation(c)}
                      className={currentChat && currentChat._id === c._id ? styles.active : ''}
                    >
                      <Conversations conversation={c} id={id} />
                    </div>
                  ))
                : block.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => handleClickConversation(c)}
                      className={currentChat && currentChat._id === c._id ? styles.active : ''}
                    >
                      <Conversations conversation={c} id={id} />
                    </div>
                  ))}
            </div>
          </div>

          <div className={styles.containerChat}>
            <div className={styles.chatHeader}>
              <img src={result.userpicture ? result.userpicture : avatar} alt='user' />
              <span>{user.name}</span>
            </div>

            <div className={styles.containerChatMessage}>
              {currentChat && star === false ? (
                <>
                  {messages
                    .map((m, i) => (
                      <div key={i}>
                        <Message message={m} own={m.sender === id} />
                      </div>
                    ))
                    .reverse()}
                </>
              ) : currentChat && star === true ? (
                <>
                  {msgStar
                    .map((m, i) => (
                      <div key={i}>
                        <MessageFav message={m} own={m.idUser === id} />
                      </div>
                    ))
                    .reverse()}
                </>
              ) : (
                <span className={styles.noMsg}>Inicia una conversación.</span>
              )}
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
            {currentChat ? (
              <textarea
                name='message'
                id='message'
                cols='30'
                rows='10'
                placeholder='Escribe un mensaje aquí'
                onChange={handleChangeNewMessages}
                value={newMessage}
              ></textarea>
            ) : (
              <textarea
                disabled
                name='message'
                id='message'
                cols='30'
                rows='10'
                placeholder='Escribe un mensaje aquí'
              ></textarea>
            )}

            <div className={styles.wrapperBtnInputMessage}>
              <p>
                No se permite el envío de números de teléfono, direcciones de correo electrónico, enlaces a sitios web o
                enlaces a redes sociales.
              </p>
              {currentChat ? <button onClick={handleSubmit}>Enviar</button> : <button disable>Enviar</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
