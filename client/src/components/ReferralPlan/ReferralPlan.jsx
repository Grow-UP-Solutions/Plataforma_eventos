import React from 'react';
import styles from './ReferralPlan.module.css';
import { FiLink2 } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';
import { imgMoney } from '../../assets/imgs';

const ReferralPlan = ({ userData }) => {
  return (
    <div className={styles.containerReferralPlan}>
      <div className={styles.containerCurrentReferred}>
        <h2 className={styles.titleCurrentReferred}>Tu código de referido es</h2>

        <div className={styles.boxCodeReferred}>
          <p>{userData.referralCode}</p>
        </div>

        <div className={styles.containerLinkCdoe}>
          <FiLink2 />
          <span>Compartir código</span>
        </div>

        <div className={styles.codeDesc}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sequi aspernatur voluptas sapiente omnis!
            Ipsum quo ullam dolorem, in maiores molestiae tenetur provident assumenda vero magnam libero corrupti.
            Repellendus, corporis.
          </p>
        </div>
      </div>

      <div className={styles.containerQuantityMoney}>
        <img src={imgMoney} alt='image-cash' className={styles.imgMoney} />

        <div className={styles.money}>
          <p>Saldo disponible</p>
          <span>200.000$</span>
        </div>
      </div>

      <div className={styles.containerDetailsCodes}>
        <div className={styles.headerDetailsCode}>
          <h2>Códigos de descuento</h2>
          <span>Mostrar</span>
        </div>
        <div className={styles.containerDetailsDesc}>
          <p>
            Genera códigos de descuento por el valor de dinero que desees sin exceder tu saldo disponible. El código
            puede ser redimido por ti o por quien tu desees al momento de realizar la compra de cupo para un evento.
          </p>
          <button className={styles.generateCode}>
            <IoMdAdd />
            <span>Generar código de descuento</span>
          </button>
        </div>

        <div className={styles.containerInputCode}>
          <div className={styles.formGroup}>
            <label htmlFor='code'>Código</label>
            <input type='text' id='value' />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='value'>Valor</label>
            <input type='text' />
          </div>

          <div className={styles.optionCode}>
            <button>Editar</button>
            <TbTrash />
          </div>
        </div>

        <div className={styles.containerCodeRedeemed}>
          <h3 className={styles.titleCodeRedeemed}>Ver códigos de descuento redimidos</h3>

          <div className={styles.containerTableRedeemed}>
            <div className={styles.columnTableRedeemed}>
              <span>Código</span>
              <p>U323 PML7</p>
            </div>
            <div className={styles.columnTableRedeemed}>
              <span>Valor Redimido</span>
              <p>$ 0.000</p>
            </div>
            <div className={styles.columnTableRedeemed}>
              <span>Redimido por</span>
              <p>Pepito Pérez</p>
            </div>
            <div className={styles.columnTableRedeemed}>
              <span>Fecha</span>
              <p>05/01/2020</p>
            </div>
          </div>
        </div>

        <div className={styles.containerShowReferred}>
          <div className={styles.headerDetailsCode}>
            <h2>Mostrar referidos</h2>
            <span>Mostrar</span>
          </div>
          <div className={styles.tableReferreds}>
            <div className={styles.columnTableReferred}>
              <p>Tus referidos</p>
              <div className={styles.containerProfileReferred}>
                <img src='https://i.pravatar.cc/150?img=3' alt='img-profile' />
                <p>Pepito Perez</p>
              </div>
            </div>
            <div className={styles.columnTableReferred}>
              <p>Total saldo pendiente 20.000$</p>
              <p>5.000$</p>
            </div>
            <div className={styles.columnTableReferred}>
              <p>Total saldo</p>
              <p>1.000$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPlan;
