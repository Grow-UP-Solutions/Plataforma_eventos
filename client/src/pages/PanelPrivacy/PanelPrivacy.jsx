import React, { useContext, useEffect, useState } from 'react';
import Privacy from '../../components/Privacy/Privacy';
import style from './PanelPrivacy.module.css';
import { IoIosArrowForward } from 'react-icons/io';
import { animateScroll as scroll } from 'react-scroll';
import Security from '../../components/Security/Security';
import Terms from '../../components/Terms/Terms';
import { stateContext } from '../../context/state/stateContext';

const PanelPrivacy = () => {

  const { result } = useContext(stateContext);
  const [component, setComponent] = useState(null);
  const [clickOne, setClickOne] = useState(false);
  const [clickTwo, setClickTwo] = useState(true);
  const [color, setColor] = useState(result);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    if (result === 'privacy') {
      setComponent(<Privacy />);
      setColor('privacy');
    }
    if (result === 'security') {
      setComponent(<Security />);
      setColor('security');
    }
    if (result === 'tyc') {
      setComponent(<Terms />);
      setColor('tyc');
    }
    else {
      console.log('fotter');
    }
  }, [result]);

  const handleClickOne = (e) => {
    e.preventDefault();
    setClickOne(!clickOne);
    setClickTwo(!clickTwo);
    if(clickOne === true) setClickOne(true);
    if(clickTwo === false) setClickTwo(false);
  } 

  const handleClickTwo = (e) => {
    e.preventDefault();
    setClickTwo(!clickTwo);
    setClickOne(!clickOne);
    if(clickTwo === true) setClickTwo(true);
    if(clickOne === false) setClickOne(false);
  }

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name
    if (name === 'privacy') {
      setComponent(<Privacy />);
      setColor('privacy');
    }
    if (name === 'security') {
      setComponent(<Security />);
      setColor('security');
    }
    if (name === 'tyc') {
      setComponent(<Terms />);
      setColor('tyc');
    }
    else {
      console.log('fotter');
    }
  }

  return (
    <div className={style.container}>
              
      <div className={style.containerButtons}>

        <div className={style.container_title}>
          <h5 className={style.title}>LEGAL</h5>
        </div>
        
        <button className={color === 'privacy' ? style.button_c : style.button} name='privacy' onClick={handleInput} >
          Privacidad              
          <IoIosArrowForward className={style.icon}/>
        </button>
        
        <button className={color === 'security' ? style.button_c : style.button} name='security' onClick={handleInput} >
          Seguridad
          <IoIosArrowForward className={style.icon}/>
        </button> 
       
        <button className={color === 'tyc' ? style.button_c : style.button} name='tyc' onClick={handleInput} >
          Términos y condiciones
          <IoIosArrowForward className={style.icon_1}/>
        </button>
        
      </div> 
             
      <div className={style.containerComponent}>

        <div className={style.container_box}>
          
          <span 
            onClick={handleClickOne}
            className={`${clickOne ? style.box_event : style.box1}`}
          >
            Organizador
          </span>

          <span className={style.hidden}></span>
          
          <span 
            onClick={handleClickTwo}
            className={`${clickTwo ? style.box_event : style.box2}`}
          >
            Usuario
          </span> 
        
        </div>

        {
          component
        }

      </div>
    </div>
  );
}

export default PanelPrivacy;
