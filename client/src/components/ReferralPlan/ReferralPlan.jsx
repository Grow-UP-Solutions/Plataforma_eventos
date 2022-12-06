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
  const [editCodeDiscount, setEditCodeDiscount] = useState([]);

  const generateCodeDiscount = async () => {
    setOpenFormCodeDiscount(true);

    const code = generarCodigo();

    setCodeDiscount({
      ...codeDiscount,
      code,
    });
  };

  const createtCodeDiscount = async () => {
    const value = txtValueCodeDiscount.current.value;
    if (value > availableCredit) return setErrorMessageCode('Tu saldo no es suficiente');
    if (value === null || value === undefined || value === '') return setErrorMessageCode('Ingrese un valor');
    const codeDiscountData = {
      ...codeDiscount,
      value,
    };

    try {
      await eventsApi.post('/codeDiscount/createCodeDiscount/', { data: codeDiscountData });
      const { data } = await eventsApi.get(`/codeDiscount/getListCodeDiscountByCreator/${userData._id}`);

      const restAvaibleCredit = availableCredit - value;
      setAvailableCredit(restAvaibleCredit);
      setListCodeDiscount(data.listCodeDiscount);

      const howManyInputEdits = data.listCodeDiscount.map((code) => false);

      setEditCodeDiscount(howManyInputEdits);

      setOpenFormCodeDiscount(false);
      setErrorMessageCode('');
    } catch (error) {
      console.log({ error });
    }
  };

  const getUsersReferred = async (isOpen) => {
    if (isOpen === 'Mostrar') {
      setShowRefferred('Ocultar');

      const usersReferredMap = await userData.referrals.map(async (id) => {
        const { data } = await eventsApi.get(`/users/${id}`);
        return data;
      });

      Promise.all(usersReferredMap)
        .then((success) => {
          setUsersReferred(success);
        })
        .catch((error) => console.log(error));
    } else if (isOpen === 'Ocultar') {
      setUsersReferred([]);
      setShowRefferred('Mostrar');
    }
  };

  const handleShowCodeDiscount = (isOpen) => {
    if (isOpen === 'Mostrar') {
      return setShowCodeDiscount('Ocultar');
    } else {
      setErrorMessageCode('');
      setOpenFormCodeDiscount(false);
      setShowCodeDiscount('Mostrar');
      setShowCodeDiscountRedeemed(false);
    }
  };

  useEffect(() => {
    getListCodeDiscount();
  }, []);

  const getListCodeDiscount = async () => {
    try {
      const { data } = await eventsApi.get(`/codeDiscount/getListCodeDiscountByCreator/${userData._id}`);
      setListCodeDiscount(data.listCodeDiscount);
      const howManyInputEdits = data.listCodeDiscount.map((code) => false);
      setEditCodeDiscount(howManyInputEdits);
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteCodeDiscount = async (idCode, value) => {
    try {
      await eventsApi.delete(`/codeDiscount/deleteCodeDiscountById/${idCode}`);
      const { data } = await eventsApi.get(`/codeDiscount/getListCodeDiscountByCreator/${userData._id}`);
      const restAvaibleCredit = availableCredit + value;
      setAvailableCredit(restAvaibleCredit);
      setListCodeDiscount(data.listCodeDiscount);
      const howManyInputEdits = data.listCodeDiscount.map((code) => false);
      setEditCodeDiscount(howManyInputEdits);
    } catch (error) {
      console.log({ error });
    }
  };

  const setEdit = async (index) => {
    const aux = [...editCodeDiscount];
    aux[index] = true;
    setEditCodeDiscount(aux);
  };

  const handleFocusInputEdit = (idCode) => {
    const inputEdit = document.getElementById(idCode);
    inputEdit.focus();
  };

  const funciontAux = async (idCode, index) => {
    await setEdit(index);
    handleFocusInputEdit(idCode);
  };

  const cancelAux = async (index) => {
    const auxEdit = [...editCodeDiscount];
    auxEdit[index] = false;
    setEditCodeDiscount(auxEdit);
  };

  const updateCodeDiscount = async (idCode, beforeValue) => {
    const { value } = document.getElementById(idCode);

    if (value > availableCredit) return setErrorMessageCode('Tu saldo no es suficiente');
    if (value === 0 || value < 0) return setErrorMessageCode('Ingrese un valor valido.');
    if (value === null || value === undefined || value === '') return setErrorMessageCode('Ingrese un valor');

    try {
      await eventsApi.put(`/codeDiscount/updateCodeDiscount/${idCode}`, { value });
      const { data } = await eventsApi.get(`/codeDiscount/getListCodeDiscountByCreator/${userData._id}`);
      setEditCodeDiscount(false);
      let auxValue = 0;
      let restAvaibleCredit = 0;
      if (value > beforeValue) {
        auxValue = value - beforeValue;
        restAvaibleCredit = availableCredit - auxValue;
      } else if (value < beforeValue) {
        auxValue = beforeValue - value;
        restAvaibleCredit = availableCredit + auxValue;
      }
      setAvailableCredit(restAvaibleCredit);
      setListCodeDiscount(data.listCodeDiscount);
      const howManyInputEdits = data.listCodeDiscount.map((code) => false);
      setEditCodeDiscount(howManyInputEdits);
    } catch (error) {
      console.log({ error });
    }
  };
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
        <img src={imgMoney} alt='cash' className={styles.imgMoney} />
        <div className={styles.money}>
          <p>Saldo disponible</p>
          <span>{availableCredit}.000$</span>
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
                {errorMessageCode && <p className={styles.erroMessageCreateCodeDiscount}>{errorMessageCode}</p>}
                <div className={styles.containerButtons}>
                  <button onClick={createtCodeDiscount} className={styles.btnSuccess}>
                    Crear
                  </button>
                  <button onClick={() => setOpenFormCodeDiscount(false)} className={styles.btnCancel}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className={styles.containerListCodeDiscount}>
              {listCodeDiscount.length > 0 && listCodeDiscount.find((code) => code.isRedimeed === false) ? (
                <table className={styles.tableCodeDiscount}>
                  <colgroup span={4}></colgroup>
                  <tr>
                    <th>Código</th>
                    <th>Valor</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {listCodeDiscount
                    .map((codeDiscount, index) => {
                      if (!codeDiscount.isRedimeed) {
                        return (
                          <>
                            <tr className={styles.containerCodeDiscount}>
                              <td>
                                <input disabled type='text' value={codeDiscount.code} />
                              </td>

                              <td>
                                {!editCodeDiscount[index] ? (
                                  <input
                                    id={codeDiscount._id}
                                    disabled
                                    value={`${codeDiscount.value}.000$`}
                                    type='text'
                                  />
                                ) : (
                                  <input id={codeDiscount._id} type='text' />
                                )}
                              </td>

                              <td className={styles.optionCode}>
                                <button onClick={() => funciontAux(codeDiscount._id, index)}>Editar</button>
                                <TbTrash
                                  onClick={() => deleteCodeDiscount(codeDiscount._id, codeDiscount.value)}
                                  className={styles.iconTrash}
                                />
                              </td>
                            </tr>
                            {editCodeDiscount[index] && (
                              <tr>
                                <td colSpan={'2'}>
                                  <div className={styles.containerEditCodeDiscount}>
                                    <button onClick={() => updateCodeDiscount(codeDiscount._id, codeDiscount.value)}>
                                      Guardar
                                    </button>
                                    <button onClick={() => cancelAux(index)}>Cancelar</button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      }
                    })
                    .reverse()}
                </table>
              ) : (
                <p>No ha generado códigos</p>
              )}
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

              {listCodeDiscount &&
              !showCodeDiscountRedeemed &&
              listCodeDiscount.find((code) => code.isRedimeed === true) ? (
                <table className={styles.tableRedeemedCode}>
                  <colgroup span='4'></colgroup>
                  <tr className={styles.tableRedeemedCodeHeader}>
                    <th>Código</th>
                    <th>Valor redimido</th>
                    <th>Redimido por</th>
                    <th>Fecha</th>
                  </tr>
                  {listCodeDiscount.map((codeDiscount) => {
                    if (codeDiscount.isRedimeed) {
                      return (
                        <tr key={codeDiscount._id} className={styles.tableInfoCodeRedeemed}>
                          <td>
                            <span>{codeDiscount.code}</span>
                          </td>
                          <td>
                            <span>${codeDiscount.value}.000</span>
                          </td>
                          <td>
                            <span>{codeDiscount.userRedimeed}</span>
                          </td>
                          <td>
                            <span>{codeDiscount.dateRedimeed}</span>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </table>
              ) : (
                <p>No hay codigos redimidos.</p>
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

          {usersReferred.length > 0 ? (
            <>
              <table className={styles.tableReferred}>
                <colgroup span='3'></colgroup>
                <tr className={styles.tableReferredHeader}>
                  <th>Tus referidos ({usersReferred.length})</th>
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
            </>
          ) : (
            <div className={styles.msgReferred}>
              <p>
                Si ya has compartido tu código de Referidos confirma que el Referido que ya se haya inscrito a la
                Plafatorma. Si aún no has compartido tu código.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralPlan;
