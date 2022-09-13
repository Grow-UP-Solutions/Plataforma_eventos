import React from 'react';

import styles from './Contacto.module.css';

import { pin, phone, mail } from '../../assets/imgs';

const Contacto = () => {
  return (
    <div className={styles.pageContacto}>
      <h1 className={styles.contactoTitle}>Contáctanos</h1>
      <address className={styles.contactoAddress}>
        <div>
          <img src={pin} alt="pin-icon" />
          <p>Colombia</p>
        </div>
        <div>
          <img src={phone} alt="phone-icon" />
          <p>345 678 98 56</p>
        </div>
        <div>
          <img src={mail} alt="mail-icon" />
          <p>info@loquequierohacer.com</p>
        </div>
      </address>
      <div className={styles.containerForm}>
        <p>
          ¿Ya visitaste nuestra sección de Preguntas frecuentes? En ella podrás
          encontrar respuesta a muchas de las preguntas más comunes.
        </p>

        <form action="">
          <div>
            <label htmlFor="name">Nombre completo:</label>
            <input type="text" id="name" placeholder="Carla García Montoya" />
          </div>
          <div>
            <label htmlFor="mail">Email:</label>
            <input type="text" id="mail" placeholder="email@ejemplo.com" />
          </div>
          <div>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" id="city" />
          </div>
          <div>
            <label htmlFor="phone">Celular:</label>
            <input type="text" id="phone" />
          </div>
          <div>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
