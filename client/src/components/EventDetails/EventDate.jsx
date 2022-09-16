import React, { useState } from 'react';
import styles from './EventDate.module.css';

import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { AiOutlineClose } from 'react-icons/ai';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';

import { formatDate } from '../../utils/formatDate';
const EventDate = ({ event }) => {
  const [getNewDate, setGetNewDate] = useState(false);
  const [date, setDate] = useState(null);
  const [dateFormatted, setDateFormatted] = useState('');

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

  const handleNumberBuyCupos = (num) => {
    if (num <= -1) return;
    if (num > 10) return;

    setNumberBuyCupos(num);
  };

  const handleFormatDate = (date) => {
    setDate(date);
    setDateFormatted(formatDate(date));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <CalendarMonthIcon
          sx={{
            fontSize: '16px',
            color: '#585858',
            '& :hover': { color: '#ef5350' },
          }}
        />
        <p className={styles.title}>Próximas Fechas</p>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Precio</th>
              <th>Cupos Dispopnibles</th>
              <th>Cupos a Comprar</th>
            </tr>
          </thead>
          <tbody>
            {event.dates.map((event) => (
              <tr key={event.id}>
                <td>
                  <input
                    type="checkbox"
                    class={styles.checkBox}
                    value={event.id}
                    defaultChecked={false}
                  ></input>
                </td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.price}</td>
                <td>{event.cupos}</td>
                <td className={styles.containerNumberBuyCupos}>
                  <button
                    onClick={() => handleNumberBuyCupos(numberBuyCupos - 1)}
                  >
                    <img src={iconArrowLeft} alt="icon-left" />
                  </button>
                  <span>{numberBuyCupos}</span>
                  <button
                    onClick={() => handleNumberBuyCupos(numberBuyCupos + 1)}
                  >
                    <img src={iconArrowRight} alt="icon-left" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.button}>Comprar</button>
      <p className={styles.parrafo}>
        Nuevas fechas pueden ser solicitadas en cuyo caso un mínimo aplicaría de
        cupos a ser adquiridos por el solicitante, será sujeto a aprobación de
        fecha
      </p>
      <p onClick={() => setGetNewDate(!getNewDate)} className={styles.parrafo2}>
        Solicitar nuevas fechas
      </p>

      {/* MENU GET NEW DATE */}

      {getNewDate && (
        <div className={styles.containerMenuGetDate}>
          <div className={styles.closeMenuGetDate}>
            <button onClick={() => setGetNewDate(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.containerDescription}>
            <h2 className={styles.menuTitle}>Solicitar nueva fecha</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quod beatae molestiae eius cum, dolorem necessitatibus quibusdam
              ipsum earum, voluptates repudiandae.
            </p>
          </div>
          <div className={styles.containerDate}>
            <h2 className={styles.menuTitle}>Mi calendario</h2>
            <div className={styles.containerFormDate}>
              <Calendar
                className={styles.calendar}
                color={'#D53E27'}
                locale={locales['es']}
                date={date}
                onChange={(item) => handleFormatDate(item)}
              />
              <div className={styles.menuOptions}>
                <form action="">
                  <div className={styles.formGroup}>
                    <label htmlFor="date">Fecha</label>
                    <input type="text" id="date" value={dateFormatted} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="time">Horas</label>
                    <div className={styles.containerInputTime}>
                      <input type="time" />
                      <input type="time" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="people">Número de participantes</label>
                    <input type="number" id="people" />
                  </div>
                  <div className={styles.containerBtn}>
                    <button type="submit" className={styles.btnMenuDate}>
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDate;
