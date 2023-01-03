import React from 'react';
import styles from './PreferencesOrg.module.css';

const opcionesEliminar = [
  'Tengo otra cuenta de Lo que quiero hacer',
  'Mala experiencia con eventos/organizador',
  'No encuentro lo que necesito en Lo que quiero hacer',
  'La plataforma es difícil de entender',
  'Otro',
];

const PreferencesOrg = ({ userData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerSub}>
        <div className={styles.containerSub1}>
          <p className={styles.title}>Opciones de notificación</p>
          <p className={styles.texto}>Promociones o eventos que pueden ser de mi interés</p>
          <div className={styles.cont_txt_btn}>
            <p className={styles.texto}>Recordatorio de fechas de eventos en</p>
            <button className={styles.btn}>Mi lista</button>
          </div>
        </div>

        <div className={styles.containerSub1}>
          <p className={styles.titleOpcion}>Correo</p>
          <div className={styles.cont_check}>
            <input type='checkbox' className={styles.check} />
          </div>
          <div className={styles.cont_check}>
            <input type='checkbox' className={styles.check} />
          </div>
        </div>
      </div>

      <div className={styles.containerSub}>
        <div className={styles.containerSub2}>
          <p className={styles.title}>Eliminar Cuenta</p>
          <p className={styles.texto}>Quiero eliminar mi cuenta</p>
          <select className={styles.select} defaultValue='default'>
            <option value='default' disabled>
              Escoge una opcion
            </option>
            {opcionesEliminar &&
              opcionesEliminar.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.contbutton}>
          <button className={styles.button}>Eliminar Cuenta</button>
        </div>
      </div>

      <div className={styles.containerSub3}>
        <p className={styles.titleOptionSelect}>¿Cuál?: *Opcional</p>
        <input
          className={styles.input}
          placeholder='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
          type='text'
        />
      </div>
    </div>
  );
};

export default PreferencesOrg;
