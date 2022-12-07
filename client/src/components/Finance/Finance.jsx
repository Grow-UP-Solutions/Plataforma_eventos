import React, { useContext, useEffect } from 'react';
import styles from './Finance.module.css';
// import users from '../../api/users';
import basquet from '../../assets/imgs/basquet.svg';
import edit from '../../assets/imgs/edit-com.svg';
import { Link } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import ModalFinance from '../Modals/ModalFinance';
import { stateContext } from '../../context/state/stateContext';

const Finance = ({ userData }) => {

  const { bank, setBank } = useContext(stateContext);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    const getBankAccount = async () => {
      try {
        const res = await eventsApi.get('/users/' + userData._id);
        setBank(res.data.bank);
      } 
      catch (error) {
        console.log(error);  
      }
    }
    getBankAccount();
  }, [closeModal]);

  /*console.log('userData',userData._id);
    const opcionesEliminar = [
      'Tengo otra cuenta de Lo que quiero hacer',
      'Mala experiencia con eventos/organizador',
      'No encuentro lo que necesito en Lo que quiero hacer',
      'La plataforma es difícil de entender',
      'Otro'
    ]; 
  const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];*/

  const handleClickNewAccount = (e) => {
    e.preventDefault();
    return openModal();
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerSub}>
        <div className={styles.containerSub1}>
          <p className={styles.texto}>Ganancias totales en facturas ya emitidas: {userData.earnings} </p>
          <p className={styles.texto}>Ganancias pendientes en facturas por emitir: {userData.pendingEarnings} </p>
          <p className={styles.subtexto}>
            Cifras mostradas son netas, es decir el monto indicado ya ha sido depositado en tu cuenta bancaria o esta
            proximo a ser liquidado.
          </p>
          <Link to={'/facturas/' + userData._id}>
            <button className={styles.btn}>Detalles</button>
          </Link>
        </div>
      </div>

      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <ModalFinance closeModal={closeModal} idUser={userData._id}/>
      </Modal>

      <div className={styles.containerSub}>
        <div className={styles.containerSub2}>
          <p className={styles.title}>Mi cuenta de banco</p>
          <p className={styles.subtexto}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl
          </p>

          {
            bank.length > 0 ?
            bank.map((c) => (
              <div className={styles.containerBankAccount}>
                <div>
                  <p>{c.bankName}</p>
                </div>
                <div>
                  <p>{c.bankAccount}</p>
                </div>

                <div className={styles.containerBtnAccount}>
                  <div className={styles.btnEdit}>
                      <img className={styles.basquet} src={edit} style={{color: 'red'}} alt='nw' /> 
                      <button className={styles.btnAccount}>Editar</button>
                  </div>

                  <div className={styles.vLine}></div>

                  <div className={styles.btnDelete}>
                    <img className={styles.basquet} src={basquet} alt='nx' />
                    <button className={styles.btnAccount}>Eliminar</button>
                  </div>
                </div>
              </div> 
            )) :
            <div className={styles.container_nocta}><p className={styles.nocta}>Todavia no agregaste ninguna cuenta bancaria</p></div>
          }       

          <hr className={styles.hr}></hr>

          <button className={styles.btnAdd} onClick={handleClickNewAccount}>+ Agregar cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default Finance;

{/* <div className={styles.containerBankAccount}>
  <div>
    <input type='checkbox' className={styles.check} />
    <label>Ahorros Bancolombias</label>
  </div>
  <div>
    <p>Xxxx-xxxx-xxxx-2367</p>
  </div>
  <div className={styles.containerBtnAccount}>
    <div className={styles.btnEdit}>
      <button className={styles.btnAccount}>
        <img className={styles.basquet} src={basquet} alt='n' /> Editar
      </button>
    </div>
    <div className={styles.vLine}></div>
    <div className={styles.btnDelete}>
      <img className={styles.basquet} src={basquet} alt='n' />
      <button className={styles.btnAccount}>Eliminar</button>
    </div>
  </div>
</div> */}