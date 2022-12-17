import React, { useContext } from 'react';
import styles from './Footer.module.css';
import { ImFacebook, ImLinkedin2, ImTwitter, ImYoutube } from 'react-icons/im';
import { logo } from '../../assets/imgs/';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { animateScroll as scroll } from 'react-scroll';
import { stateContext } from '../../context/state/stateContext';

const Footer = () => {
  const { setResult } = useContext(stateContext);

  const handleClickToTop = (e) => {
    e.preventDefault();
    scroll.scrollToTop();
  };

  return (
    <div className={styles.footer}>
      <ExpandLessIcon className={styles.arrow} sx={{ fontSize: 35 }} onClick={handleClickToTop} />

      <img src={logo} alt='logo-empresa' className={styles.footerImg} />

      <div className={styles.footerItems}>
        <div className={styles.footerGridItems}>
          <div className={styles.footerList}>
            <p className={styles.titleList}>Empresa</p>
            <ul>
              <li>
                <Link to='/empleo'>
                  <a>Empleo</a>
                </Link>
              </li>
              <li>
                <Link to={'/noticias'}>
                  <a>Noticias</a>
                </Link>
              </li>
              <li>
                <Link to={'/prensa'}>
                  <a>Prensa</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <p className={styles.titleList}>Legal</p>
            <ul>
              <li>
                <Link to={'/docs/privacidad/usuario'}>
                  <a>Privacidad</a>
                </Link>
              </li>
              <li>
                <Link to={'/docs/seguridad/usuario'}>
                  <a>Seguridad</a>
                </Link>
              </li>
              <li>
                <Link to={'/docs/terminos-condiciones/usuario'}>
                  <a>Términos y condiciones</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <p className={styles.titleList}>Ayuda</p>
            <ul>
              <li>
                <Link to={'/contactanos'}>Contáctanos</Link>
              </li>
              <li>
                <Link to={'/preguntas-frecuentes'}>Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>
          <ExpandLessIcon className={styles.arrowButtonGrid} sx={{ fontSize: 35 }} onClick={handleClickToTop} />
        </div>
        <div className={styles.separationBar} />
        <div className={styles.footerSocial}>
          <p className={styles.titleSocial}>Siguenos</p>
          <ul className={styles.listSocial}>
            <li>
              <a href='https://www.facebook.com/' target='_blank' rel='noreferrer noopener'>
                <ImFacebook className={styles.icons} />
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/' target='_blank' rel='noreferrer noopener'>
                <FaInstagram className={styles.icons} />
              </a>
            </li>
            <li>
              <a href='https://www.twitter.com/' target='_blank' rel='noreferrer noopener'>
                <ImTwitter className={styles.icons} />
              </a>
            </li>
            <li>
              <a href='https://www.tiktok.com/' target='_blank' rel='noreferrer noopener'>
                <FaTiktok className={styles.icons} />
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/' target='_blank' rel='noreferrer noopener'>
                <ImYoutube className={styles.icons} />
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer noopener'>
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
