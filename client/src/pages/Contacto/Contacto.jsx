import React, { useEffect } from 'react';
import styles from './Contacto.module.css';
import { pin, phone, mail } from '../../assets/imgs';
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';

const Contacto = () => {

  useEffect(() => {
    scroll.scrollToTop()
  }, []);

  return (
    <div className={styles.pageContacto}>
      <h1 className={styles.contactoTitle}>Contáctanos</h1>
      <address className={styles.contactoAddress}>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={pin} alt="pin-icon" />
          <p>Colombia</p>
        </div>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={phone} alt="phone-icon" />
          <p>345 678 98 56</p>
        </div>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={mail} alt="mail-icon" />
          <p>info@loquequierohacer.com</p>
        </div>
      </address>
      <div className={styles.containerForm}>
        <p className={styles.info}>
          ¿Ya visitaste nuestra sección de <Link to={'/faq'}><a href="#"> Preguntas frecuentes</a></Link> 
          ? En ella podrás encontrar respuesta a muchas de las preguntas más
          comunes.
        </p>

        <form action="">
          <div className={styles.inputContainer}>
            <label htmlFor="name">Nombre completo:</label>
            <input
              type="text"
              id="name"
              placeholder="Carla García Montoya"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="mail">Email:</label>
            <input
              type="text"
              id="mail"
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" id="city" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="phone">Celular (opcional):</label>
            <input type="text" id="phone" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              required
            ></textarea>
          </div>
          <div className={styles.containerBtn}>
            <button className={styles.btnForm} type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
