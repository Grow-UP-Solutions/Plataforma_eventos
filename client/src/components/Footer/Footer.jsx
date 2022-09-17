import React from 'react';
import styles from './Footer.module.css';

import { ImFacebook, ImLinkedin2, ImTwitter, ImYoutube } from 'react-icons/im';
import { logo } from '../../assets/imgs/';

import { FaInstagram, FaTiktok } from 'react-icons/fa';
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
              <Link to="/workWithUs">
                <a href="#">Empleo</a>
              </Link>
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
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ImFacebook className={styles.icons} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaInstagram className={styles.icons} />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ImTwitter className={styles.icons} />
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaTiktok className={styles.icons} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ImYoutube className={styles.icons} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ImLinkedin2 className={styles.icons} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
