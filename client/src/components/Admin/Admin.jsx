import React from 'react';
import { Link } from 'react-router-dom';
import style from './Admin.module.css';

const Admin = () => {
  return (
    <div className={style.Link}>
      <Link to='/lista-de-organizadores'>Pagar Facturas</Link>
      <Link to='/otras-categorias'>Otras Categorias</Link>
      <Link to='/eventos-revision'>Revision de eventos</Link>
    </div>
  );
};

export default Admin;
