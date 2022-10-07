import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth';
import Search from '../Search/Search';
import { GrMail } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotifications, IoCaretDownSharp } from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';
import notifications from '../../api/noti';

const Navbar = ({ upper }) => {
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const navigate = useNavigate();
  const allNotifications = notifications;
  const { pathname } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };  

  const handleClickMessage = (e) => {
    e.preventDefault();
    navigate('/user/message');
    setOpenMessages(false);
  }

  const handleClickNotifications = (e) => {
    e.preventDefault();
    navigate('/user/notifications');
    setOpenNotifications(false);
  }  
  
console.log(user)
  const nombreApellido= user.name.split(' ')
  return (
    <div
      id="navbar"
      style={{ position: pathname === '/' ? 'fixed' : 'sticky' }}
      className={`${style.container} ${
        pathname !== '/' || upper === false ? style.customizeNavBar : ''
      }`}
    >
      <div className={`${style.containerInfo} container`}>
        <div className={style.containerImgInput}>
          <img src={logo} alt="LogoNav" onClick={handleClick} />
          {pathname !== '/' || upper === false ? (
            <Search location={'not-home'} />
          ) : (
            <></>
          )}
        </div>
        <div className={style.container_div}>
          {logged && <a href="$">Mi lista</a>}
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
                <div className={style.containerMessage} onClick={() => setOpenMessages(!openMessages)}>
                  <GrMail className={style.iconNav} />
                  <div className={style.bage}>1</div>
                </div>
                <div className={style.divisorNotis} />
                <div className={style.containerNotis} onClick={() => setOpenNotifications(!openNotifications)}>
                  <IoNotifications className={style.iconNav} />
                  <div className={style.bage}>{allNotifications.length}</div>
                </div>

                {
                  openMessages && (
                    <div className={style.notifications}>
                      <p className={style.link_noti}>Marcar todas como leidas</p>
                      {
                        allNotifications.map(e => (
                          <div className={style.noty}>
                            
                            {e.title} {e.noti}
                          
                          </div>
                          
                        ))
                      }
                      <p className={style.link_notis} onClick={handleClickMessage}>Ver todos los mensajes</p>             
                    </div>
                  )
                }

                {
                  openNotifications && (
                    <div className={style.notifications}>
                      <p className={style.link_noti}>Marcar todas como leidas</p>
                      {
                        allNotifications.map(e => (
                          <div className={style.noty}>
                            <IoNotifications className={style.iconNav} />
                            {e.title} {e.noti}
                          
                          </div>
                          
                        ))
                      }
                      <p className={style.link_notis} onClick={handleClickNotifications}>Ver todas las notificaciones</p>
                    </div>
                  )
                }

              </div>

              <div className={style.containerName}>
                <p>{nombreApellido[0]}</p>
                <p>{nombreApellido[1]}</p>
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
                  {user.img ? (
                    <img
                      className={style.userImg}
                      src={user.img}
                      alt="img-user"
                    />
                  ) : (
                    <FaUserCircle className={style.userImg} />
                  )}
                </div>
                <IoCaretDownSharp className={style.iconMenu} />
                {menuOpen && (
                  <div className={style.containerProfileMenu}>
                    <a href="#">Mis eventos</a>
                    <Link to="/user/profile">
                      <a>Perfil</a>
                    </Link>
                    <a href="#">Plan de referidos</a>
                    <a href="#">Preferencias</a>
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
