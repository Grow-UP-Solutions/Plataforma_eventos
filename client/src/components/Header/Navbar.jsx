import React from 'react';
import logo from '../../assets/imgs/logoNav.svg';
import style from './Navbar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import { GrMail } from 'react-icons/gr';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const user = {
  userLog: false,
  name: 'Jean',
  lastName: 'Huaman',
  img: 'https://i.pravatar.cc/150?img=4',
};

const Navbar = ({ upper }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div
      id="navbar"
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
              <div className={style.containerImg}>
                <img className={style.userImg} src={user.img} alt="img-user" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
