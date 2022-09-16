import React from 'react';
import styles from './Footer.module.css';

import { logo } from '../../assets/imgs/';
import { ImFacebook, ImTwitter, ImYoutube, ImLinkedin2 } from 'react-icons/im';

import { FaTiktok, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
     
        <img src={logo} alt="logo-empresa" className={styles.footerImg} />
      
      <div className={styles.footerItems}>
        <div className={styles.footerList}>
          <p className={styles.titleList}>Empresa</p>
          <ul>
            <li>
              <a href="#">Empleo</a>
            </li>
            <li>
              <a href="#">Noticias</a>
            </li>
            <li>
              <a href="#">Prensa</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerList}>
          <p className={styles.titleList}>Legal</p>
          <ul>
            <li>
              <a href="#">Privacidad</a>
            </li>
            <li>
              <a href="#">Seguridad</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerList}>
          <p className={styles.titleList}>Ayuda</p>
          <ul>
            <li>
              <Link to={'/contactanos'}>
                <a href="#">Contáctanos</a>
              </Link>
            </li>
            <li>
              <a href="#">Preguntas Frecuentes</a>
            </li>
          </ul>
        </div>
        <div className={styles.separationBar} />
        <div className={styles.footerSocial}>
          <p className={styles.titleSocial}>Siguenos</p>
          <ul className={styles.listSocial}>
            <li>
              <ImFacebook className={styles.icons} />
            </li>
            <li>
              <FaInstagram className={styles.icons} />
            </li>
            <li>
              <ImTwitter className={styles.icons} />
            </li>
            <li>
              <FaTiktok className={styles.icons} />
            </li>
            <li>
              <ImYoutube className={styles.icons} />
            </li>
            <li>
              <ImLinkedin2 className={styles.icons} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
