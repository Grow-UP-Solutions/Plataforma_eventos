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
import { IoNotifications, IoCaretDownSharp, IoCaretUpSharp, IoClose, IoHeartCircle } from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';
import eventsApi from '../../axios/eventsApi';
import ConversationNoti from '../ConversationNoti/ConversationNoti';

import { ImFacebook, ImLinkedin2, ImTwitter, ImYoutube } from 'react-icons/im';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

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
      } else if (!menuRef.current.contains(e.target)) {
        setOpenMenu(false);
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
      case 'categories':
        navigate('/categorias');
        return setOpenMenu(false);
      case 'createEvent':
        navigate('/organiza-un-evento/beneficios');
        return setOpenMenu(false);
      case 'home':
        navigate('/');
        return setOpenMenu(false);
      case 'register':
        navigate('/registrate');
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
          <div className={style.menu} ref={menuRef}>
            {Object.keys(user).length > 0 ? (
              <ul className={style.listItemsMenu}>
                <li className={style.itemMenu}>
                  <button
                    className={style.btnOrganizeEvent}
                    onClick={() => handleClickUserOptionMenu('/organiza-un-evento')}
                  >
                    Organiza un evento
                  </button>
                </li>

                <li className={style.itemMenu}>
                  <button onClick={() => handleClickUserOptionMenu('/categorias')}>Categorías</button>
                </li>
                <li className={style.itemMenu}>
                  <button onClick={() => handleClickUserOptionMenu('/')}>Home</button>
                </li>
                <li>
                  <ul className={style.listSocial}>
                    <li>
                      <a href='https://www.facebook.com/' target='_blank' rel='noreferrer noopener'>
                        <ImFacebook className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.instagram.com/' target='_blank' rel='noreferrer noopener'>
                        <FaInstagram className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.twitter.com/' target='_blank' rel='noreferrer noopener'>
                        <ImTwitter className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.tiktok.com/' target='_blank' rel='noreferrer noopener'>
                        <FaTiktok className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.youtube.com/' target='_blank' rel='noreferrer noopener'>
                        <ImYoutube className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer noopener'>
                        <ImLinkedin2 className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className={style.listItemsMenu}>
                <li className={style.itemMenu}>
                  <button className={style.menuBtnRegister} onClick={() => handleOpenMenu('register')}>
                    Registrate
                  </button>
                </li>

                <li className={style.itemMenu}>
                  <button className={style.btnLoginMenu} onClick={() => handleOpenMenu('login')}>
                    Ingresa
                  </button>
                </li>
                <li className={style.itemMenu}>
                  <button onClick={() => handleOpenMenu('categories')}>Categorías</button>
                </li>

                <li className={`${style.itemMenu}`}>
                  <button onClick={() => handleOpenMenu('home')}>Home</button>
                </li>

                <li>
                  <ul className={style.listSocial}>
                    <li>
                      <a href='https://www.facebook.com/' target='_blank' rel='noreferrer noopener'>
                        <ImFacebook className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.instagram.com/' target='_blank' rel='noreferrer noopener'>
                        <FaInstagram className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.twitter.com/' target='_blank' rel='noreferrer noopener'>
                        <ImTwitter className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.tiktok.com/' target='_blank' rel='noreferrer noopener'>
                        <FaTiktok className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.youtube.com/' target='_blank' rel='noreferrer noopener'>
                        <ImYoutube className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer noopener'>
                        <ImLinkedin2 className={style.iconRedSocialMenu} />
                      </a>
                    </li>
                  </ul>
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
              <Link to='/organiza-un-evento'>
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
                  <div className={style.containerProfileMenu} ref={menuRef}>
                    {userData.isOrganizer === true ? <Link to='/usuario/mis-eventos'>Mis eventos</Link> : ''}
                    <Link to='/usuario/perfil'>Perfil</Link>
                    <Link className={style.navMyListMenu} to='/usuario/mi-lista'>
                      Mi lista
                    </Link>
                    <Link to='/organiza-un-evento' className={style.buttonOrganizarMenu}>
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
                {menuOpen && window.innerWidth <= 756 && (
                  <div className={style.containerProfileMenuResponsive} ref={menuRef}>
                    <p className={style.menuUserName}>{user.nickname}</p>
                    <hr />
                    <ul className={style.listNavMenuResponsive}>
                      <li className={style.itemNavMenuResponsive}>
                        <FaUserCircle className={style.iconMenuResponsive} />
                        <Link to={'/usuario/perfil'}>Mi cuenta</Link>
                      </li>
                      <li className={style.itemNavMenuResponsive}>
                        {msg.length > 0 && <span className={style.badgeMenuProfileResponsive} />}
                        <GrMail className={style.iconMenuResponsive} />
                        <Link to={'/usuario/mensajes'}>Mensajes</Link>
                      </li>
                      <li className={style.itemNavMenuResponsive}>
                        {notes.length > 0 && <span className={style.badgeMenuProfileResponsive} />}
                        <IoNotifications className={style.iconMenuResponsive} />
                        <Link to={'/usuario/notificaciones'}>Notificaciones</Link>
                      </li>
                      <li className={style.itemNavMenuResponsive}>
                        <IoHeartCircle className={style.iconMenuResponsive} />
                        <Link to={'/usuario/mi-lista'}>Mi Lista</Link>
                      </li>
                    </ul>
                    <hr />
                    <button onClick={() => logout()} className={style.btnCloseSesionProfileMenuResponsive}>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {Object.keys(user).length <= 0 && (
          <button type='button' onClick={() => toggleScreenLogin()} className={style.btnLoginNav}>
            Ingresa
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
