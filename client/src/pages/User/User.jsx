import React, { useState } from 'react';

import styles from './User.module.css';

import { Calendar, DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
  isOrganizer: false,
};

const User = () => {
  const [date, setDate] = useState();

  return (
    <div className={`${styles.pageUser} container`}>
      <div className={styles.sideMenu}>
        <ul className={styles.containerOptionMenu}>
          {user.isOrganizer && (
            <>
              <li className={styles.optionMenu}>
                <img src={iconFinances} alt="icon-alt" />
                <span>Finanzas</span>
              </li>
              <li className={styles.optionMenu}>
                <img src={iconGuideForOrganizer} alt="icon-alt" />
                <span>Guía del organizador</span>
              </li>
            </>
          )}
          <li className={styles.optionMenu}>
            <img src={iconCalendarEvents} alt="icon-alt" />
            <span>Eventos</span>
            <img src={iconArrowRight} alt="icon-alt" />
          </li>
          <li className={styles.optionMenu}>
            <img src={iconUser} alt="icon-alt" />
            <span>Perfil</span>
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
            <span>Plan de referidos</span>
          </li>
          <li className={styles.optionMenu}>
            <img src={iconSettings} alt="icon-alt" />
            <span>Preferencias</span>
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
      <ReferralPlan />
    </div>
  );
};

export default User;
