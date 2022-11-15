import React, { useContext, useState } from 'react';
import styles from './User.module.css';

import { AuthContext } from '../../context/auth';

import { Calendar } from 'react-date-range';

import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {
  ExpectToAttendUser,
  GoodPracticeOrg,
  MyEventsOrganizer,
  MyListUser,
  PreferencesUser,
  Finance,
  ReferralPlan,
  UserForm,
  Loading,
} from '../../components';

import {
  IconFinances,
  IconEvents,
  IconGuide,
  IconPreferences,
  IconReferred,
  IconUser,
  IconShield,
  IconWarning,
} from '../../assets/Icons';

import { IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useEffect } from 'react';
import eventsApi from '../../axios/eventsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const UserPage = () => {
  const { option } = useParams();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState();
  const [component, setComponent] = useState();
  const [isOpenMenu, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [optionChecked, setOptionChecked] = useState(option);
  const [optionSubMenuChecked, setOptionSubMenuChecked] = useState(option);

  useEffect(() => {
    setComponent(<Loading />);
    getUserData();
    scroll.scrollToTop();
  }, [user]);

  const getUserData = async () => {
    if (user.uid) {
      const userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);

      switch (option) {
        case 'perfil':
          setComponent(<UserForm userData={userResult.data} />);
          break;
        case 'mi-lista':
          setComponent(<MyListUser myFavorites={userResult.data.myFavorites} myEventsBooked={userResult.data.myEventsBooked} />);
          break;
        case 'plan-de-referidos':
          setComponent(<ReferralPlan userData={userResult.data} />);
          break;
        case 'preferencias':
          setComponent(<PreferencesUser userData={userResult.data} />);
          break;
        default:
          setComponent(<UserForm userData={userResult.data} />);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [option]);

  const handleInput = (e) => {
    setOptionChecked(e.target.value);
    setOptionSubMenuChecked('');

    if (e.target.name === 'eventos') {
      setIsMenuOpen(!isOpenMenu);
    } else {
      setIsMenuOpen(false);
    }

    const name = e.target.name;
    /* ORGANIZER */
    if (name === 'Finance') setComponent(<Finance />);
    if (name === 'Guia Del Organizador') setComponent(<GoodPracticeOrg />);

    /* USER */
    if (name === 'Mi lista') {
      setComponent(<MyListUser myFavorites={userData.myFavorites} />);
      navigate('/usuario/mi-lista');
    }

    if (name === 'Perfil') {
      setComponent(<UserForm userData={userData} />);
      navigate('/usuario/perfil');
    }

    if (name === 'Plan de Referidos') {
      setComponent(<ReferralPlan userData={userData} />);
      navigate('/usuario/plan-de-referidos');
    }
    if (name === 'Preferencias') {
      setComponent(<PreferencesUser userData={userData} />);
      navigate('/usuario/preferencias');
    }
  };

  const handleInputSubMenu = (e) => {
    const name = e.target.name;

    setOptionSubMenuChecked(e.target.value);
    if (name === 'Mi lista') setComponent(<MyListUser myFavorites={userData.myFavorites} />);
    if (name === 'Pendientes por Asistir')
      setComponent(<ExpectToAttendUser myEvenstBooked={userData.myEvenstBooked} />);
    if (name === 'Mis Eventos')
      setComponent(<MyEventsOrganizer userData={userData} myEventsCreated={userData.myEventsCreated} />);
  };

  return (
    <div className={`${styles.pageUser} container`}>
      <div className={styles.sideMenu}>
        <ul className={styles.containerListOptionsMenu}>
          {user.organizer && (
            <>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <input
                    type={'checkbox'}
                    value={'finance'}
                    className={styles.btn}
                    name='Finance'
                    id='finance'
                    onChange={handleInput}
                    checked={optionChecked === 'finance' ? true : false}
                  />
                  <label className={styles.labelOption} htmlFor='finance'>
                    Finanzas
                  </label>

                  <IconFinances className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </div>
              </li>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <input
                    type={'checkbox'}
                    value={'guide'}
                    className={styles.btn}
                    name='Guia Del Organizador'
                    id='guide'
                    onChange={handleInput}
                    checked={optionChecked === 'guide' ? true : false}
                  />
                  <label className={styles.labelOption} htmlFor='guide'>
                    Guia Del Organizador
                  </label>

                  <IconGuide className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </div>
              </li>
            </>
          )}

          <li className={`${styles.optionMenu} ${styles.containerMenuEvent}`}>
            <div className={styles.menuEvent}>
              <input
                type={'checkbox'}
                value={'events'}
                className={styles.btn}
                name='eventos'
                id='eventos'
                onChange={handleInput}
                checked={optionChecked === 'events' ? true : false}
              />
              <label className={styles.labelOption} htmlFor='eventos'>
                Eventos
              </label>

              <IconEvents className={styles.iconMenu} />
              {isOpenMenu ? <IoIosArrowDown className={styles.iconEvent} /> : <IoIosArrowUp />}
            </div>

            {isOpenMenu && (
              <ul className={styles.listMenuEvent}>
                <li className={styles.optionMenu}>
                  <input
                    type={'checkbox'}
                    value={'myListEvents'}
                    className={styles.btn}
                    name='Mi lista'
                    id='miList'
                    onChange={handleInputSubMenu}
                    checked={optionSubMenuChecked === 'myListEvents' ? true : false}
                  />
                  <label className={styles.labelOption} htmlFor='miList'>
                    Mi lista
                  </label>
                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                <li className={styles.optionMenu}>
                  <input
                    type={'checkbox'}
                    value={'eventsForAssist'}
                    className={styles.btn}
                    name='Pendientes por Asistir'
                    id='pendientes'
                    onChange={handleInputSubMenu}
                    checked={optionSubMenuChecked === 'eventsForAssist' ? true : false}
                  />
                  <label className={styles.labelOption} htmlFor='pendientes'>
                    Pendientes por Asistir
                  </label>

                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                {user.organizer && (
                  <>
                    <li className={styles.optionMenu}>
                      <button className={styles.btn} name='Mis Eventos' onClick={handleInputSubMenu}>
                        Mis Eventos
                      </button>

                      <input
                        type={'checkbox'}
                        value={'myEvents'}
                        className={styles.btn}
                        name='Mis Eventos'
                        id='myEvents'
                        onChange={handleInputSubMenu}
                        checked={optionSubMenuChecked === 'myEvents' ? true : false}
                      />
                      <label className={styles.labelOption} htmlFor='myEvents'>
                        Mis Eventos
                      </label>

                      <IconEvents className={styles.iconMenu} />
                      <IoIosArrowForward className={styles.iconArrow} />
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>

          <li className={styles.containerItemOptionMenu}>
            <div className={styles.optionMenu}>
              <input
                type={'checkbox'}
                value={'perfil'}
                className={styles.btn}
                name='Perfil'
                id='perfil'
                onChange={handleInput}
                checked={optionChecked === 'perfil' ? true : false}
              />
              <label className={styles.labelOption} htmlFor='perfil'>
                Perfil
              </label>
              <IconUser className={styles.iconMenu} />
              <div className={styles.perfilStatus}>
                {user.isProfileCompleted ? (
                  <>
                    <IconShield />
                    <span>Completo</span>
                  </>
                ) : (
                  <>
                    <IconWarning />
                    <span>Incompleto</span>
                  </>
                )}
              </div>
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
          <li className={styles.containerItemOptionMenu}>
            <div className={styles.optionMenu}>
              <button className={styles.btn} name='Plan de Referidos' onClick={handleInput}>
                Plan de Referidos
              </button>

              <input
                type={'checkbox'}
                value={'plan-de-referidos'}
                className={styles.btn}
                name='Plan de Referidos'
                id='plan-de-referidos'
                onChange={handleInput}
                checked={optionChecked === 'plan-de-referidos' ? true : false}
              />
              <label className={styles.labelOption} htmlFor='plan-de-referidos'>
                Plan de Referidos
              </label>

              <IconReferred className={styles.iconMenu} />
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
          <li className={styles.containerItemOptionMenu}>
            <div className={styles.optionMenu}>
              <button className={styles.btn} name='Preferencias' onClick={handleInput}>
                Preferencias
              </button>

              <input
                type={'checkbox'}
                value={'preferencias'}
                className={styles.btn}
                name='Preferencias'
                id='preferencias'
                checked={optionChecked === 'preferencias' ? true : false}
                onChange={handleInput}
              />
              <label className={styles.labelOption} htmlFor='preferencias'>
                Preferencias
              </label>

              <IconPreferences className={styles.iconMenu} />
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
        </ul>

        {/* CALENDAR */}

        <div className={styles.menuCalendar}>
          <span className={styles.titleCalendar}>Mi calendario</span>
          <Calendar
            color={'#D53E27'}
            locale={locales['es']}
            date={date}
            onChange={(date) => setDate(date)}
            className={styles.myCalendar}
          />
          <div className={styles.calendarDetails}>
            <div className={styles.pendingEvents}>
              <div />
              <p>Eventos pendientes por asistir</p>
            </div>
            <div className={styles.publicEvents}>
              <div />
              <p>Eventos publicados</p>
            </div>
          </div>
        </div>
      </div>

      <div>{component}</div>
    </div>
  );
};

export default UserPage;
