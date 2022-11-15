
import React from 'react';
import style from './ModalComment.module.css';

const ModalComment = ({ closeModal }) => {

  return (
    <div className={style.container}>

      <div className={style.container_close}>
        <span className={style.title}>Reportar</span>
        <span className={style.modal_close} onClick={closeModal}>
          X
        </span>
      </div>
      
      <div className={style.line_div}></div>

      <div className={style.container_texts}>
        <p className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, corrupti! Fuga explicabo consequatur provident ab exercitationem nulla autem cumque, distinctio dolores. Nobis vero magni beatae hic incidunt, minus necessitatibus aspernatur!</p>
      </div>

      <div className={style.container_select}>
        <select defaultValue="default" className={style.select}>
          <option value="default">Tiene contenido inapropiado</option>
          <option value="false">Es una cuenta falsa</option>
          <option value="otra">Pretende ser otra persona / empresa</option>
          <option value="notevents">No realizo el evento programado</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div className={style.container_title}>
        <p>Explique con detalle:</p>
        <textarea name="" id="" cols="70" rows='10'></textarea>
      </div>

      <div className={style.container_button}>
        <button className={style.button_confirm} onClick={closeModal}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ModalComment;
