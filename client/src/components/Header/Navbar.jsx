import React from 'react';
import logo from '../../assets/imgs/logoNav.svg';
import style from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className={style.container}>
      <img src={logo} alt="LogoNav" onClick={handleClick}/>
      <div className={style.container_div}>
        <p>Organiza un evento</p>
        <p>Ingresa</p>
        <span className={style.button}>Registrate</span>
      </div>
    </div>
  );
}

export default Navbar;
