import React, { useContext, useEffect, useState } from 'react';
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
import swal from 'sweetalert';
import { animateScroll as scroll } from 'react-scroll';

const Finance = ({ userData }) => {
  const { bank, setBank, notes, setNotes } = useContext(stateContext);
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [link, setLink] = useState(undefined);
  const [linkBank, setLinkBank] = useState(undefined);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const getBankAccount = async () => {
      try {
        const res = await eventsApi.get('/users/' + userData._id);
        setBank(res.data.bank);
      } catch (error) {
        console.log(error);
      }
    };
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
    setLink(undefined);
    return setTimeout(() => {
      openModal();
    }, 1000);
  };

  const handleClickEdit = (num, banck) => {
    setLink(num);
    setLinkBank(banck);
    return setTimeout(() => {
      openModal();
    }, 1000);
  };

  const notifications = async () => {
    const bank = {
      type: 'bank',
      idUser: userData._id,
    };
    const json = await eventsApi.post('/users/notifications', bank);
    setNotes([...notes, json.data]);
  };

  const handleClickDelete = async (num) => {
    try {
      const res = await eventsApi.delete(`/users/deleteBankAccount/${userData._id}/${num}`);
      setBank(res.data);
      swal({
        title: 'Cuenta bancaria eliminada',
        icon: 'success',
        button: 'OK',
      });
      notifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerSub}>
        <div className={styles.containerSub1}>
          <p className={styles.texto}>
            Ganancias totales en facturas ya emitidas: ${new Intl.NumberFormat('de-DE').format(Math.round(userData.payedEarnings))}{' '}
          </p>
          <p className={styles.texto}>
            Ganancias pendientes en facturas por emitir: $
            {new Intl.NumberFormat('de-DE').format(Math.round(userData.pendingEarnings))}{' '}
          </p>
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
        <ModalFinance closeModal={closeModal} idUser={userData._id} num={link} banck={linkBank}/>
      </Modal>

      <div className={styles.containerSub}>
        <div className={styles.containerSub2}>
          <p className={styles.title}>Mi cuenta de banco</p>
          <p className={styles.subtexto}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl
          </p>

          {bank.length > 0 ? (
            bank.map((c) => (
              <div className={styles.containerBankAccount}>
                <div>
                  <p>{c.bankName}</p>
                </div>
                <div>
                  <p>{c.bankAccount}</p>
                </div>

                <div className={styles.containerBtnAccount}>
                  <div className={styles.btnEdit} onClick={() => handleClickEdit(c.bankAccount, c.bankName)}>
                    <img className={styles.basquet} src={edit} alt='nw' />
                    <button className={styles.btnAccount}>Editar</button>
                  </div>

                  <div className={styles.vLine}></div>

                  <div className={styles.btnDelete} onClick={() => handleClickDelete(c.bankAccount)}>
                    <img className={styles.basquet} src={basquet} alt='nx' />
                    <button className={styles.btnAccount}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.container_nocta}>
              <p className={styles.nocta}>Todavia no agregaste ninguna cuenta bancaria</p>
            </div>
          )}

          {/* <hr className={styles.hr}></hr> */}

          <button className={styles.btnAdd} onClick={handleClickNewAccount}>
            + Agregar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finance;
