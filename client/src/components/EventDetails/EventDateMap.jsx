import React, { useContext, useState } from 'react';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import { stateContext } from '../../context/state/stateContext';
import { administracion, iva } from '../../utils/administracion';
import styles from './EventDateMap.module.css';

const EventDateMap = ({ id, cupos }) => {
  const { carrito } = useContext(stateContext);
  const { setValorTotal } = useContext(stateContext);
  const { setSubTotal } = useContext(stateContext);

  const [numberBuyCupos, setNumberBuyCupos] = useState(1);

  const handleNumberBuyCupos = (num) => {
    if (num <= -1) return;
    if (num > cupos) return;

    setNumberBuyCupos(num);

    const sTotal = [];

    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idDate === id) {
        carrito[i].quantity = num;

        carrito[i].subtotal = num * carrito[i].price;

        carrito[i].ganancias = carrito[i].priceOrg * carrito[i].quantity;

        sTotal.push(carrito[i].subtotal);

        let total = sTotal.reduce((a, b) => a + b, 0);

        setSubTotal(total);

        let t = total + iva + administracion;
        console.log(t);

        setValorTotal(t);
      }

      sTotal.push(carrito[i].subtotal);
    }

    let total = sTotal.reduce((a, b) => a + b, 0);
    setSubTotal(total);

    let t = total + iva + administracion;
    setValorTotal(t);
  };

  return (
    <td className={styles.containerNumberBuyCupos}>
      <button onClick={() => handleNumberBuyCupos(numberBuyCupos - 1)}>
        <img src={iconArrowLeft} alt='icon-left' />
      </button>

      <span>{numberBuyCupos}</span>

      <button onClick={() => handleNumberBuyCupos(numberBuyCupos + 1)}>
        <img src={iconArrowRight} alt='icon-left' />
      </button>
    </td>
  );
};

export default EventDateMap;
