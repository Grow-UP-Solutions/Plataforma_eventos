import React, { useState } from 'react';
import Privacy from '../Privacy/Privacy';
import style from './PanelPrivacy.module.css';
import { IoIosArrowForward } from 'react-icons/io';

const PanelPrivacy = () => {

  const [component, setComponent] = useState(<Privacy/>)

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name
    if (name === 'privacy') setComponent(<Privacy />)
    if (name === 'security') setComponent(<Privacy/>)
    if (name === 'tyc') setComponent(<Privacy/>)
  }

  return (
    <div className={style.container}>
      
               
      <div className={style.containerButtons}>

        <div className={style.container_title}>
          <h5 className={style.title}>LEGAL</h5>
        </div>

        <button className={style.button} name='privacy' onClick={handleInput}>
          Privacidad              
          <IoIosArrowForward className={style.icon}/>
        </button>
        <button className={style.button} name='security' onClick={handleInput}>
          Seguridad
          <IoIosArrowForward className={style.icon}/>
        </button>    
        <button className={style.button} name='tyc' onClick={handleInput}>
          Términos y condiciones
          <IoIosArrowForward className={style.icon_1}/>
        </button>
        
      </div> 
             
      <div className={style.containerComponent}>{component}</div>
    </div>
  );
}

export default PanelPrivacy;
