import React from "react";
import EventDate from "./EventDate";
import EventOrganizer from "./EventOrganizer";
import styles from './EventSideBar.module.css';

const EventSideBar = ({ id }) => {

  return (
    <div className={styles.container}>
      <div>
        <EventDate id={id}/>
      </div>

      <hr className={styles.cardHr}></hr>

      <div className={styles.container2}>
        <p className={styles.c2title}>Accesibilidad y requerimientos especiales</p>
        <div className={styles.subcontainer2}>
          <p className={styles.icon}>!</p>
          <p className={styles.c2subtitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</p>
        </div>
      </div>

      <hr className={styles.cardHr}></hr>

      <div>
        <EventOrganizer id={id} /> 
      </div>
    </div>
  );
};
  
export default EventSideBar;