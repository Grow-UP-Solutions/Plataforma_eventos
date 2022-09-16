import React, { useState } from 'react';
import styles from './FormProductPay.module.css';
import { iconPayU, iconAchPse } from '../../assets/imgs';
import { Link } from 'react-router-dom';
const FormProductPay = () => {
  const [isPayAchpse, setIsPayAchpse] = useState(false);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setIsPayAchpse(true);
    } else {
      setIsPayAchpse(false);
    }
  };

  return (
    <div className={styles.formPayProduct}>
      <form action="">
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre Completo*</label>
          <input type="text" id="name" required />
        </div>
        {!isPayAchpse && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="id">Número de cédula*</label>
              <input type="text" id="id" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Dirección</label>
              <input type="text" id="address" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city">Ciudad</label>
              <input type="text" id="city" />
            </div>
          </>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="phone">Télefono*</label>
          <input type="text" id="phone" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mail">Correo electrónico</label>
          <input type="text" id="mail" required />
        </div>

        {/* CHECKBOX */}
        <div className={styles.checkContainer}>
          <input type="checkbox" onChange={handleChecked} />
          <label htmlFor="">Paga fácil con tu tarjeta débito </label>
          <img src={iconAchPse} alt="icon-Ach-Pse" />
        </div>
        {!isPayAchpse && (
          <div className={styles.checkContainer}>
            <input type="checkbox" />
            <label htmlFor="">Paga fácil, rápido y seguro con Pay U </label>
            <img src={iconPayU} alt="icon-payU" />
          </div>
        )}

        <div className={styles.containerDetailsBuy}>
          {!isPayAchpse ? (
            <>
              <div className={styles.detailsBuy}>
                <p>Subtotal</p>
                <span>$30.000</span>
              </div>
              <div className={styles.detailsBuy}>
                <p>Descuento</p>
                <span className={styles.detailDiscount}>-$3.000</span>
              </div>
              <div className={styles.detailsBuy}>
                <p>Administración</p>
                <span>$1.000</span>
              </div>
              <div className={styles.detailsBuy}>
                <p>Valor IVA</p>
                <span>$5.491</span>
              </div>
              <div className={styles.formDivisor} />
            </>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="back">Seleccione banco*</label>
                <select name="bank" id="back">
                  <option value="Banco colombia">BANCO COLOMBIA</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="back">Tipo de cliente*</label>
                <select name="bank" id="back">
                  <option value="Banco colombia">Persona natural</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="back">Tipo de documento*</label>
                <select name="bank" id="back">
                  <option value="Banco colombia">
                    C.C ( Cédula de ciudadanía)
                  </option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="id">Número de dócumento*</label>
                <input type="text" id="id" required />
              </div>
            </>
          )}
          <div className={`${styles.detailsBuy} ${styles.totalBuy}`}>
            <p>Valor total Inc IVA</p>
            <span>$34.941</span>
          </div>
        </div>

        <p className={styles.textTerms}>
          Al hacer clic en ‘Pagar,’ confirmas que has leído y aceptas la
          Política de privacidad, la Políticas de seguridad y los Términos y
          condiciones de LO QUE QUIERO HACER S.A.S. También confirmas que eres
          mayor de edad y que aceptas ser contactado por Nosotros en relación a
          los eventos que compres.
        </p>

        <div className={styles.containerButtonForm}>
          <Link to={'/payment'}>
            <button type="submit" className={styles.btnForm}>
              Pagar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormProductPay;
