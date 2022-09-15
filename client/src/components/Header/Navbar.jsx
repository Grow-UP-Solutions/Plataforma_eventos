import React from 'react';
import logo from '../../assets/imgs/logoNav.svg';
import style from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const heroEl = document.getElementById('hero');

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  console.log({ heroEl });
  return (
    <div className={style.container}>
      <div className={`${style.containerInfo} container`}>
        <img src={logo} alt="LogoNav" onClick={handleClick} />
        <div className={style.container_div}>
          <p>Organiza un evento</p>
          <p>Ingresa</p>
          <span className={style.button}>Registrate</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
