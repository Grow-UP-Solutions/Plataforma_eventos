import React, { useEffect, useState } from 'react';
import style from './OtherCategories.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
const OtherCategories = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const getEvents = async () => {
    const otherCategories = [];

    const userResult = await eventsApi.get(`/events`);

    for (let i = 0; i < userResult.data.length; i++) {
      const otherCat = userResult.data[i].otherCategorie[0];
      otherCategories.push(otherCat);
    }

    setState(otherCategories);
    setLoad(false);
  };

  useEffect(() => {
    const unique = [];

    for (let i = 0; i < state.length; i++) {
      for (let j = 1; j < state.length; j++) {
        if (state[i] === state[j]) {
        } else {
          const uniqueCat = {
            categorie: state[i],
            quantity: 1,
          };
          unique.push(uniqueCat);
        }
      }
    }
  }, [state]);

  //   for(let i = 0 ; i < state.length ; i ++){
  //     for(let j = 1 ; j < state.length ; j ++){
  //         if(state[i] === state[j]){
  //             console.log(state[i] )
  //         }
  //     }
  // }

  // const count = {};

  // state.forEach(element => {
  //   count[element] = (count[element] || 0) + 1;
  // });

  // // 👇️ {one: 3, two: 2, three: 1}
  // console.log(count);

  //  {cat : 'nautica', canitdad : 2}

  const [currentPage, setCurretPage] = useState(1);
  const catPerPage = 10;
  const indexOfLastOrg = currentPage * catPerPage;
  const indexOfFirstOrg = indexOfLastOrg - catPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.container}>
        <div className={style.container_titles}>
          <h1>Lista de categorias recomendadas</h1>
        </div>

        <div className={style.container_table}>
          <div className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre</th>
              </tr>
            </thead>

            <tbody>
              {state !== undefined &&
                state.slice(indexOfFirstOrg, indexOfLastOrg).map((e) => (
                  <tr className={style.tbody}>
                    <td className={style.tbody_name}>{e}</td>
                  </tr>
                ))}
            </tbody>
          </div>

          <div className={style.container_download}></div>
          {state !== undefined && (
            <div className={style.container_pagination}>
              <Pagination ordersPerPage={catPerPage} state={state.length} paginado={paginado} />
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

export default OtherCategories;
