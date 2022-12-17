import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import Privacy from '../../components/Privacy/Privacy';
import Security from '../../components/Security/Security';
import Terms from '../../components/Terms/Terms';
import style from './PanelPrivacy.module.css';

const PanelPrivacy = () => {
  const [component, setComponent] = useState(null);
  const { section, typeUser } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    if (typeUser === 'usuario') {
      if (section === 'privacidad') {
        setComponent(<Privacy info={typeUser} />);
      } else if (section === 'seguridad') {
        setComponent(<Security info={typeUser} />);
      } else if (section === 'terminos-condiciones') {
        setComponent(<Terms info={typeUser} />);
      }
    } else if (typeUser === 'organizador') {
      if (section === 'privacidad') {
        setComponent(<Privacy info={typeUser} />);
      } else if (section === 'seguridad') {
        setComponent(<Security info={typeUser} />);
      } else if (section === 'terminos-condiciones') {
        setComponent(<Terms info={typeUser} />);
      }
    } else {
      navigate('/');
    }
  }, [section, typeUser]);

  const handleInputSection = (e) => {
    const id = e.target.id;
    navigate(`/docs/${id}/${typeUser}`);
  };

  const handleInputTypeUser = (e) => {
    const id = e.target.id;
    navigate(`/docs/${section}/${id}`);
  };

  return (
    <div className={`${style.container} container`}>
      <div className={style.containerButtons}>
        <div className={style.container_title}>
          <h5 className={style.title}>LEGAL</h5>
        </div>

        <div className={style.containerButtonsSection}>
          <input onChange={handleInputSection} type='checkbox' checked={section === 'privacidad'} id='privacidad' />
          <label htmlFor='privacidad'>Privacidad</label>
          <IoIosArrowForward className={style.icon} />
        </div>

        <div className={style.containerButtonsSection}>
          <input onChange={handleInputSection} type='checkbox' checked={section === 'seguridad'} id='seguridad' />
          <label htmlFor='seguridad'>Seguridad</label>
          <IoIosArrowForward className={style.icon} />
        </div>

        <div className={style.containerButtonsSection}>
          <input
            onChange={handleInputSection}
            type='checkbox'
            checked={section === 'terminos-condiciones'}
            id='terminos-condiciones'
          />
          <label htmlFor='terminos-condiciones'>Términos y condiciones</label>
          <IoIosArrowForward className={style.icon} />
        </div>
      </div>

      <div className={style.containerComponent}>
        <div className={style.container_box}>
          <div className={style.containerButtonTypeUser}>
            <input
              onChange={handleInputTypeUser}
              type='checkbox'
              checked={typeUser === 'organizador'}
              id='organizador'
            />
            <label htmlFor='organizador'>Organizador</label>
          </div>
          <span className={style.hidden}></span>
          <div className={style.containerButtonTypeUser}>
            <input onChange={handleInputTypeUser} type='checkbox' checked={typeUser === 'usuario'} id='usuario' />
            <label htmlFor='usuario'>Usuario</label>
          </div>
        </div>

        {component}
      </div>

      <div className={style.containerResponsive}>
        <div className={style.containerButtonsResponsive}>
          <div className={style.containerResponsiveButtonTypeUser}>
            <input checked={typeUser === 'usuario'} type='checkbox' id='usuario' onChange={handleInputTypeUser} />
            <label htmlFor='usuario'>Usuario</label>
          </div>
          <div className={style.containerResponsiveButtonTypeUser}>
            <input
              checked={typeUser === 'organizador'}
              type='checkbox'
              id='organizador'
              onChange={handleInputTypeUser}
            />
            <label htmlFor='organizador'>Organizador</label>
          </div>
        </div>

        <div className={style.containerInfoLegal}>
          <Terms info={typeUser} />
          <Privacy info={typeUser} />
          <Security info={typeUser} />
        </div>
      </div>
    </div>
  );
};

export default PanelPrivacy;
