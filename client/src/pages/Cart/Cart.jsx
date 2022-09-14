import React from 'react';
import styles from './Cart.module.css';
import {
  iconArrowLeft,
  iconArrowRight,
  iconExclamation,
} from '../../assets/imgs';

import events from '../../api/events';
import CardProduct from '../../components/CardProduct/CardProduct';
import FormProductPay from '../../components/FormProductPay/FormProductPay';

const event = events[2];
const Cart = () => {
  return (
    <div className={`${styles.pageCart} container`}>
      <h1 className={styles.pageCartTitle}>Usted está comprando</h1>
      <div className={styles.containerPageCart}>
        <div className={styles.containerCardProduct}>
          <CardProduct event={events[2]} />
          <div className={styles.summaryCart}>
            <h2 className={styles.summaryTitle}>
              <img src={iconExclamation} alt="icon-exclamation" />
              <span>Accesibilidad y requerimientos especiales</span>
            </h2>
            <p className={styles.summaryDescription}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip.
            </p>
          </div>
        </div>

        <FormProductPay />
      </div>
    </div>
  );
};

export default Cart;

{
  /* */
}
