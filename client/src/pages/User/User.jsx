import React, { useContext, useState } from 'react';
import styles from './User.module.css';

import { AuthContext } from '../../context/auth';

import { Calendar } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { myCustomLocale } from '../../utils/customLocaleDate';

import {
  ExpectToAttendUser,
  Finance,
  GoodPracticeOrg,
  Loading,
  MessagesResponsive,
  MyEventsOrganizer,
  MyListUser,
  PreferencesUser,
  ReferralPlan,
  UserForm,
} from '../../components';

import {
  IconEvents,
  IconFinances,
  IconGuide,
  IconPreferences,
  IconReferred,
  IconShield,
  IconUser,
  IconWarning,
} from '../../assets/Icons';

import { useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import { UIContext } from '../../context/ui';
import eventDateToCalendarFormat from '../../utils/checkDatesInCalendar';

const UserPage = () => {
  const { option } = useParams();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState();
  const [component, setComponent] = useState();
  const [isOpenMenu, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [optionChecked, setOptionChecked] = useState(option);
  const [optionSubMenuChecked, setOptionSubMenuChecked] = useState(option);
  const [load, setLoad] = useState(true);
  const [datesForCalendar, setDatesForCalendar] = useState([]);
  const { setGetFav } = useContext(UIContext);

  useEffect(() => {
    getUserData();
    scroll.scrollToTop();
  }, [user]);

  useEffect(() => {
    if (userData) formatDatesToCalendarComponent();
  }, [userData]);

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  useEffect(() => {
    if (window.innerWidth <= 756) return setWidthScreen(756);
  }, [window.innerWidth]);

  window.onresize = function() {
    if (window.innerWidth <= 756) return setWidthScreen(756);
  };

  const formatDatesToCalendarComponent = () => {
    const totalDatesToCalendar = eventDateToCalendarFormat(userData);
    setDatesForCalendar(totalDatesToCalendar);
  };

  const getUserData = async () => {
    if (user.uid) {
      setComponent(<Loading />);

      const userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);
      const json = userResult.data.myFavorites;

      switch (option) {
        case 'perfil':
          setOptionChecked('perfil');
          setOptionSubMenuChecked('');
          setComponent(<UserForm userData={userResult.data} />);
          break;
        case 'mi-lista':
          if (widthScreen <= 756) {
            console.log({ widthTest: widthScreen });
            setOptionChecked('eventos');
            setGetFav(json);
          } else {
            console.log({ widthTestElse: widthScreen });

            setOptionChecked('eventos');
            setIsMenuOpen(true);
            setOptionSubMenuChecked('myListEvents');
            setGetFav(json);
          }

          setComponent(
            <MyListUser myFavorites={userResult.data.myFavorites} myEventsBooked={userResult.data.myEventsBooked} />
          );
          break;
        case 'pendientes-asistir':
          if (widthScreen <= 756) {
            console.log({ widthTest: widthScreen });
            setOptionChecked('eventos');
          } else {
            console.log({ widthTestElse: widthScreen });

            setOptionChecked('eventos');
            setIsMenuOpen(true);
            setOptionSubMenuChecked('eventsForAssist');
          }
          setComponent(<ExpectToAttendUser myEventsBooked={userResult.data.myEventsBooked} />);
          break;
        case 'mis-eventos':
          if (widthScreen <= 756) {
            setOptionChecked('eventos');
          } else {
            setOptionChecked('eventos');
            setIsMenuOpen(true);
            setOptionSubMenuChecked('myEvents');
          }
          setComponent(
            <MyEventsOrganizer userData={userResult.data} myEventsCreated={userResult.data.myEventsCreated} />
          );
          break;
        case 'plan-de-referidos':
          setOptionChecked('plan de referidos');
          setOptionSubMenuChecked('');
          setComponent(<ReferralPlan userData={userResult.data} />);
          break;
        case 'preferencias':
          setOptionChecked('preferencias');
          setOptionSubMenuChecked('');
          setComponent(<PreferencesUser userData={userResult.data} />);
          break;
        case 'finanzas':
          setOptionChecked('finance');
          setOptionSubMenuChecked('');
          setComponent(<Finance userData={userResult.data} />);
          break;
        case 'guia-organizador':
          setOptionChecked('guide');
          setOptionSubMenuChecked('');
          setComponent(<GoodPracticeOrg />);
          break;
        case 'mensajes':
          console.log({ option });
          setComponent(<MessagesResponsive />);
          break;
        default:
          setComponent(<UserForm userData={userResult.data} />);
      }
      setLoad(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [option]);

  const handleInput = (e, iconValue) => {
    setOptionChecked(e.target.value || iconValue.toLowerCase());
    setOptionSubMenuChecked('');

    if (e.target.name === 'eventos' || iconValue === 'eventos') {
      setIsMenuOpen(!isOpenMenu);
      return setOpenMenuResponsive(true);
    } else {
      setIsMenuOpen(false);
    }

    setOpenMenuResponsive(false);

    const name = e.target.name;
    /* ORGANIZER */
    if (name === 'Finance' || iconValue === 'Finance') navigate('/usuario/finanzas');
    if (name === 'Guia Del Organizador' || iconValue === 'Guia del Organizador') navigate('/usuario/guia-organizador');

    /* USER */
    if (name === 'Mi lista' || iconValue === 'Mi lista') {
      // setComponent(<MyListUser myFavorites={userData.myFavorites} myEventsBooked={userData.myEventsBooked} />);
      navigate('/usuario/mi-lista');
    }

    if (name === 'Pendientes por Asistir' || iconValue === 'Pendientes por Asistir') {
      // setComponent(<ExpectToAttendUser myFavorites={userData.myFavorites} myEventsBooked={userData.myEventsBooked} />);
      navigate('/usuario/pendientes-asistir');
    }

    if (name === 'Perfil' || iconValue === 'Perfil') {
      // setComponent(<UserForm userData={userData} />);
      navigate('/usuario/perfil');
    }
    if (name === 'Mensajes' || iconValue === 'Mensajes') {
      navigate('/usuario/mensajes');
    }
    if (name === 'Plan de Referidos' || iconValue === 'Plan de Referidos') {
      // setComponent(<ReferralPlan userData={userData} />);
      navigate('/usuario/plan-de-referidos');
    }
    if (name === 'Preferencias' || iconValue === 'Preferencias') {
      // setComponent(<PreferencesUser userData={userData} />);
      navigate('/usuario/preferencias');
    }
  };

  const handleInputSubMenu = (e) => {
    const name = e.target.name;
    if (widthScreen <= 756) {
      setOptionSubMenuChecked('');
      setIsMenuOpen(false);
    } else {
      setOptionSubMenuChecked(e.target.value);
    }

    setOpenMenuResponsive(false);

    if (name === 'Pendientes por Asistir') navigate('/usuario/pendientes-asistir');
    if (name === 'Mi lista') navigate('/usuario/mi-lista');
    if (name === 'Mis Eventos') navigate('/usuario/mis-eventos');
  };

  const [openMenuResponsive, setOpenMenuResponsive] = useState(false);

  const handleChangeOpenMenuResponsive = () => {
    setOpenMenuResponsive(!openMenuResponsive);
    setIsMenuOpen(false);
  };

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={`${styles.pageUser}`}>
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
                      Buenas prácticas
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
                  value={'eventos'}
                  className={styles.btn}
                  name='eventos'
                  id='eventos'
                  onChange={handleInput}
                  checked={optionChecked === 'eventos' ? true : false}
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
                          Organizados por mí
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
                          Organizados por mí
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
                <input
                  type={'checkbox'}
                  value={'plan de referidos'}
                  className={styles.btn}
                  name='Plan de Referidos'
                  id='plan-de-referidos'
                  onChange={handleInput}
                  checked={optionChecked === 'plan de referidos' ? true : false}
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
              calendarClassName='calendar-user'
              colorPrimary={'#D53E27'}
              value={date}
              onChange={(item) => setDate(item)}
              locale={myCustomLocale}
              customDaysClassName={datesForCalendar}
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

        {/* RESPONSIVE */}
        <div className={styles.menuResponsiveContainer}>
          <div className={styles.containerButtonOpenMenuResponsive}>
            <input onChange={handleChangeOpenMenuResponsive} type='checkbox' id='open-menu' />
            <label htmlFor='open-menu'>{openMenuResponsive ? <IoIosArrowBack /> : <IoIosArrowForward />}</label>
          </div>

          <ul className={styles.containerListOptionsMenu}>
            <li className={styles.containerItemOptionMenu}>
              <div className={styles.optionMenu}>
                <input
                  type={'checkbox'}
                  value={'perfil'}
                  className={styles.btn}
                  name='Perfil'
                  id='perfilR'
                  onChange={handleInput}
                  checked={optionChecked === 'perfil' ? true : false}
                />
                {openMenuResponsive && (
                  <label className={styles.labelOption} htmlFor='perfilR'>
                    Perfil
                  </label>
                )}
                <div onClick={(e) => handleInput(e, 'Perfil')}>
                  <IconUser className={styles.iconMenu} />
                </div>
                {openMenuResponsive && (
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
                )}
              </div>
            </li>

            {user.organizer && (
              <>
                <li className={styles.containerItemOptionMenu}>
                  <div className={styles.optionMenu}>
                    <input
                      type={'checkbox'}
                      value={'guia del organizador'}
                      className={styles.btn}
                      name='Guia Del Organizador'
                      id='guia del organizadorR'
                      onChange={handleInput}
                      checked={optionChecked === 'guia del organizador' ? true : false}
                    />
                    {openMenuResponsive && (
                      <label className={styles.labelOption} htmlFor='guia del organizadorR'>
                        Buenas prácticas
                      </label>
                    )}

                    <div onClick={(e) => handleInput(e, 'Guia del Organizador')}>
                      <IconGuide className={styles.iconMenu} />
                    </div>
                  </div>
                </li>
              </>
            )}

            <li className={`${styles.optionMenu} ${styles.containerMenuEvent}`}>
              <div className={styles.menuEvent}>
                <input
                  type={'checkbox'}
                  value={'eventos'}
                  className={styles.btn}
                  name='eventos'
                  id='eventosR'
                  onChange={handleInput}
                  checked={optionChecked === 'eventos' ? true : false}
                />

                {openMenuResponsive && (
                  <label className={styles.labelOption} htmlFor='eventosR'>
                    Eventos
                  </label>
                )}
                <div onClick={(e) => handleInput(e, 'eventos')}>
                  <IconEvents className={styles.iconMenu} />
                </div>

                {isOpenMenu && <IoIosArrowDown className={styles.iconEvent} />}
              </div>

              {isOpenMenu && (
                <ul className={styles.listMenuEvent}>
                  <li className={styles.optionMenu}>
                    <input
                      type={'checkbox'}
                      value={'myListEvents'}
                      className={styles.btn}
                      name='Mi lista'
                      id='miListR'
                      onChange={handleInputSubMenu}
                      checked={optionSubMenuChecked === 'myListEvents' ? true : false}
                    />
                    <label className={styles.labelOption} htmlFor='miListR'>
                      Mi lista
                    </label>
                    <IconEvents className={styles.iconMenu} />
                  </li>
                  <li className={styles.optionMenu}>
                    <input
                      type={'checkbox'}
                      value={'eventsForAssist'}
                      className={styles.btn}
                      name='Pendientes por Asistir'
                      id='pendientesR'
                      onChange={handleInputSubMenu}
                      checked={optionSubMenuChecked === 'eventsForAssist' ? true : false}
                    />
                    <label className={styles.labelOption} htmlFor='pendientesR'>
                      Pendientes por Asistir
                    </label>

                    <IconEvents className={styles.iconMenu} />
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
                          id='myEventsR'
                          onChange={handleInputSubMenu}
                          checked={optionSubMenuChecked === 'myEvents' ? true : false}
                        />
                        <label className={styles.labelOption} htmlFor='myEventsR'>
                          Organizados por mí
                        </label>

                        <IconEvents className={styles.iconMenu} />
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
                  value={'mensajes'}
                  className={styles.btn}
                  name='Mensajes'
                  id='mensajes'
                  checked={optionChecked === 'mensajes' ? true : false}
                  onChange={handleInput}
                />
                {openMenuResponsive && (
                  <label className={styles.labelOption} htmlFor='mensajes'>
                    Mensajes
                  </label>
                )}

                <AiOutlineMail onClick={(e) => handleInput(e, 'Mensajes')} className={styles.iconMenu} />
              </div>
            </li>

            {user.organizer && (
              <>
                <li className={styles.containerItemOptionMenu}>
                  <div className={styles.optionMenu}>
                    <input
                      type={'checkbox'}
                      value={'finance'}
                      className={styles.btn}
                      name='Finance'
                      id='financeR'
                      onChange={handleInput}
                      checked={optionChecked === 'finance' ? true : false}
                    />
                    {openMenuResponsive && (
                      <label className={styles.labelOption} htmlFor='financeR'>
                        Finanzas
                      </label>
                    )}

                    <div onClick={(e) => handleInput(e, 'Finance')}>
                      <IconFinances className={styles.iconMenu} />
                    </div>
                  </div>
                </li>
              </>
            )}
            <li className={styles.containerItemOptionMenu}>
              <div className={styles.optionMenu}>
                <input
                  type={'checkbox'}
                  value={'preferencias'}
                  className={styles.btn}
                  name='Preferencias'
                  id='preferenciasR'
                  checked={optionChecked === 'preferencias' ? true : false}
                  onChange={handleInput}
                />
                {openMenuResponsive && (
                  <label className={styles.labelOption} htmlFor='preferenciasR'>
                    Preferencias
                  </label>
                )}

                <div onClick={(e) => handleInput(e, 'Preferencias')}>
                  <IconPreferences className={styles.iconMenu} />
                </div>
              </div>
            </li>
            <li className={styles.containerItemOptionMenu}>
              <div className={styles.optionMenu}>
                <input
                  type={'checkbox'}
                  value={'plan de referidos'}
                  className={styles.btn}
                  name='Plan de Referidos'
                  id='plan de referidosR'
                  onChange={handleInput}
                  checked={optionChecked === 'plan de referidos' ? true : false}
                />
                {openMenuResponsive && (
                  <label className={styles.labelOption} htmlFor='plan de referidosR'>
                    Plan de Referidos
                  </label>
                )}

                <div onClick={(e) => handleInput(e, 'Plan de Referidos')}>
                  <IconReferred className={styles.iconMenu} />
                </div>
              </div>
            </li>
          </ul>
          {openMenuResponsive && (
            <div className={styles.menuCalendar}>
              <Calendar
                calendarClassName='calendar-user'
                colorPrimary={'#D53E27'}
                value={date}
                onChange={(item) => setDate(item)}
                locale={myCustomLocale}
                customDaysClassName={datesForCalendar}
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
          )}
        </div>

        <div className={styles.containerComponentActive}>{component}</div>
      </div>
    );
  }
};

export default UserPage;
