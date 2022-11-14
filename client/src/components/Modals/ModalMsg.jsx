import React from 'react';
import style from './ModalMsg.module.css';

const ModalMsg = ({ closeModal }) => {
  return (
    <div className={style.container}>
      <div className={style.line_div}></div>

      <p className={style.title}>Su mensaje no fue enviado</p>

      <div className={style.container_texts}>
        <p className={style.text}>Este mensaje contiene cierta informacion que no esta permitida, como por</p>
        <p className={style.text}>ejemplo números de teléfono, direcciones de correo, enlaces web, redes</p>
        <p className={style.text}>sociales, etc. Por favor elimina esta información e inténtalo nuevamente.</p>
      </div>

      <div className={style.container_button}>
        <button className={style.button_confirm} onClick={closeModal}>
          Listo
        </button>
      </div>
    </div>
  );
};

export default ModalMsg;
