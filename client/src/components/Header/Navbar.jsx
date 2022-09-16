import React, { useState } from 'react';
import style from './Navbar.module.css';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import Search from '../Search/Search';

import { GrMail } from 'react-icons/gr';
import { IoNotifications, IoCaretDownSharp } from 'react-icons/io5';
import logo from '../../assets/imgs/logoNav.svg';

const user = {
  userLog: true,
  name: 'Jean',
  lastName: 'Huaman',
  img: 'https://i.pravatar.cc/150?img=4',
};

const Navbar = ({ upper }) => {
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
          {user.userLog && <a href="$">Mi lista</a>}
          <Link to={`/organiza-un-evento`}>
            <p className={`${user.userLog ? style.buttonOrganizar : ''}`}>
              Organiza un evento
            </p>
          </Link>
          {!user.userLog ? (
            <>
              <Link to={`/ingresa`}>
                <p>Ingresa</p>
              </Link>
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
                <p>{user.name}</p>
                <p>{user.lastName}</p>
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
                  <img
                    className={style.userImg}
                    src={user.img}
                    alt="img-user"
                  />
                </div>
                <IoCaretDownSharp className={style.iconMenu} />
                {menuOpen && (
                  <div className={style.containerProfileMenu}>
                    <a href="#">Mis eventos</a>
                    <a href="#">Perfil</a>
                    <a href="#">Plan de referidos</a>
                    <a href="#">Preferencias</a>
                    <hr />
                    <a href="#">Cerrar</a>
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
