import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth';
import { stateContext } from '../../context/state/stateContext';
import Search from '../Search/Search';
import { GrMail } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotifications, IoCaretDownSharp } from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';
import eventsApi from '../../axios/eventsApi';
import avatar from '../../assets/imgs/no-avatar.png';
import { format, register } from "timeago.js";
import ConversationNoti from '../ConversationNoti/ConversationNoti';

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

const Navbar = ({ upper }) => {
  
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const { notes, setNotes, msg, setMsg, conversa } = useContext(stateContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  //const [name, setName] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get('/users/' + user.uid);
      const result = userResult.data.message.filter((e) => e.read === false);
      const final = result.filter(e => e.sender !== user.uid);
      setNotes(userResult.data.notifications.filter((e) => e.read === false));
      setMsg(final);
    }
  };

  /* useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    let userResultName = {};
    if (user.uid) {
      userResultName = await eventsApi.get('/users/' + msg._id);
      const result = userResultName.data.name;
      console.log('msgid', msg._id);
      console.log('result', result);
      setName(result);
    }
  }; */

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleOpenMessages = (e) => {
    e.preventDefault();
    setOpenMessages(!openMessages);
    setOpenNotifications(false);
  };

  const handleOpenNotifications = (e) => {
    e.preventDefault();
    setOpenNotifications(!openNotifications);
    setOpenMessages(false);
  };

  const handleClickMessage = (e) => {
    e.preventDefault();
    navigate('/user/message');
    setOpenMessages(false);
  };

  const handleClickNotifications = (e) => {
    e.preventDefault();
    navigate('/user/notifications');
    setOpenNotifications(false);
  };

  const handleClickAllReadMessages = async (e) => {
    e.preventDefault();
    const res = await eventsApi.put('/message/update/' + user.uid);
    setMsg(res.data.filter((e) => e.read === false));
  };

  const handleClickAllReadNotifications = async (e) => {
    e.preventDefault();
    const res = await eventsApi.put(`/users/${user.uid}/notifications`);
    setNotes(res.data.filter((e) => e.read === false));
  };

  return (
    <div
      id='navbar'
      style={{ position: pathname === '/' ? 'fixed' : 'sticky' }}
      className={`${style.container} ${pathname !== '/' || upper === false ? style.customizeNavBar : ''}`}
    >
      <div className={`${style.containerInfo} container`}>
        <div className={style.containerImgInput}>
          <img src={logo} alt='LogoNav' onClick={handleClick} />
          {pathname !== '/' || upper === false ? <Search location={'not-home'} /> : <></>}
        </div>
        <div className={style.container_div}>
          {logged && <Link to='/user/perfil/mi-lista'>Mi lista</Link>}
          {user.organizer? (
            <Link to='/oganiza-un-evento-form'>
              <p className={`${logged ? style.buttonOrganizar : ''}`}>Organiza un evento</p>
            </Link>
          ):
            <Link to={`/organiza-un-evento`}>
              <p className={`${logged ? style.buttonOrganizar : ''}`}>Organiza un evento</p>
            </Link>
          }
          {!logged ? (
            <>
              <p onClick={toggleScreenLogin}>Ingresa</p>
              <Link to={`/registrate`}>
                <span className={style.button}>Registrate</span>
              </Link>
            </>
          ) : (
            <>
              <div className={style.containerNotification}>
                <div className={style.containerMessage} onClick={handleOpenMessages}>
                  <GrMail className={style.iconNav} />
                  <div className={style.bage}>{msg.length}</div>
                </div>
                <div className={style.divisorNotis} />
                <div className={style.containerNotis} onClick={handleOpenNotifications}>
                  <IoNotifications className={style.iconNav} />
                  <div className={style.bage}>{notes.length}</div>
                </div>

                {openMessages && (
                  <div className={style.notifications}>
                    <p className={style.link_noti} onClick={handleClickAllReadMessages}>
                      Marcar todas como leidas
                    </p>

                    {
                      /* msg.map((c, i) => (
                        <div className={style.noty} key={i} >
                          <div className={style.container_image}>
                            <img src={avatar} alt="avatar" style={{width: '4.7rem', height: '4.7rem'}}/>
                          </div>

                          <div className={style.container_texts}>
                            <p className={style.text_name}>{}NOMBRE</p>
                            <p className={style.text_text}>{c.text}</p>
                            <p className={style.text_date}>{format(c.createdAt, 'es_ES')}</p>
                          </div>
                          
                        </div>
                      )) */
                    }

                    {
                      msg.map((c, i) => (
                        <div className={style.noty} key={i} >
                          <ConversationNoti msgs={c} id={user.uid} />
                        </div>
                      ))
                    }

                    <p className={style.link_notis} onClick={handleClickMessage}>
                      Ver todos los mensajes
                    </p>
                  </div>
                )}

                {openNotifications && (
                  <div className={style.notifications}>
                    <p className={style.link_noti} onClick={handleClickAllReadNotifications}>
                      Marcar todas como leidas
                    </p>
                    {notes.map((e) => (
                      <div className={style.noty}>
                        <IoNotifications className={style.iconNav} />
                        {e.msg}
                      </div>
                    ))}
                    <p className={style.link_notis} onClick={handleClickNotifications}>
                      Ver todas las notificaciones
                    </p>
                  </div>
                )}
              </div>

              <div className={style.containerName}>
                {user.nickname ? (
                  <>
                    <p>{user.nickname.split(' ')[0]}</p>
                    <p>{user.nickname.split(' ')[1]}</p>
                  </>
                ) : (
                  <>
                    <p>{user.name.split(' ')[0]}</p>
                    <p>{user.name.split(' ')[1]}</p>
                  </>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  position: 'relative',
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                >
                <div className={style.containerImg}>
                  {user.picture ? (
                    <img className={style.userImg} src={user.picture} alt='img-user' />
                    ) : (
                      <FaUserCircle className={style.userImg} />
                      )}
                </div>
                <IoCaretDownSharp className={style.iconMenu} />
                {menuOpen && (
                  <div className={style.containerProfileMenu}>
                    <Link to='/user/perfil/mi-lista'>Mis eventos</Link>
                    <Link to='/user/perfil/datos'>
                      <a>Perfil</a>
                    </Link>
                    <Link to='/user/perfil/plan-de-referidos'>Plan de referidos</Link>
                    <Link to='/user/perfil/preferencias'>Preferencias</Link>
                    <hr />
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        navigate('/');
                      }}
                      >
                      Cerrar
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;




{/* {
    conversa.map((c, i) => (
      <div className={style.noty} key={i} >
        <ConversationNoti conversation={c} id={user.uid} />
      </div>
    ))
  } */}


{/* <ConversationNoti msgs={c} id={user.uid} /> */}

{/* {
  msg.map((e) => (
    <div className={style.noty}>{e.text}</div>
  ))
} */}