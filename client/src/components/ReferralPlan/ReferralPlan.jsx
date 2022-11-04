import React, { useEffect, useRef, useState } from 'react';
import { FiLink2 } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';
import { imgMoney } from '../../assets/imgs';
import styles from './ReferralPlan.module.css';

import { Helmet } from 'react-helmet';

import eventsApi from '../../axios/eventsApi';
import { generarCodigo } from '../../utils/generateCodeDiscount';
import { inputKeyDown } from '../../utils/inputOnlyNumbers';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const ReferralPlan = ({ userData }) => {
  const txtValueCodeDiscount = useRef();
  const [availableCredit, setAvailableCredit] = useState(userData.availableCredit);
  const [openFormCodeDiscount, setOpenFormCodeDiscount] = useState(false);

  const [codeDiscount, setCodeDiscount] = useState({
    code: '',
    value: '',
    idCreator: userData._id,
  });

  const [listCodeDiscount, setListCodeDiscount] = useState([]);

  const [errorMessageCode, setErrorMessageCode] = useState('');
  const [usersReferred, setUsersReferred] = useState([]);
  const [showRefferred, setShowRefferred] = useState('Mostrar');
  const [showCodeDiscountRedeemed, setShowCodeDiscountRedeemed] = useState(false);
  const [showCodeDiscount, setShowCodeDiscount] = useState('Mostrar');
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

    const codeDiscountData = {
      ...codeDiscount,
      value,
    };

    try {
      const { data } = await eventsApi.post('/codeDiscount/createCodeDiscount/', { data: codeDiscountData });
      const restAvaibleCredit = availableCredit - value;
      setAvailableCredit(restAvaibleCredit);
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };

  const getUsersReferred = async (isOpen) => {
    if (isOpen === 'Mostrar') {
      setShowRefferred('Ocultar');
      await userData.referrals.forEach(async (id) => {
        const { data } = await eventsApi.get(`/users/${id}`);
        setUsersReferred([...usersReferred, data]);
      });
    } else if (isOpen === 'Ocultar') {
      setUsersReferred([]);
      setShowRefferred('Mostrar');
    }
  };

  const handleShowCodeDiscount = (isOpen) => {
    if (isOpen === 'Mostrar') return setShowCodeDiscount('Ocultar');
    else return setShowCodeDiscount('Mostrar');
  };

  useEffect(() => {
    getListCodeDiscount();
  }, []);

  const getListCodeDiscount = async () => {
    try {
      const { data } = await eventsApi.get(`/codeDiscount/getListCodeDiscountByCreator/${userData._id}`);
      setListCodeDiscount(data.listCodeDiscount);
    } catch (error) {
      console.log({ error });
    }
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
          <button onClick={() => handleShowCodeDiscount(showCodeDiscount)}>
            <span>{showCodeDiscount}</span>
          </button>
        </div>

        {!(showCodeDiscount === 'Mostrar') && (
          <>
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

            <div className={styles.containerListCodeDiscount}>
              {listCodeDiscount &&
                listCodeDiscount.map((codeDiscount) => (
                  <div key={codeDiscount._id} className={styles.containerCodeDiscount}>
                    <div className={styles.formGroup}>
                      <label htmlFor='code'>Código</label>
                      <input disabled type='text' id='value' value={codeDiscount.code} />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor='value'>Valor</label>
                      <input disabled value={codeDiscount.value} type='text' />
                    </div>

                    <div className={styles.optionCode}>
                      <button>Editar</button>
                      <TbTrash className={styles.iconTrash} />
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles.containerCodeRedeemed}>
              <div className={styles.containerTitleCodeRedeemed}>
                <button
                  className={styles.titleCodeRedeemed}
                  onClick={() => setShowCodeDiscountRedeemed(!showCodeDiscountRedeemed)}
                >
                  <span>Ver códigos de descuento redimidos</span>
                  {showCodeDiscountRedeemed ? <GoTriangleUp /> : <GoTriangleDown />}
                </button>
              </div>

              {showCodeDiscountRedeemed && (
                <table className={styles.tableRedeemedCode}>
                  <colgroup span='4'></colgroup>
                  <tr className={styles.tableRedeemedCodeHeader}>
                    <th>Código</th>
                    <th>Valor redimido</th>
                    <th>Redimido por</th>
                    <th>Fecha</th>
                  </tr>
                  <tr className={styles.tableInfoCodeRedeemed}>
                    <td>
                      <span>U323PML7</span>
                    </td>
                    <td>
                      <span>$0.000</span>
                    </td>
                    <td>
                      <span>Pepito Perez</span>
                    </td>
                    <td>
                      <span>05/10/2020</span>
                    </td>
                  </tr>
                </table>
              )}
            </div>
          </>
        )}

        <div className={styles.containerShowReferred}>
          <div className={styles.headerDetailsCode}>
            <h2>Mostrar referidos</h2>
            <button onClick={() => getUsersReferred(showRefferred)}>
              <span>{showRefferred}</span>
            </button>
          </div>

          {usersReferred.length > 0 && (
            <>
              <table className={styles.tableReferred}>
                <colgroup span='3'></colgroup>
                <tr className={styles.tableReferredHeader}>
                  <th>Tus referidos</th>
                  <th>Total saldo pendiente</th>
                  <th>Total Saldo</th>
                </tr>
                {usersReferred.map((user) => (
                  <tr className={styles.userReferred}>
                    <td className={styles.userReferredInfo}>
                      <img src={user.userpicture} alt='img-user' />
                      <span>{user.nickname}</span>
                    </td>
                    <td>5000$</td>
                    <td>0$</td>
                  </tr>
                ))}
              </table>
              <div className={styles.msgReferred}>
                <p>
                  Si ya has compartido tu código de Referidos confirma que el Referido que ya se haya inscrito a la
                  Plafatorma. Si aún no has compartido tu código.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralPlan;
