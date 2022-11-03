
import React from 'react';
import style from './Modal.module.css';

const Modal = ({ children, isOpen, closeModal }) => {

  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`${style.modal} ${isOpen && style.is_open}`} onClick={closeModal}>
      <div className={style.modal_container} onClick={handleModalContainerClick}>
        
        <p className={style.modal_close} onClick={closeModal}>
          X
        </p>

        {children}
      
      </div>
    </article>
  );
}

export default Modal;
