import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { mail, phone, pin } from '../../assets/imgs';
import eventsApi from '../../axios/eventsApi';
import styles from './Contacto.module.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Contacto = () => {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    city: '',
    phone: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await eventsApi.post('/contact', formData);
      setIsLoading(false);
      setResultMessage({
        success: true,
        message: 'Su mensaje se ha enviado con éxito. Te responderemos en la menor brevedad posible.',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setResultMessage({
        success: false,
        message: 'Se ha producido un error al enviar el formulario. Por favor intentelo de nuevo.',
      });
    }
  };

  return (
    <div className={styles.pageContacto}>
      <h1 className={styles.contactoTitle}>Contáctanos</h1>
      <address className={styles.contactoAddress}>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={pin} alt='pin-icon' />
          <p>Colombia</p>
        </div>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={phone} alt='phone-icon' />
          <p>345 678 98 56</p>
        </div>
        <div className={styles.addressItem}>
          <img className={styles.addressIcon} src={mail} alt='mail-icon' />
          <p>info@loquequierohacer.com</p>
        </div>
      </address>

      <div className={styles.containerForm}>
        <p className={styles.info}>
          ¿Ya visitaste nuestra sección de <Link to={'/preguntas-frecuentes'}>Preguntas Frecuentes</Link>? En ella
          podrás encontrar respuesta a muchas de las preguntas más comunes.
        </p>

        <form action=''>
          <div className={styles.inputContainer}>
            <label htmlFor='name'>Nombre completo:</label>
            <input onChange={handleInputChange} type='text' id='name' placeholder='Carla García Montoya' required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='mail'>Email:</label>
            <input onChange={handleInputChange} type='text' id='mail' placeholder='email@ejemplo.com' required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='city'>Ciudad:</label>
            <input onChange={handleInputChange} type='text' id='city' required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='phone'>Celular (opcional):</label>
            <input onChange={handleInputChange} type='text' id='phone' />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='message'>Mensaje:</label>
            <textarea onChange={handleInputChange} name='message' id='message' cols='30' rows='10' required></textarea>
          </div>

          {isLoading && <AiOutlineLoading3Quarters className={styles.iconLoading} />}

          {resultMessage && !isLoading && (
            <p style={{ color: resultMessage.success ? '#29aa79' : '#d53e27' }} className={styles.resultMessage}>
              {resultMessage.message}
            </p>
          )}

          <div className={styles.containerBtn}>
            <button onClick={sendEmail} className={styles.btnForm}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
