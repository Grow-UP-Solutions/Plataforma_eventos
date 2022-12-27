import React, { useContext, useState } from 'react';
import eventsApi from '../../axios/eventsApi';
import style from './ModalFinance.module.css';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const banco = ['Banco Frances', 'Banco ICBC', 'Banco Colombia', 'Banco Alianza', 'Banco JP Morgan'];

const ModalFinance = ({ closeModal, idUser, num }) => {
  const [state, setState] = useState('');
  const [data, setData] = useState(num);
  const { bank, setBank, notes, setNotes } = useContext(stateContext);

  const notifications = async () => {
    const bank = {
      type: 'bank',
      idUser,
    };
    const json = await eventsApi.post('/users/notifications', bank);
    setNotes([...notes, json.data]);
  };

  const handleChangeBank = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleChangeAccount = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const handleClickNew = async (e) => {
    e.preventDefault();
    const json = {
      bankName: state,
      bankAccount: data,
    };
    try {
      const res = await eventsApi.put(`/users/setBankAccount/${idUser}`, json);
      setBank(...bank, res.data);
      setState('');
      setData('');
      swal({
        title: 'Cuenta bancaria agregada correctamente',
        icon: 'success',
        button: 'OK',
      });
      notifications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickChange = async (e) => {
    e.preventDefault();
    const json = {
      newBankName: state,
      newBankAccount: data,
    };
    try {
      const res = await eventsApi.put(`/users/editBankAccount/${idUser}/${num}`, json);
      console.log('res.data', res.data);
      console.log('json', json);
      setBank(res.data);
      setState('');
      setData('');
      swal({
        title: 'Cuenta bancaria actualizada correctamente',
        icon: 'success',
        button: 'OK',
      });
      notifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <p className={style.modal_close} onClick={closeModal}>
        X
      </p>

      <p className={style.title}>Completa los campos con los datos correctos</p>

      <div className={style.line_div}></div>

      <div className={style.container_bank}>
        <div className={style.container_select}>
          <input
            type='text'
            list='banco'
            id='miBanco'
            name='bancos'
            onChange={handleChangeBank}
            value={state}
            className={style.data}
            placeholder='Banco'
          />
          <datalist id='banco'>{banco.length && banco.map((b) => <option value={b}>{b}</option>)}</datalist>
        </div>

        <div className={style.container_input}>
          <input type='text' value={data} onChange={handleChangeAccount} placeholder='Número de cuenta' />
        </div>

        {num ? (
          <div className={style.container_new}>
            <button className={style.new} onClick={handleClickChange}>
              Actualizar
            </button>
          </div>
        ) : (
          <div className={style.container_new}>
            <button className={style.new} onClick={handleClickNew}>
              Agregar
            </button>
          </div>
        )}
      </div>

      <div className={style.container_button}>
        <button className={style.button_confirm} onClick={closeModal}>
          Listo
        </button>
      </div>
    </div>
  );
};

export default ModalFinance;
