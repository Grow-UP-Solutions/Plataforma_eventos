import React from 'react';
import style from './ModalMsg.module.css';

const ModalMsg = ({ closeModal }) => {
  return (
    <div className={style.container}>
      <p className={style.modal_close} onClick={closeModal}>
        X
      </p>

      <div className={style.line_div}></div>

      <p className={style.title}>Su mensaje no fue enviado</p>

      <div className={style.container_texts}>
        <p className={style.text}>Este mensaje contiene cierta informacion que no esta permitida, como por ejemplo</p>
        <p className={style.text}>números de teléfono, direcciones de correo, enlaces web, palabras inadecuadas,</p>
        <p className={style.text}>redes sociales, etc. Por favor elimina esta información e inténtalo nuevamente.</p>
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
