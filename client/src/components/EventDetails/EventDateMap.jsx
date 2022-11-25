
import React, { useState , useContext ,useEffect } from 'react';
import styles from './EventDateMap.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import { stateContext } from '../../context/state/stateContext';

const EventDateMap = ({id,cupos}) => {

 

  const { carrito, setCarrito } = useContext(stateContext);
  const { valorTotal, setValorTotal } = useContext(stateContext);
  const { subTotal , setSubTotal } = useContext(stateContext);

  const [numberBuyCupos, setNumberBuyCupos] = useState(1);


  const handleNumberBuyCupos = (num) => {
    
    if (num <= -1) return;
    if (num > cupos) return;

    setNumberBuyCupos(num);

    const sTotal = []

    for( let i = 0 ; i<carrito.length ; i++){
      if(carrito[i].idDate === id){
        carrito[i].quantity = num
        const iva = carrito[i].price * 0.19 // 1900
        const admin = carrito[i].price * 0.16 //1600 
        const precioFinal = carrito[i].price + iva + admin // 13500
        carrito[i].unit_price=precioFinal
        carrito[i].subtotal = num * carrito[i].price
        
        sTotal.push(carrito[i].subtotal)
        let total = sTotal.reduce((a, b) => a + b, 0);
        setSubTotal(total)

        let t = total + total* 0.19 + total *0.16
     
        setValorTotal(t)
      }
    }
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
