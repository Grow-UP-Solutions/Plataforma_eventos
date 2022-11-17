
import React, { useState , useContext ,useEffect } from 'react';
import styles from './EventDateMap.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import { stateContext } from '../../context/state/stateContext';

const EventDateMap = ({id}) => {

  

  const { carrito, setCarrito } = useContext(stateContext);

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

  // useEffect(() => {
  //   for(let i = 0 ; i<carrito.length; i++){
  //     if(carrito[i].fechaId === id){
  //       if(!carrito.includes(carrito[i])){
  //         setNumberBuyCupos(0)
  //       }
  //     }
  //   }
  // }, []);

  const handleNumberBuyCupos = (num) => {
    const carritoCupos = [...carrito]
    if (num <= -1) return;
    if (num > 10) return;

    setNumberBuyCupos(num);
    for( let i = 0 ; i<carritoCupos.length ; i++){
      if(carritoCupos[i].fechaId === id){
        carritoCupos[i].cupos = num
        carritoCupos[i].subtotal= num *  carritoCupos[i].price

        setCarrito(
          carritoCupos
        )
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
