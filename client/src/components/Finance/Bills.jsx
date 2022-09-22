import React, { useEffect } from 'react';
import style from './Bills.module.css';
import useFetch from '../../hooks/useFetch';

const Bills = () => {

  const [state, fetchUsers] = useFetch();

  useEffect(
    function () {
      fetchUsers({
        url: "https://reqres.in/api/users",
        method: "GET"
      });
    },
    [fetchUsers]
  );

  if (state.isLoading) {
    return <div>Cargando usuarios...</div>;
  }

  if (state.isFailed) {
    return <div>Fallo recuperando los usuarios</div>;
  }

  if (state.isSuccess) {
    return (
      <div className={style.container}>

        <div className={style.container_titles}>
          <h1>Histórico de facturas</h1>
          <h3>Nombre del organizador</h3>
          <h5>Fecha</h5>
        </div>

        <div className={style.container_table}>
          <thead className='thead'>
            <tr>
              <th>Nombre del evento</th>
              <th>Fecha del evento</th>
              <th>Fecha de facturacion</th>
              <th>Numero de factura</th>
              <th>Tu ganancia</th>
            </tr>
          </thead>

          <tbody>
            {
              state.data.data.map((e) => (
                <tr key={e.id}>
                  <td><img src={e.avatar} alt={e.first_name} />{e.id}</td>
                  <td>{e.email}</td>
                  <td>xxxxxxx</td>
                  <td>xxxxxxx</td>
                  <td>$500.000</td>
                </tr>
              ))
            }
          </tbody>
        </div>
        
      </div>
    );
  }
  return null;
}

export default Bills;
