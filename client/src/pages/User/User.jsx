import React, { useState } from 'react';
import styles from './User.module.css';
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

import {
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosArrowDown,
} from 'react-icons/io';

const user = {
  isUserComplete: true,
  isOrganizer: true,
};

const User = () => {
  const [date, setDate] = useState();

  const [component, setComponent] = useState(<UserForm />);

  const [isOpenMenu, setIsMenuOpen] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    if (name === 'Finance') setComponent(<Finance />);
    if (name === 'Guia Del Organizador') setComponent(<GoodPracticeOrg />);
    if (name === 'Mi lista') setComponent(<MyListUser />);
    if (name === 'Pendientes por Asistir') setComponent(<ExpectToAttendUser />);
    if (name === 'Mis Eventos') setComponent(<MyEventsOrganizer />);
    if (name === 'Perfil') setComponent(<UserForm />);
    if (name === 'Plan de Referidos') setComponent(<ReferralPlan />);
    if (name === 'Preferencias') setComponent(<PreferencesUser />);
  };

  return (
    <div className={`${styles.pageUser} container`}>
      <div className={styles.sideMenu}>
        <ul className={styles.containerListOptionsMenu}>
          {user.isOrganizer && (
            <>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <button
                    className={styles.btn}
                    name="Finance"
                    onClick={handleInput}
                  >
                    Finanzas
                  </button>
                  <IconFinances className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </div>
              </li>
              <li className={styles.containerItemOptionMenu}>
                <div className={styles.optionMenu}>
                  <button
                    className={styles.btn}
                    name="Guia Del Organizador"
                    onClick={handleInput}
                  >
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
              <button
                className={styles.btn}
                onClick={() => setIsMenuOpen(!isOpenMenu)}
              >
                Eventos
              </button>
              <IconEvents className={styles.iconMenu} />
              {isOpenMenu ? (
                <IoIosArrowDown className={styles.iconEvent} />
              ) : (
                <IoIosArrowUp />
              )}
            </div>

            {isOpenMenu && (
              <ul className={styles.listMenuEvent}>
                <li className={styles.optionMenu}>
                  <button
                    className={styles.btn}
                    name="Mi lista"
                    onClick={handleInput}
                  >
                    Mi lista
                  </button>
                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                <li className={styles.optionMenu}>
                  <button
                    className={styles.btn}
                    name="Pendientes por Asistir"
                    onClick={handleInput}
                  >
                    Pendientes por Asistir
                  </button>
                  <IconEvents className={styles.iconMenu} />
                  <IoIosArrowForward className={styles.iconArrow} />
                </li>
                {user.isOrganizer && (
                  <>
                    <li className={styles.optionMenu}>
                      <button
                        className={styles.btn}
                        name="Mis Eventos"
                        onClick={handleInput}
                      >
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
              <button
                className={styles.btn}
                name="Perfil"
                onClick={handleInput}
              >
                Perfil
              </button>
              <IconUser className={styles.iconMenu} />
              <div className={styles.perfilStatus}>
                {user.isUserComplete ? (
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
              <button
                className={styles.btn}
                name="Plan de Referidos"
                onClick={handleInput}
              >
                Plan de Referidos
              </button>
              <IconReferred className={styles.iconMenu} />
              <IoIosArrowForward className={styles.iconArrow} />
            </div>
          </li>
          <li className={styles.containerItemOptionMenu}>
            <div className={styles.optionMenu}>
              <button
                className={styles.btn}
                name="Preferencias"
                onClick={handleInput}
              >
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

export default User;
