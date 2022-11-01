import React, { useState, useRef } from 'react';
import styles from './ReferralPlan.module.css';
import { FiLink2 } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';
import { imgMoney } from '../../assets/imgs';

import { Helmet } from 'react-helmet';

import { generarCodigo } from '../../utils/generateCodeDiscount';
import { inputKeyDown } from '../../utils/inputOnlyNumbers';

const ReferralPlan = ({ userData }) => {
  const txtValueCodeDiscount = useRef();
  const [availableCredit, setAvailableCredit] = useState(userData.availableCredit);
  const [openFormCodeDiscount, setOpenFormCodeDiscount] = useState(false);

  const [codeDiscount, setCodeDiscount] = useState({
    code: '',
    value: '',
  });

  const [errorMessageCode, setErrorMessageCode] = useState('');

  const generateCodeDiscount = async () => {
    setOpenFormCodeDiscount(true);

    const code = generarCodigo();

    setCodeDiscount({
      ...codeDiscount,
      code,
    });
  };

  const postCodeDiscount = async () => {
    const value = txtValueCodeDiscount.current.value;

    if (value > availableCredit) return setErrorMessageCode('Tu saldo no es suficiente');

    try {
    } catch (error) {}
  };

  return (
    <div className={styles.containerReferralPlan}>
      <Helmet>
        <title>Plan de referidos</title>

        <meta property='og:title' content='Mi código de referido.' />
        <meta
          property='og:description'
          content='Usalo y tendrás grandes descuentos en los eventos que quieras participar!'
        />
        <meta
          property='og:image'
          content='https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png'
        />
      </Helmet>

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
          <span>{availableCredit}$</span>
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
            <button onClick={generateCodeDiscount}>
              <span>Generar código de descuento</span>
            </button>
          </button>
        </div>

        {openFormCodeDiscount && (
          <div className={styles.containerFormCreateCode}>
            <div className={styles.containerInputFormCode}>
              <div className={styles.formGroup}>
                <label htmlFor='code'>Código</label>
                <input disabled value={codeDiscount.code} type='text' id='value' />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='value'>Valor</label>
                <input onKeyDown={inputKeyDown} ref={txtValueCodeDiscount} type='text' />
              </div>

              <div className={styles.optionCode}>
                <button>Editar</button>
                <TbTrash />
              </div>
            </div>
            {errorMessageCode && <p>{errorMessageCode}</p>}
            <div className={styles.containerButtons}>
              <button onClick={postCodeDiscount} className={styles.btnSuccess}>
                Crear
              </button>
              <button onClick={() => setOpenFormCodeDiscount(false)} className={styles.btnCancel}>
                Cancelar
              </button>
            </div>
          </div>
        )}

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
