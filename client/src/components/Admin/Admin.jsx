import React from 'react';
import { Link } from 'react-router-dom';
import style from './Admin.module.css';

const Admin = () => {
  return (
    <div className={style.container}>
      <div className={style.Link}>
      <Link to='/lista-de-organizadores'>Pagar Facturas</Link>
      </div>
      <div className={style.Link}>
      <Link to='/otras-categorias'>Otras Categorias</Link>
      </div>
      <div className={style.Link}>
      <Link to='/eventos-revision'>Revision de Eventos</Link>
      </div>
      <div className={style.Link}>
      <Link to='/ordenes'>Registro de Compras</Link>
      </div>
    </div>
  );
};

export default Admin;
