import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { iconExclamation } from '../../assets/imgs';
import CardProduct from '../../components/CardProduct/CardProduct';
import FormProductPay from '../../components/FormProductPay/FormProductPay';
import styles from './Cart.module.css';

const Cart = () => {
  const id = useParams().id;
  console.log('id:', id);
  const events = useSelector((state) => state.events);
  const eventDetail = events.filter((e) => e._id === id)[0];
  console.log('eventdetails:', eventDetail);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={`${styles.pageCart} container`}>
      <h1 className={styles.pageCartTitle}>Usted está comprando</h1>
      <div className={styles.containerPageCart}>
        <div className={styles.containerCardProduct}>
          <CardProduct event={eventDetail} />
          <div className={styles.summaryCart}>
            <h2 className={styles.summaryTitle}>
              <img src={iconExclamation} alt='icon-exclamation' />
              <span>Accesibilidad y requerimientos especiales</span>
            </h2>
            <p className={styles.summaryDescription}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip.
            </p>
          </div>
        </div>

        <FormProductPay />
      </div>
    </div>
  );
};

export default Cart;
