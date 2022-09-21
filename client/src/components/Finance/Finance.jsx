import React from 'react';
import styles from './Finance.module.css';
import users from '../../api/users';
import basquet from '../../assets/imgs/basquet.svg'

const Finance = () => {

    const opcionesEliminar = [
        'Tengo otra cuenta de Lo que quiero hacer',
        'Mala experiencia con eventos/organizador',
        'No encuentro lo que necesito en Lo que quiero hacer',
        'La plataforma es difícil de entender',
        'Otro'
    ]

  const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];


  return (
    <div className={styles.container}>

        <div className={styles.containerSub}>
            <div className={styles.containerSub1}>
                <p className={styles.texto}>Ganancias totales en facturas ya emitidas: </p>
                <p className={styles.texto}>Ganancias pendientes en facturas por emitir: </p>
                <p className={styles.subtexto}>Cifras mostradas son netas, es decir el monto indicado ya ha sido depositado en tu cuenta bancaria o esta proximo a ser liquidado.</p>
                <button className={styles.btn}>Detalles</button>               
            </div>
        </div>


        <div className={styles.containerSub}>

            <div className={styles.containerSub2}>
               
            <p className={styles.title}>Mi cuenta de banco</p>
            <p className={styles.subtexto}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl</p>
            <div className={styles.containerBankAccount}>
                <div>
                    <input
                        type='checkbox'
                        className={styles.check}
                    />
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
                    <div className={styles.vLine}></div>
                    </div>
                    <div className={styles.btnDelete}>
                    <img className={styles.basquet} src={basquet} alt='n' />
                    <button className={styles.btnAccount}>Eliminar</button> 
                    </div>    
                </div>
            </div>
            <hr className={styles.hr}></hr>
            <button className={styles.btnAdd}>+ Agregar cuenta</button>  
            </div>       
           
        </div>
        

    </div>
  );
};

export default Finance;
