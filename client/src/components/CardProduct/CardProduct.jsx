import React from 'react';
import styles from './CardProduct.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';

const CardProduct = ({ event }) => {
  
  return (
    <div className={styles.cartProduct}>
      <div className={styles.containerProductDetails}>
        <div className={styles.imgContainer}>
          <img src={event.pictures[0]} alt="img-product" />
        </div>
        <div className={styles.containerDescription}>
          <h2 className={styles.productName}>{event.name}</h2>
          <div className={styles.productDate}>
            <button className={styles.productDateBtn}>
              <img src={iconArrowLeft} alt="icon-left" />
            </button>
            <span>{event.dates[0].date.replace('/', ' de ')}</span>
            <button className={styles.productDateBtn}>
              <img src={iconArrowRight} alt="icon-left" />
            </button>
          </div>
          <p className={styles.productTime}>{event.dates[0].start} a {event.dates[0].end}</p>
          <p className={styles.productLocation}>
            {event.city} - {event.state}
          </p>
          <p className={styles.productCupos}>
            Cupos disponibles : {event.cupos}
          </p>
        </div>
      </div>
      <div className={styles.containerOptions}>
        <div className={styles.productOptions}>
          <div className={styles.containerQuantity}>
            <p className={styles.titleQuantity}>Cantidad</p>
            <div className={styles.quantityBtns}>
              <button>
                <img src={iconArrowLeft} alt="icon-left" />
              </button>
              <span>4</span>
              <button>
                <img src={iconArrowRight} alt="icon-right" />
              </button>
            </div>
          </div>
          <div className={styles.containerPriceForBallot}>
            <p className={styles.titlePriceBallot}>Precio por cupo</p>
            <span>10.000$</span>
          </div>
          <div className={styles.containerPriceSubtotal}>
            <p className={styles.titleSubtotal}>Subtotal</p>
            <span>10.000$</span>
          </div>
        </div>
        <div className={styles.productDiscount}>
          <p className={styles.titleDiscount}>¿Tiene un código de descuento?</p>
          <div className={styles.containerInputDiscount}>
            <input type="text" />
            <button>Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
