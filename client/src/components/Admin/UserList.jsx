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
import Loading from '../Loading/Loading';

const UserList = () => {
  const [state, fetchUsers] = useFetch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userResult = await eventsApi.get(`/users`);
    setUserData(userResult.data);
    setLoad(false)
  };


  const [currentPage, setCurretPage] = useState(1);
  const organizerPerPage = 10;
  const indexOfLastOrg = currentPage * organizerPerPage;
  const indexOfFirstOrg = indexOfLastOrg - organizerPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);


  if(load){
    return(
      <Loading />
    )
   }else{
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
                    
                  </tr>
                  
                ))}
            </tbody>
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
};

export default UserList;