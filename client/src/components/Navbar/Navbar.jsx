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

const Navbar = ({ upper }) => {
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

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
                <div className={style.containerMessage}>
                  <GrMail className={style.iconNav} />
                  <div className={style.bage}>2</div>
                </div>
                <div className={style.divisorNotis} />
                <div className={style.containerNotis}>
                  <IoNotifications className={style.iconNav} />
                  <div className={style.bage}>2</div>
                </div>
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
