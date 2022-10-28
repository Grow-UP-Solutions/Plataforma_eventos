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

const Navbar = ({ upper }) => {
  
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const { notes, setNotes, msg, setMsg } = useContext(stateContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
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
          {user.organizer && (
            <Link to={`/organiza-un-evento`}>
              <p className={`${logged ? style.buttonOrganizar : ''}`}>Organiza un evento</p>
            </Link>
          )}
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
                    {msg.map((e) => (
                      <div className={style.noty}>{e.text}</div>
                    ))}
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
