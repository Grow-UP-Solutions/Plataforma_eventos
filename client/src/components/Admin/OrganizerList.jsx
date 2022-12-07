import React, { useEffect, useState } from 'react';
import style from './OrganizerList.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';

const OrganizerList = () => {
  const [state, fetchUsers] = useFetch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userResult = await eventsApi.get(`/users`);
    setUserData(userResult.data);
  };

  console.log('userData:', userData);

  const [currentPage, setCurretPage] = useState(1);
  const organizerPerPage = 10;
  const indexOfLastOrg = currentPage * organizerPerPage;
  const indexOfFirstOrg = indexOfLastOrg - organizerPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(
    function() {
      fetchUsers({
        url: 'https://reqres.in/api/users',
        method: 'GET',
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
          <h1>Lista de organizadores</h1>
          <h5>{fechaActual}</h5>
        </div>

        <div className={style.container_table}>
          <div className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {userData !== undefined &&
                userData.slice(indexOfFirstOrg, indexOfLastOrg).map((e) => (
                  <tr key={e.id} className={style.tbody}>
                    <td className={style.tbody_name}>
                      <img
                        src={userData.userpicture}
                        alt={e.first_name}
                        style={{ maxWidth: '20%', borderRadius: '100px' }}
                      />
                      <Link to={'/organizador-facturas-pagar/' + e._id}>{e.name}</Link>
                    </td>
                    <td>{e.email}</td>
                    <td>
                      <input type='checkbox' />
                    </td>
                  </tr>
                ))}
            </tbody>
          </div>

          <div className={style.container_download}>
            <div className={style.container_one}>
              <DescriptionOutlinedIcon fontSize='large' color='#d53e27' />
              <p>Descargar factura de selecionados (PDF)</p>
            </div>

            <div className={style.container_two}>
              <DescriptionOutlinedIcon fontSize='large' />
              <p>Descargar reporte de páginas (EXCEL)</p>
            </div>
          </div>
          {userData !== undefined && (
            <div className={style.container_pagination}>
              <Pagination organizerPerPage={organizerPerPage} state={userData.length} paginado={paginado} />
            </div>
          )}

          <div className={style.container_exit}>
            <p className={style.exit} onClick={() => navigate('/admin')}>
              Salir
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default OrganizerList;
