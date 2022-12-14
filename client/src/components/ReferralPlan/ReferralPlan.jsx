import React, { useEffect, useRef, useState } from 'react';
import { FiLink2 } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';
import { imgMoney } from '../../assets/imgs';
import styles from './ReferralPlan.module.css';

import eventsApi from '../../axios/eventsApi';
import { generarCodigo } from '../../utils/generateCodeDiscount';
import { inputKeyDown } from '../../utils/inputOnlyNumbers';

import { FaUserCircle } from 'react-icons/fa';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import CopyToClipboard from 'react-copy-to-clipboard';
import { ImFacebook, ImLink, ImLinkedin2, ImTwitter, ImWhatsapp } from 'react-icons/im';

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
  // const [usersReferred, setUsersReferred] = useState([]);
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
    } else if (isOpen === 'Ocultar') {
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

  const redesContainer = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (redesContainer.current === null || redesContainer.current === undefined) {
      } else if (!redesContainer.current.contains(e.target)) {
        const input = document.getElementById('redes');
        input.checked = false;
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

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
        <h2 className={styles.titleCurrentReferred}>Tu c??digo de referido es</h2>

        <div className={styles.boxCodeReferred}>
          <p>{userData.referralCode}</p>
        </div>

        {/* <div className={styles.containerLinkCode}>
          <FiLink2 className={styles.shareIcon} />
          <label htmlFor='redes'>Compartir c??digo</label>
          <input type='checkbox' id='redes' />

          <ul className={styles.iconsRedes} ref={redesContainer}>
            <li>
              <ImFacebook className={styles.iconRed} />
            </li>
            <li>
              <ImLinkedin2 className={styles.iconRed} />
            </li>
            <li>
              <ImTwitter className={styles.iconRed} />
            </li>
            <li>
              <ImWhatsapp className={styles.iconRed} />
            </li>
            <li>
              <CopyToClipboard text={`${userData.referralCode}`}>
                <ImLink className={styles.iconRed} />
              </CopyToClipboard>
            </li>
          </ul>
        </div> */}

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
          <span>${new Intl.NumberFormat('de-DE').format(availableCredit)}</span>
        </div>
      </div>

      <div className={styles.containerDetailsCodes}>
        <div className={styles.headerDetailsCode}>
          <h2>C??digos de descuento</h2>
          <button onClick={() => handleShowCodeDiscount(showCodeDiscount)}>
            <span>{showCodeDiscount}</span>
          </button>
        </div>

        {!(showCodeDiscount === 'Mostrar') && (
          <>
            <div className={styles.containerDetailsDesc}>
              <p>
                Genera c??digos de descuento por el valor de dinero que desees sin exceder tu saldo disponible. El c??digo
                puede ser redimido por ti o por quien tu desees al momento de realizar la compra de cupo para un evento.
              </p>
              <button className={styles.generateCode}>
                <IoMdAdd />
                <button onClick={generateCodeDiscount}>
                  <span>Generar c??digo de descuento</span>
                </button>
              </button>
            </div>

            {openFormCodeDiscount && (
              <div className={styles.containerFormCreateCode}>
                <div className={styles.containerInputFormCode}>
                  <div className={styles.formGroup}>
                    <label htmlFor='code'>C??digo</label>
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
                  <colgroup span={3}></colgroup>
                  <tr>
                    <th>C??digo</th>
                    <th>Valor</th>
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
                                    value={`$${new Intl.NumberFormat('de-DE').format(codeDiscount.value)}`}
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
                <p>No ha generado c??digos</p>
              )}
            </div>

            <div className={styles.containerCodeRedeemed}>
              <div className={styles.containerTitleCodeRedeemed}>
                <button
                  className={styles.titleCodeRedeemed}
                  onClick={() => setShowCodeDiscountRedeemed(!showCodeDiscountRedeemed)}
                >
                  <span>Ver c??digos de descuento redimidos</span>
                  {showCodeDiscountRedeemed ? <GoTriangleUp /> : <GoTriangleDown />}
                </button>
              </div>

              {listCodeDiscount &&
              !showCodeDiscountRedeemed &&
              listCodeDiscount.find((code) => code.isRedimeed === true) ? (
                <table className={styles.tableRedeemedCode}>
                  <colgroup span='4'></colgroup>
                  <tr className={styles.tableRedeemedCodeHeader}>
                    <th>C??digo</th>
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

          {userData.referrals.length > 0 && showRefferred === 'Ocultar' ? (
            <>
              <table className={styles.tableReferred}>
                <colgroup span='3'></colgroup>
                <tr className={styles.tableReferredHeader}>
                  <th>Tus referidos ({userData.referrals.length})</th>
                  <th>Total saldo pendiente</th>
                  <th>Total Saldo</th>
                </tr>
                {userData.referrals.map((user) => (
                  <tr className={styles.userReferred}>
                    <td className={styles.userReferredInfo}>
                      {user.picture ? (
                        <img src={user.userpicture} alt='img-user' />
                      ) : (
                        <FaUserCircle className={styles.avatarUserReferred} />
                      )}
                      <span>{user.name}</span>
                    </td>
                    <td>${user.pending}</td>
                    <td>${user.total}</td>
                  </tr>
                ))}
              </table>
            </>
          ) : (
            <div className={styles.msgReferred}>
              <p>
                Si ya has compartido tu c??digo de Referidos confirma que el Referido que ya se haya inscrito a la
                Plafatorma. Si a??n no has compartido tu c??digo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralPlan;
