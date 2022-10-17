import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth';
import { stateContext } from '../../context/state/stateContext';
import Search from '../Search/Search';
import {GrMail} from 'react-icons/gr';
import {FaUserCircle} from 'react-icons/fa';
import {IoNotifications, IoCaretDownSharp} from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';
import axios from 'axios';

const Navbar = ({ upper }) => {

  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const { result, setResult } = useContext(stateContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const navigate = useNavigate();
  //const allNotifications = notifications;
  const {pathname} = useLocation();

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await axios.get('https://plataformaeventos-production-6111.up.railway.app/users/' + user.uid);
      setResult(userResult.data);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
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

  return (
    <div
      id='navbar'
      style={{position: pathname === '/' ? 'fixed' : 'sticky'}}
      className={`${style.container} ${
        pathname !== '/' || upper === false ? style.customizeNavBar : ''
      }`}
    >
      <div className={`${style.containerInfo} container`}>
        <div className={style.containerImgInput}>
          <img src={logo} alt='LogoNav' onClick={handleClick} />
          {pathname !== '/' || upper === false ? (
            <Search location={'not-home'} />
          ) : (
            <></>
          )}
        </div>
        <div className={style.container_div}>
          {logged && <a href='$'>Mi lista</a>}
          <Link to={`/organiza-un-evento`}>
            <p className={`${logged ? style.buttonOrganizar : ''}`}>
              Organiza un evento
            </p>
          </Link>
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
                <div
                  className={style.containerMessage}
                  onClick={() => setOpenMessages(!openMessages)}
                >
                  <GrMail className={style.iconNav} />
                  <div className={style.bage}>0</div>
                </div>
                <div className={style.divisorNotis} />
                <div
                  className={style.containerNotis}
                  onClick={() => setOpenNotifications(!openNotifications)}
                >
                  <IoNotifications className={style.iconNav} />
                  <div className={style.bage}>0</div>
                </div>

                {openMessages && (
                  <div className={style.notifications}>
                    <p className={style.link_noti}>Marcar todas como leidas</p>
                    {result.notifications.map((e) => (
                      <div className={style.noty}>
                        {e.msg}
                      </div>
                    ))}
                    <p
                      className={style.link_notis}
                      onClick={handleClickMessage}
                    >
                      Ver todos los mensajes
                    </p>
                  </div>
                )}

                {openNotifications && (
                  <div className={style.notifications}>
                    <p className={style.link_noti}>Marcar todas como leidas</p>
                    {result.notifications.map((e) => (
                      <div className={style.noty}>
                        <IoNotifications className={style.iconNav} />
                        {e.msg}
                      </div>
                    ))}
                    <p
                      className={style.link_notis}
                      onClick={handleClickNotifications}
                    >
                      Ver todas las notificaciones
                    </p>
                  </div>
                )}
              </div>

              <div className={style.containerName}>
                <p>{user.name.split(' ')[0]}</p>
                <p>{user.name.split(' ')[1]}</p>
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
                    <img
                      className={style.userImg}
                      src={user.picture}
                      alt='img-user'
                    />
                  ) : (
                    <FaUserCircle className={style.userImg} />
                  )}
                </div>
                <IoCaretDownSharp className={style.iconMenu} />
                {menuOpen && (
                  <div className={style.containerProfileMenu}>
                    <a href='#'>Mis eventos</a>
                    <Link to='/user/profile'>
                      <a>Perfil</a>
                    </Link>
                    <a href='#'>Plan de referidos</a>
                    <a href='#'>Preferencias</a>
                    <hr />
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
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
