
import React, { useContext, useState } from 'react';
import eventsApi from '../../axios/eventsApi';
import style from './ModalFinance.module.css';
import { stateContext } from '../../context/state/stateContext';

const banco = ['Banco Frances', 'Banco ICBC', 'Banco Colombia', 'Banco Alianza', 'Banco JP Morgan'];

const ModalFinance = ({ closeModal, idUser }) => {

  const [state, setState] = useState('');
  const [data, setData] = useState('');
  const [cta, setCta] = useState(false);
  const { bank, setBank } = useContext(stateContext);

  const handleChangeBank = (e) => {
    e.preventDefault();
    setState(e.target.value);
  }

  const handleChangeAccount = (e) => {
    e.preventDefault();
    setData(e.target.value);
  }

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
      setCta(true);
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.container}>
      <p className={style.modal_close} onClick={closeModal}>
        X
      </p>

      <div className={style.line_div}></div>

      <div className={style.container_bank}>

        <div className={style.container_select}>
          <input type="text" 
            list='banco'
            id='miBanco'
            name='bancos'
            onChange={handleChangeBank}
            /* onKeyPress={handleKeyPress} */
            value={state}
            className={style.data}
            placeholder='Banco'
          />
          <datalist id='banco'>
            {
              banco.length &&
              banco.map((b) => (
                <option value={b}>{b}</option>
              ))
            }
          </datalist>
        </div>

        <div className={style.container_input}>
          <input type="text" 
            value={data} 
            onChange={handleChangeAccount}
            placeholder='Número de cuenta'
          />
        </div>

        <div className={style.container_new}>
          <button className={style.new} onClick={handleClickNew}>Agregar</button>
        </div>

      </div>

      {
        cta &&
        <div><p>Cuenta bancaria agregada</p></div>
      }

      <div className={style.container_button}>
        <button className={style.button_confirm} onClick={closeModal}>
          Listo
        </button>
      </div>
    </div>
  );
}

export default ModalFinance;

/* 
<select defaultValue={state} onChange={handleChangeBank}>
  <option value='default' disabled>Banco</option>
  <option value="Frances">Banco Frances</option>
  <option value="ICBC">Banco ICBC</option>
</select>
*/
