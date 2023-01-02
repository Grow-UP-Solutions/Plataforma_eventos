import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { useContext, useEffect, useState } from 'react';
import ExportExcel from 'react-export-excel';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import { Loading } from '../../components';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import styles from './MyEventsAsistentes.module.css';
import avatar from '../../assets/imgs/no-avatar.png';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const MyEventsAsistentes = () => {

  const eventid = useParams().eventId;
  const dateid = useParams().dateId;
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const getAll = async () => {
      const json = await eventsApi.get('/events');
      const res = await eventsApi.get('/users');

      const event = json.data.filter((e) => e._id === eventid);
      const fecha = event[0].dates.find((d) => d._id === dateid);
      const todosUsers = res.data;
      console.log({ buyers: fecha.buyers });
      setBuyer(fecha.buyers);
      const idBuyers = fecha.buyers;

      setEvent(event);
      setDate(fecha);

      if (idBuyers !== undefined) {
        const allBuyers = [];
        for (let j = 0; j < idBuyers.length; j++) {
          const buyer = todosUsers.find((a) => a._id === idBuyers[j].id);
          allBuyers.push(buyer);
          console.log({ allBuyers });
          setBuyers(allBuyers);
          setLoad(false);
        }
      }
    };
    getAll();
  }, []);

  // SELECCION DE CHECKBOX
  /* const [seleccionados, setSeleccionados] = useState([]);

  const selectBuyer = (e) => {
    let buyerId = e.target.value;

    if (!e.target.checked) {
      let seleccion = seleccionados.filter((buyer) => buyer !== buyerId);
      setSeleccionados(seleccion);
    } else {
      let buyerCheck = date.buyers.find((buyer) => buyer === buyerId);
      setSeleccionados([...seleccionados, buyerCheck]);
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSeleccionados([]);
      setSeleccionados(date.buyers);
    } else {
      setSeleccionados([]);
    }
  };

  const saber = (a) => {
    let gast = seleccionados.includes(a);
    return gast;
  }; */

  //MENSAJES
  const { setResult, conversa } = useContext(stateContext);
  const [conversation, setConversation] = useState([]);

  const handleOneMessage = (e, buyerId) => {
    e.preventDefault();

    const data = {
      senderId: user.uid,
      receiverId: buyerId,
    };

    return eventsApi.post('/conversation/create', data).then((response) => {
      navigate(`/usuario/mensajes/${response.data._id}`);
    });
  };

  /* const handleManyMessages = (e) => {
    e.preventDefault();
    const data = {
      senderId: user.uid,
      receiverId: seleccionados,
    };
    eventsApi.post('/conversation/buyer/create', data).then((response) => {
      navigate('/usuario/mensajes');
    });
  }; */

  //SALIR
  const handleClickExit = (e) => {
    e.preventDefault();
    navigate('/usuario/perfil');
  };

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={styles.container}>
        {event.length === 1 && (
          <div className={styles.containerTop}>
            <p className={styles.title}>Asistentes al evento</p>
            <p className={styles.eventTitle}>{event[0].title}</p>
            <p className={styles.location}>
              {event[0].municipio} - {event[0].departamento}{' '}
            </p>

            {event[0].dates.map((d) =>
              d._id === dateid ? (
                <div>
                  <p className={styles.date}>
                    {d.dateFormated} - {d.start} - {d.end}{' '}
                  </p>
                  {buyer.length > 1 ? (
                    <div className={styles.containerTable}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {/* <th className={styles.input}>
                              <input
                                type='checkbox'
                                onChange={(e) => selectAll(e)}
                                defaultChecked={false}
                                value={buyers._id}
                                class={styles.checkBox}
                              />
                            </th> */}
                            <th></th>
                            <th>Usuario</th>
                            <th>Cupos Comprados</th>
                            <th className={styles.two}>
                              <div className={styles.btnTop1}>
                                <DescriptionOutlinedIcon sx={{ fontSize: '3rem', color: '#d53e27' }} />
                                <ExcelFile
                                  element={<button className={styles.button}>Descargar Lista</button>}
                                  filename='Excel Lista Asistentes'
                                >
                                  <ExcelSheet data={buyer} name='Asistentes'>
                                    <ExcelColumn label='name' value='name' />
                                    <ExcelColumn label='cupos' value='cupos' />
                                    <ExcelColumn label='codigo' value='codigo' />
                                  </ExcelSheet>
                                </ExcelFile>
                              </div>

                              {/* <div className={styles.btnTop2}>
                                <MailOutlineIcon sx={{ fontSize: '3rem', color: '#d53e27' }} />
                                <button className={styles.button} onClick={(e) => handleManyMessages(e)}>
                                  <p>Enviar Mensaje a</p>
                                  <p>seleccionados</p>
                                </button>
                              </div> */}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {buyer.map((b) => (
                            <tr key={b.id}>
                              {/* <td className={styles.input}>
                                <input
                                  type='checkbox'
                                  onChange={(e) => selectBuyer(e)}
                                  value={b._id}
                                  className={styles.checkBox}
                                  checked={saber(b._id) ? true : false}
                                />
                              </td> */}
                              <td>
                                <img className={styles.userImg} src={b.userpicture ? b.userpicture : avatar} alt='img-user' />
                              </td>
                              <td>{b.name ? b.name : b.email}</td>
                              <td>{b.cupos}</td>
                              <td>
                                <div className={styles.btn}>
                                  <MailOutlineIcon sx={{ fontSize: '2rem', color: '#d53e27' }} />
                                  <p className={styles.button1} onClick={(e) => handleOneMessage(e, b.id)}>
                                    Enviar Mensaje
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    'LOADING ...'
                  )}
                </div>
              ) : (
                ''
              )
            )}
          </div>
        )}
        <div className={styles.container_exit}>
          <p className={styles.exit} onClick={handleClickExit}>
            Salir
          </p>
        </div>
      </div>
    );
  }
};

export default MyEventsAsistentes;

/* 
const handleManyMessages = (e) => {
    e.preventDefault();
    const array = conversa.map((e) => e.members).flat();
    for (let i = 0 ; i < array.length ; i++) {

    const json = seleccionados.includes(array[i])

    const data = {
      senderId: user.uid,
      receiverId: seleccionados,
    }

    if (json === true) {
      navigate('/usuario/mensajes');
    }
      
    eventsApi.post('/conversation/buyer/create', data).then((response) => {
      navigate('/usuario/mensajes');
    });
  };
*/
