import React from 'react';
import styles from './EventDate.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const EventDate = ({ event }) => {
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
                <td>
                  <input
                    type="number"
                    value={event.id}
                    defaultChecked={false}
                  ></input>
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
      <p className={styles.parrafo2}>Solicitar nuevas fechas</p>
    </div>
  );
};

export default EventDate;
