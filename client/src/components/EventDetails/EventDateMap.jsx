
import React, { useState } from 'react';
import styles from './EventDateMap.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';

const EventDateMap = () => {

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

  const handleNumberBuyCupos = (num) => {
    if (num <= -1) return;
    if (num > 10) return;

    setNumberBuyCupos(num);
  };

  return (
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
  );
}

export default EventDateMap;
