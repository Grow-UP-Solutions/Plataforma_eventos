import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth';
import { stateContext } from '../../context/state/stateContext';
import Search from '../Search/Search';
import { GrMail } from 'react-icons/gr';
import { BiMenu } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotifications, IoCaretDownSharp, IoCaretUpSharp, IoClose } from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';
import eventsApi from '../../axios/eventsApi';
import ConversationNoti from '../ConversationNoti/ConversationNoti';

const Navbar = ({ upper }) => {

  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const { notes, setNotes, msg, setMsg } = useContext(stateContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current === null || menuRef.current === undefined) {
      } 
      else if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setOpenNotifications(false);
        setOpenMessages(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get('/users/' + user.uid);
      const result = userResult.data.message.filter((e) => e.read === false);
      const final = result.filter((e) => e.sender !== user.uid);
      setNotes(userResult.data.notifications.filter((e) => e.read === false));
      setMsg(final);
      setUserData(userResult.data);
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
    navigate('/usuario/mensajes');
    setOpenMessages(false);
  };

  const handleClickNotifications = (e) => {
    e.preventDefault();
    navigate('/usuario/notificaciones');
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

  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = (option) => {
    switch (option) {
      case 'login':
        toggleScreenLogin();
        return setOpenMenu(false);
      case 'register':
        navigate('/registrate');
        return setOpenMenu(false);
      case 'createEvent':
        navigate('/organiza-un-evento/beneficios');
        return setOpenMenu(false);
      default:
        setOpenMenu(!openMenu);
    }
  };

  const handleClickUserOptionMenu = (option) => {
    setOpenMenu(false);
    navigate(option);
  };

  return (
    <div
      id='navbar'
      style={{ position: pathname === '/' ? 'fixed' : 'sticky' }}
      className={`${style.container} ${pathname !== '/' || upper === false ? style.customizeNavBar : ''}`}
    >
      <div className={`${style.containerInfo} container`}>
        <div className={style.hamburgerIcon}>
          <BiMenu onClick={handleOpenMenu} />
        </div>

        {openMenu && (
          <div className={style.menu}>
            <IoClose onClick={handleOpenMenu} className={style.iconCloseMenu} />
            {Object.keys(user).length > 0 ? (
              <div className={style.containerUserNav}>
                <button onClick={() => handleClickUserOptionMenu('/usuario/mi-lista')}>Mis eventos</button>
                <button onClick={() => handleClickUserOptionMenu('/usuario/perfil')}>Perfil</button>
                <button onClick={() => handleClickUserOptionMenu('/usuario/mi-lista')}>Mi Lista</button>
                <button onClick={() => handleClickUserOptionMenu('/usuario/plan-de-referidos')}>
                  Plan de referidos
                </button>
                <button onClick={() => handleClickUserOptionMenu('/usuario/preferencias')}>Preferencias</button>
                <button
                  className={style.btnOrganizeEvent}
                  onClick={() => handleClickUserOptionMenu('/oganiza-un-evento')}
                >
                  Organiza un evento
                </button>
                <hr />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate('/');
                  }}
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <ul className={style.listItemsMenu}>
                <li className={style.itemMenu}>
                  <button className={style.btnLoginMenu} onClick={() => handleOpenMenu('login')}>
                    Iniciar Sesión
                  </button>
                </li>
                <li className={style.itemMenu}>
                  <button onClick={() => handleOpenMenu('register')}>Registrarse</button>
                </li>
                <li className={`${style.itemMenu}`}>
                  <button className={style.btnCreateEvent} onClick={() => handleOpenMenu('createEvent')}>
                    Organizar un evento
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}

        <div className={style.containerImgInput}>
          <img src={logo} alt='LogoNav' onClick={handleClick} />
          {pathname !== '/' || upper === false ? (
            <div className={style.searchComponent}>
              <Search location={'not-home'} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={style.container_div}>
          {logged && (
            <Link className={style.navMyList} to='/usuario/mi-lista'>
              Mi lista
            </Link>
          )}

          <div className={style.containerBtnOrganizer}>
            {user.organizer ? (
              <Link to='/oganiza-un-evento'>
                <p className={`${logged ? style.buttonOrganizar : ''}`}>Organiza un evento</p>
              </Link>
            ) : userData && userData.isRejected === true ? (
              ''
            ) : (
              <Link to={`organiza-un-evento/beneficios`}>
                <p className={`${logged ? style.buttonOrganizar : ''}`}>Organiza un evento</p>
              </Link>
            )}
          </div>

          {!logged ? (
            <>
              <p className={style.btnLogin} onClick={toggleScreenLogin}>
                Ingresa
              </p>
              <Link className={style.btnRegister} to={`/registrate`}>
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
                  <div className={style.notifications} ref={menuRef}>
                    <span onClick={handleOpenMessages} className={style.close_menu}>
                      X
                    </span>

                    <p className={style.link_noti} onClick={handleClickAllReadMessages}>
                      Marcar todas como leidas
                    </p>

                    {msg.map((c, i) => (
                      <div className={style.noty} key={i}>
                        <ConversationNoti msgs={c} id={user.uid} />
                      </div>
                    ))}

                    <p className={style.link_notis} onClick={handleClickMessage}>
                      Ver todos los mensajes
                    </p>
                  </div>
                )}

                {openNotifications && (
                  <div className={style.notifications} ref={menuRef}>
                    <span onClick={handleOpenNotifications} className={style.close_menu}>
                      X
                    </span>

                    <p className={style.link_noti} onClick={handleClickAllReadNotifications}>
                      Marcar todas como leidas
                    </p>
                    {notes.map((e) => (
                      <div className={style.noty}>
                        <IoNotifications className={style.iconNav} />
                        <p onClick={handleClickNotifications}>{e.msg}</p> 
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
                    <Link to='/usuario/perfil'>
                      <p>{user.nickname.split(' ')[0]}</p>
                      <p>{user.nickname.split(' ')[1]}</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to='/usuario/perfil'>
                      <p>{user.name.split(' ')[0]}</p>
                      <p>{user.name.split(' ')[1]}</p>
                    </Link>
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
                {menuOpen ? (
                  <IoCaretUpSharp className={style.iconMenu} />
                ) : (
                  <IoCaretDownSharp className={style.iconMenu} />
                )}

                {menuOpen && (
                  <div className={style.containerProfileMenu} ref={menuRef} >
                    {
                      userData.isOrganizer === true ?
                      <Link to='/usuario/mis-eventos'>Mis eventos</Link> :
                      <Link to='/usuario/mi-lista'>Mis eventos</Link>
                    }

                    <Link to='/usuario/perfil'>
                      <a>Perfil</a>
                    </Link>
                    <Link className={style.navMyListMenu} to='/usuario/mi-lista'>
                      Mi lista
                    </Link>
                    <Link to='/oganiza-un-evento' className={style.buttonOrganizarMenu}>
                      Organiza un evento
                    </Link>
                    <Link to='/usuario/plan-de-referidos'>Plan de referidos</Link>
                    <Link to='/usuario/preferencias'>Preferencias</Link>
                    <hr />
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        navigate('/');
                      }}
                    >
                      Cerrar sesión
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {!user && <div className={style.auxDiv} />}
      </div>
    </div>
  );
};

export default Navbar;
