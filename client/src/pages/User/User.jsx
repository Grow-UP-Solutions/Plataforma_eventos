import React, { useState } from 'react';

import styles from './User.module.css';

import { Calendar, DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Finance from '../../components/Finance/Finance';
import GoodPracticeOrg from '../../components/GoodPracticeOrg/GoodPracticeOrg';
import PreferencesOrg from '../../components/PreferencesOrg/PreferencesOrg';
import PreferencesUser from '../../components/PreferencesUser/PreferencesUser';
import MyListOrganizer from '../../components/MyListOrganizer/MyListOrganizer';
import MyListUser from '../../components/MyListUser/MyListUser';
import ExpectToAttendUser from '../../components/ExpectToAttendUser/ExpectToAttendUser';
import MyEventsOrganizer from '../../components/MyEventsOrganizer/MyEventsOrganizer'
import Events from '../../components/Events/Events';

import {
  iconFinances,
  iconGuideForOrganizer,
  iconSettings,
  iconUser,
  iconCalendarEvents,
  iconTicket,
  iconShield,
  iconWarning,
  iconArrowRight,
  iconArrowLeft,
} from '../../assets/imgs';

import { ReferralPlan, UserForm } from '../../components';

const user = {
  isUserComplete: true,
  isOrganizer: true,
};

const User = () => {
  const [date, setDate] = useState();


const [component, setComponent] = useState('');

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
        <ul className={styles.containerOptionMenu}>
          {user.isOrganizer && (
            <>
              <li className={styles.optionMenu}>
                <img src={iconFinances} alt="icon-alt" />
                <span>
                <button
                  className={styles.btn}
                  name="Finance"
                  onClick={handleInput}
                  >
                  Finanzas
                </button>
                </span>
              </li>
              <li className={styles.optionMenu}>
                <img src={iconGuideForOrganizer} alt="icon-alt" />
                <span>
                <button
                  className={styles.btn}
                  name="Guia Del Organizador"
                  onClick={handleInput}
                  >
                  Guia Del Organizador
                </button>
                </span>
              </li>
            </>
          )}
          <li className={styles.optionMenu}>
            <img src={iconCalendarEvents} alt="icon-alt" />
            <span>Eventos</span>
            <img src={iconArrowRight} alt="icon-alt" />
          </li>
          <li className={styles.optionMenu}>
            <img src={iconCalendarEvents} alt="icon-alt" />
            <span> 
              <button
                  className={styles.btn}
                  name="Mi lista"
                  onClick={handleInput}
                  >
                  Mi lista
                </button>
            </span>
            <img src={iconArrowRight} alt="icon-alt" />
          </li>
          <li className={styles.optionMenu}>
            <img src={iconCalendarEvents} alt="icon-alt" />
            <span> 
              <button
                  className={styles.btn}
                  name="Pendientes por Asistir"
                  onClick={handleInput}
                  >
                  Pendientes por Asistir
                </button>
            </span>
            <img src={iconArrowRight} alt="icon-alt" />
          </li>
          {user.isOrganizer && (
            <>
            <li className={styles.optionMenu}>
            <img src={iconCalendarEvents} alt="icon-alt" />
            <span> 
              <button
                  className={styles.btn}
                  name='Mis Eventos'
                  onClick={handleInput}
                  >
                  Mis Eventos
                </button>
            </span>
            <img src={iconArrowRight} alt="icon-alt" />
          </li>
              
            </>
          )}
          
          <li className={styles.optionMenu}>
            <img src={iconUser} alt="icon-alt" />
            <span>
                <button
                  className={styles.btn}
                  name="Perfil"
                  onClick={handleInput}
                  >
                  Perfil
                </button>
             </span>
            <div className={styles.perfilStatus}>
              {user.isUserComplete ? (
                <>
                  <img src={iconShield} alt="icon-alt" />
                  <span>Completo</span>
                </>
              ) : (
                <>
                  <img src={iconWarning} alt="icon-alt" />
                  <span>Incompleto</span>
                </>
              )}
            </div>
          </li>
          <li className={styles.optionMenu}>
            <img src={iconTicket} alt="icon-alt" />
            <span>
                <button
                  className={styles.btn}
                  name="Plan de Referidos"
                  onClick={handleInput}
                  >
                  Plan de Referidos
                </button>
             </span>
          </li>
          <li className={styles.optionMenu}>
            <img src={iconSettings} alt="icon-alt" />
            <span>
                <button
                  className={styles.btn}
                  name="Preferencias"
                  onClick={handleInput}
                  >
                  Preferencias
                </button>
                </span>
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
      {/* TODO */}
      {/* <UserForm /> */}
      <div>{component}</div>
    </div>
  );
};

export default User;
