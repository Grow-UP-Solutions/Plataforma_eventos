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

const UserPage = () => {

  const { option } = useParams();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState();
  const [component, setComponent] = useState();
  const [isOpenMenu, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    if (user.uid) {
      const userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);

      switch (option) {
        case 'datos':
          setComponent(<UserForm userData={userResult.data} />);
          break;
        case 'mi-lista':
          setComponent(<MyListUser myFavorites={userResult.data.myFavorites} />);
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
    const name = e.target.name;
    /* ORGANIZER */
    if (name === 'Finance') setComponent(<Finance />);
    if (name === 'Guia Del Organizador') setComponent(<GoodPracticeOrg />);

    /* USER */
    if (name === 'Mi lista') {
      setComponent(<MyListUser myFavorites={userData.myFavorites} />);
      navigate('/usuario/mi-lista');
    }
    if (name === 'Pendientes por Asistir')
      setComponent(<ExpectToAttendUser myEvenstBooked={userData.myEvenstBooked} />);
    if (name === 'Mis Eventos')
      setComponent(<MyEventsOrganizer userData={userData} myEventsCreated={userData.myEventsCreated} />);
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

  return (
    <div className={`${styles.pageUser} container`}>
      <div className={styles.sideMenu}>
        <ul className={styles.containerListOptionsMenu}>
          {user.organizer && (
            <>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <button className={styles.btn} name='Finance' onClick={handleInput}>
                    Finanzas
                  </button>
                  <IconFinances className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </div>
              </li>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <button className={styles.btn} name='Guia Del Organizador' onClick={handleInput}>
                    Guia Del Organizador
                  </button>
                  <IconGuide className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </div>
              </li>
            </>
          )}

          <li className={`${styles.optionMenu} ${styles.containerMenuEvent}`}>
            <div className={styles.menuEvent}>
              <button className={styles.btn} onClick={() => setIsMenuOpen(!isOpenMenu)}>
                Eventos
              </button>
              <IconEvents className={styles.iconMenu} />
              {isOpenMenu ? <IoIosArrowDown className={styles.iconEvent} /> : <IoIosArrowUp />}
            </div>

            {isOpenMenu && (
              <ul className={styles.listMenuEvent}>
                <li className={styles.optionMenu}>
                  <button className={styles.btn} name='Mi lista' onClick={handleInput}>
                    Mi lista
                  </button>
                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                <li className={styles.optionMenu}>
                  <button className={styles.btn} name='Pendientes por Asistir' onClick={handleInput}>
                    Pendientes por Asistir
                  </button>
                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                {user.organizer && (
                  <>
                    <li className={styles.optionMenu}>
                      <button className={styles.btn} name='Mis Eventos' onClick={handleInput}>
                        Mis Eventos
                      </button>
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
              {' '}
              <button className={styles.btn} name='Perfil' onClick={handleInput}>
                Perfil
              </button>
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
              <IconReferred className={styles.iconMenu} />
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
          <li className={styles.containerItemOptionMenu}>
            <div className={styles.optionMenu}>
              <button className={styles.btn} name='Preferencias' onClick={handleInput}>
                Preferencias
              </button>
              <IconPreferences className={styles.iconMenu} />
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
        </ul>
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
