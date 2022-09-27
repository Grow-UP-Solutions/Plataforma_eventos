import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import categories from '../../api/categories';
import dptos from '../../api/dptos';
import basquet from '../../assets/imgs/basquet.svg';
import calendar from '../../assets/imgs/calendar.svg';
import iconEditar from '../../assets/imgs/iconEditar.svg';
import iconExclamacion2 from '../../assets/imgs/iconExclamacion2.svg';
import infoIcon from '../../assets/imgs/infoIcon.svg';
import mapa from '../../assets/imgs/mapa2.png';
import { formatDate } from '../../utils/formatDate';
import styles from './EventCreateForm.module.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventCreateForm = () => {
  const [post, setPost] = useState({
    title: '',
    categories: [],
    otherCategories: [],
    shortDescription: '',
    longDescription: '',
    pictures: [],
    online: '',
    link: '',
    departamento: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos:'',
    price: '',
    dates: [
      {
        date: '',
        start: '',
        end: '',
      },
    ],
  });

  const [errors, setErrors] = useState({
    title: '',
    categories:'',
    shortDescription: '',
    longDescription: '',
    cupos:'',
    price:''
  
  })

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

  function validate(post) {
    let errors = {}
    let nameRegex = /^[a-zA-Z0-9 _]*$/g
    let titleRegex = /^[a-zA-Z _]*$/g
    if (!post.title) {
      errors.title = 'Ingresar titulo (!)'
    }

    if (post.title.length > 75) {
      errors.title = 'Alcanzaste el limite de characteres'
    }


    if (post.categories.length > 3) {
      errors.title = 'Alcanzaste el limite de characteres'
    }

    if (post.longDescription.length < 75) {
      errors.title = 'Alcanzaste el limite de characteres'
    }

    if (post.cupos && !post.cupos.match(/^[0-9]*$/g)) {
      errors.cupos = 'Debe ser un numero'
    }

    

    if (post.price && !post.price.match(/([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/g)) {
      errors.price = 'Debe ser un numero'
    }

    
    return errors
  }

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  function handleCategories(e) {
    if (!post.categories.includes(e.target.value))
    setPost({
      ...post,
      [e.target.name]: [...post.categories, e.target.value],
    });
  }

  function handleOtherCategories(e) {
    setPost({
      ...post,
      [e.target.name]: [...post.categories, e.target.value],
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setPost({
        ...post,
        [e.target.name]: true,
      });
    } else {
      setPost({
        ...post,
        [e.target.name]: false,
      });
    }
  }

  function handlePrice(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  function handleDate(e) {
    setPost({
      ...post,
      dates: { ...post.dates, [e.target.name]: e.target.value },
    })
  }

  // const [failedSubmit, setFailedSubmit] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) alert("Please fill in all the fields")
    else {
        // dispatch(postRecipe(post))
        alert('¡Recipe Created!')
        setPost({
          title: '',
          categories: [],
          otherCategories: [],
          shortDescription: '',
          longDescription: '',
          pictures: [],
          online: '',
          link: '',
          departamento: '',
          direccion: '',
          barrio: '',
          specialRequires: '',
          price: '',
        })
    }
};


  //-----------------------------------------------------//
  //                  SCROLL_SNAP                     //

  const ref = useRef();

  const [scrollY, setScrollY] = useState(0);

  const scrollSections = (px) => {
    ref.current.scrollTo({
      top: scrollY + px,
      left: 0,
      behavior: 'smooth',
    });

    setScrollY(scrollY + px);
  };

  //--------------------------------------------------//
  //                  AUTOCOMPLETADO                  //

  //--------------------------------------------------//
  //                  CALENDAR                 //

  const [date, setDate] = useState(null);
  const [dateFormatted, setDateFormatted] = useState('');

  const handleFormatDate = (date) => {
    setDate(date);
    setDateFormatted(formatDate(date));
  };

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.containerForm}>
        <form>
          {/* SECTION 1: Nombre del Evento */}

          <div className={styles.section}>
            {/* linea vertical */}

            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>1</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}

            <div className={styles.container1}>
              <p className={styles.title}>Nombre del Evento</p>
              <p className={styles.subTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla facilisis at vero eros et accumsan
                et iusto odio dignissim qui blandit praesent luptatum zzril
                delenit augue duis dolaore te feugait nulla facilisi.
              </p>
              <input
                className={styles.input}
                type="text"
                maxlength="75"
                placeholder="Nombre del evento"
                name="title"
                value={post.title}
                onChange={(e) => handleChange(e)}
              />
                  {errors.title && (
                        <p className={styles.errors}>{errors.name}</p>
                    )}
                    {post.title.length === 75  ?
                    <p className={styles.error}>Máximo 75 caracteres</p>
                      : <p className={styles.subInput}>Máximo 75 caracteres</p>
                      }
              
            </div>
          </div>

          {/* SECTION 2: Categorias */}

          <div className={styles.section}>
            {/* linea vertical */}

            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>2</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}

            <div className={styles.container1}>
              <p className={styles.title}>Categorías</p>
              <p className={styles.subTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh.{' '}
              </p>
              <div className={styles.containerChecks}>
                {categories.map((categorie) => (
                  <div className={styles.checks}>
                    <label className={styles.labelsChecks}>
                      <input
                        className={styles.checkBox}
                        type="checkbox"
                        name="categories"
                        value={categorie.name}
                        onChange={(e) => handleCategories(e)}
                      />
                      {categorie.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className={styles.checkOther}>
                <input
                  className={styles.checkBox}
                  defaultChecked={false}
                  type="checkbox"
                  name="categories"
                  value={post.categories}
                />
                <label className={styles.labelsChecks}>Otros</label>

                <div className={styles.otherCategorie}>
                  <label className={styles.subTitle}>
                    Si escogiste ‘otros’, especifica :{' '}
                  </label>
                  <input
                    className={styles.input2}
                    type="text"
                    name="otherCategories"
                    values={post.otherCategories}
                    onChange={(e) => handleOtherCategories(e)}
                  />
                </div>
              </div>
              {errors.categories && (
                        <p className={styles.errors}>{errors.categories}</p>
                    )}
            </div>
          </div>

          {/* SECTION 3: Descripcion */}

          <div className={styles.section}>
            {/* linea vertical */}

            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>3</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}

            <div className={styles.container1}>
              {/* shortDescription */}
              <div className={styles.containerDescription}>
                <p className={styles.title}>Descripción breve</p>
                <p className={styles.subTitle}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh.{' '}
                </p>
                <input
                  className={styles.input3}
                  type="text"
                  maxlength="100"
                  placeholder="descripción breve del evento"
                  name="shortDescription"
                  value={post.shortDescription}
                  onChange={(e) => handleChange(e)}
                />
                 {errors.shortDescription && (
                        <p className={styles.errorS}>{errors.shortDescription}</p>
                    )}
                
                {post.shortDescription.length===100?
                <p className={styles.error}>Máximo: 100 de caracteres</p>
                : <p className={styles.subTitle}>Máximo: 100 de caracteres</p>
                }
                {post.shortDescription.length>0 ?
                <p className={styles.subTitle}>Usetd va escribiendo: {post.shortDescription.length}/100 caracteres</p>
                : ''
                }
              </div>

              {/* longDescription */}
              <div className={styles.containerDescription}>
                <p className={styles.title}>Descripción detallada</p>
                <p className={styles.subTitle}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh.{' '}
                </p>
                <input
                  className={styles.input3}
                  type="text"
                  minlength="75"
                  placeholder="descripción detallada del evento"
                  name="longDescription"
                  value={post.longDescription}
                  onChange={(e) => handleChange(e)}
                />
                {errors.longDescription && (
                        <p className={styles.errorS}>{errors.longDescription}</p>
                    )}
                 {post.longDescription.length<75 && post.longDescription.length>0 ?
                <p className={styles.error}>Minimo 75 palabras</p>
                : <p className={styles.subTitle}>Minimo 75 palabras</p>
                }
                {post.longDescription.length>0 ?
                <p className={styles.subTitle}>Usetd va escribiendo: {post.longDescription.length} caracteres</p>
                : ''
                }
              </div>
            </div>
          </div>

          {/* SECTION 4: Pictures */}

          <div className={styles.section}>
            {/* linea vertical */}
            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>4</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}
            <div className={styles.container1}>
              <p className={styles.title}>Agrega fotos y/o videos</p>
              <p className={styles.subTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh.{' '}
              </p>
              <p className={styles.subTitle4}>Fotos del Evento</p>

              <div>
                <Swiper
                  slidesPerView={1}
                  navigation
                  spaceBetween={0}
                  modules={[Navigation]}
                  className={styles.mySwipper}
                >
                  {post.pictures.length ? (
                    post.pictures.map((picture, index) => {
                      return (
                        <SwiperSlide>
                          <picture />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <input
                      className={styles.inputPicture}
                      type="text"
                      placeholder="Arrastra los archivos aquí o haz clic en Agregar archivos"
                    />
                  )}
                </Swiper>
              </div>

              <label className={styles.subInput}>
                <input className={styles.checkBox4} type="checkbox" />
                Quiero que esta sea la portada
              </label>
            </div>
          </div>

          {/* SECTION 5: Ubicacion */}

          <div className={styles.section}>
            {/* linea vertical */}

            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>5</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}

            <div className={styles.container1}>
              {/* Title*/}

              <p className={styles.title}>¿Dónde es el evento?</p>
              <p className={styles.subTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh.{' '}
              </p>

              {/* CheckBoxOnLine*/}

              <div className={styles.containerOnLine}>
                <input
                  className={styles.checkBox4}
                  type="checkbox"
                  defaultChecked={false}
                  name="online"
                  value={post.online}
                  onChange={(e) => handleCheck(e)}
                  id="check"
                />
                <label> Este es un evento en linea</label>

                {/*Online*/}

                <div className={styles.online}>
                  <input
                    type="text"
                    placeholder="Colocar el enlace del evento"
                    name="link"
                    value={post.link}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/*notOnline*/}

                <div className={styles.notOnline}>
                  {/* Dpto - Municipio*/}
                  <div className={styles.containerDirection}>
                    <input
                      className={styles.select}
                      list="dptos"
                      id="myDep"
                      name="departamento"
                      placeholder="Departamento"
                      value={post.departamento}
                      onChange={(e) => handleChange(e)}
                    />
                    <datalist id="dptos">
                      {dptos &&
                        dptos.map((departamento) => (
                          <option key={departamento} value={departamento}>
                            {departamento}
                          </option>
                        ))}
                    </datalist>

                    <select className={styles.select} defaultValue="default">
                      <option value="default" disabled>
                        {post.departamento}
                      </option>
                      {dptos &&
                        dptos.map((departamento) => (
                          <option key={departamento} value={departamento}>
                            {departamento}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Direccion*/}

                  <input
                    className={styles.input5}
                    type="text"
                    placeholder="Dirección del evento"
                    name="direccion"
                    value={post.direccion}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    className={styles.input5}
                    type="text"
                    placeholder="Barrio"
                    name="barrio"
                    value={post.barrio}
                    onChange={(e) => handleChange(e)}
                  />

                  {/* Map*/}

                  <div className={styles.containerMap}>
                    <p className={styles.titleMap}>Ubicación en el mapa</p>
                    <img src={mapa} alt="imagen_mapa" />
                    <p className={styles.subtextMap}>Texto google legal aqui</p>

                    {/* <img  className={styles.icon} src={iconEditar} alt='n' /> */}
                    <button className={styles.btn}>
                      <img className={styles.icon} src={iconEditar} alt="n" />
                    </button>
                  </div>
                </div>
              </div>

              {/*especialRequires*/}

              <div className={styles.especialRequires}>
                <hr className={styles.hr}></hr>
                <p className={styles.subtextEspecial}>
                  Accesibilidad y requerimientos especiales
                </p>
                <div className={styles.especialDiv}>
                  <span>
                    <img
                      className={styles.iconExclamacion2}
                      src={iconExclamacion2}
                      alt="n"
                    />
                  </span>
                  <span>
                    <p className={styles.subTitle}>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh, Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh.{' '}
                    </p>
                  </span>
                </div>
                <input
                  type="text"
                  name="specialRequires"
                  value={post.specialRequires}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>

          {/*SECTION 6 */}

          <div className={styles.section}>
            {/* linea vertical */}

            <div className={styles.containerLine}>
              <ul className={styles.timeVerticalRed}>
                <li>
                  <b></b>
                  <span>6</span>
                </li>
              </ul>
              <ul className={styles.timeVertical}>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
                <li>
                  <b></b>
                </li>
              </ul>
            </div>

            {/* form */}

            <div className={styles.container1}>
              {/* cupos y precios */}

              <div>
                <p className={styles.title}>Costo y fecha</p>
                <p className={styles.subTitle}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh.{' '}
                </p>

                <div className={styles.containerInfo}>
                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Máximo número de participantes
                      <input
                        className={styles.subInfoInput}
                        type="txt"
                        placeholder="10"
                        name="cupos"
                        value={post.cupos}
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                    
                  </div>
                  {errors.cupos && (
                        <p className={styles.error}>{errors.cupos}</p>
                    )}

                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Precio por cupo
                      <div className={styles.labelS}>
                        <p>$</p>
                        <input
                          className={styles.subInfoInput}
                          type="txt"
                          placeholder="20.00"
                          name="price"
                          value={post.price}
                          onChange={(e) => handlePrice(e)}
                        />
                           {errors.price && (
                        <p className={styles.error}>{errors.price}</p>
                    )}
                      </div>
                    </label>
                    {post.price === '' ? <p>$21.990</p> : <p>ee</p>}
                    <p className={styles.subInfotxt}>
                      Precio al público incluyendo costo de manejo e IVA
                    </p>
                  </div>

                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Tu ganas por cupo
                      <div className={styles.labelS}>
                        <p>$</p>
                        <input
                          className={styles.subInfoInput}
                          type="txt"
                          placeholder="16.099"
                        />
                      </div>
                    </label>
                    <p className={styles.subInfotxt}>
                      Después de nuestra comisión + IVA
                    </p>
                    <Link to={`/user/profile`}>
                      <button className={styles.btn6}
                      >Ver Más</button>
                    </Link>
                 
                  </div>

                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Tu ganas por evento
                      <div className={styles.labelS}>
                        <p>$</p>
                        <input
                          className={styles.subInfoInput}
                          type="txt"
                          placeholder="160.901"
                        />
                      </div>
                    </label>
                    <p className={styles.subInfotxt}>
                      Esto sería lo que ganarías si se venden todos tus cupos
                    </p>
                    <Link to={`/user/profile`}>
                      <button className={styles.btn6}
                      >Ver Más</button>
                    </Link>
                  </div>
                </div>
              </div>

              <hr className={styles.hr}></hr>

              {/* time and date*/}

              <div className={styles.contTimeAndDate}>
                {/* date*/}

                <div className={styles.contDate}>
                  <label htmlFor="date">Fecha</label>

                  <div className={styles.contInputDate}>
                    <input type="text" id="date" value={dateFormatted} />

                    <div className={styles.containerDate}>
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        name="date"
                        value={post.dates.date}
                        onChange={(e) => handleCheck(e)}
                        id="checkCalendar"
                      />
                      <label htmlFor="checkCalendar" className={styles.label}>
                        <img src={calendar} alt="n" />
                      </label>

                      <div className={styles.calendar}>
                        <Calendar
                          color={'#D53E27'}
                          locale={locales['es']}
                          date={date}
                          onChange={(item) => handleFormatDate(item)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* start*/}

                <div className={styles.contStart}>
                  <label>Comienza</label>
                  <input type="time" 
                  name="start"
                  value={post.dates.start}
                  onChange={(e) => handleDate(e)}
                  />
                </div>

                {/* end*/}

                <div className={styles.contStart}>
                  <label>Termina</label>
                  <input type="time" 
                  name="end"
                  value={post.dates.end}
                  onChange={(e) => handleDate(e)}
                  />
                </div>

                {/* basquet*/}

                <div>
                  <img className={styles.basquet} src={basquet} alt="n" />
                </div>
              </div>

              {/* Code*/}

              <div className={styles.containerBono}>
                <div>
                  <input className={styles.checkDescuento} type="checkbox" />
                  <label className={styles.subTitle}>
                    Brindar códigos de descuento
                  </label>
                  <img className={styles.infoIcon} src={infoIcon} alt="n" />
                </div>
                <div>
                  <button className={styles.btnbono}>Mostrar</button>
                  <button className={styles.btnbono}>Ocultar</button>
                </div>
              </div>

              <hr className={styles.hr}></hr>

            
              <div  className={styles.checkOtherDate}>
                <input type="checkbox" id="check" />
                <label htmlFor="check"  > + Crear Nueva Fecha</label>
                               
                  {/* NEwdate*/}
                  <div className={styles.newDate}>

                    <div className={styles.contTimeAndDate}>
                      {/* date*/}

                      <div className={styles.contDate}>
                        <label htmlFor="date">Fecha</label>

                        <div className={styles.contInputDate}>
                          <input type="text" id="date" value={dateFormatted} />

                          <div className={styles.containerDate}>
                            <input
                              type="checkbox"
                              defaultChecked={false}
                              name="date"
                              value={post.dates.date}
                              onChange={(e) => handleCheck(e)}
                              id="checkCalendar"
                            />
                            <label htmlFor="checkCalendar" className={styles.label}>
                              <img src={calendar} alt="n" />
                            </label>

                            <div className={styles.calendar}>
                              <Calendar
                                color={'#D53E27'}
                                locale={locales['es']}
                                date={date}
                                onChange={(item) => handleFormatDate(item)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* start*/}

                      <div className={styles.contStart}>
                        <label>Comienza</label>
                        <input type="time" 
                        name="start"
                        value={post.dates.start}
                        onChange={(e) => handleDate(e)}
                        />
                      </div>

                      {/* end*/}

                      <div className={styles.contStart}>
                        <label>Termina</label>
                        <input type="time" 
                        name="end"
                        value={post.dates.end}
                        onChange={(e) => handleDate(e)}
                        />
                      </div>

                      {/* basquet*/}

                      <div>
                        <img className={styles.basquet} src={basquet} alt="n" />
                      </div>
                    </div>

                    {/* Code*/}

                    <div className={styles.containerBono}>
                      <div>
                        <input className={styles.checkDescuento} type="checkbox" />
                        <label className={styles.subTitle}>
                          Brindar códigos de descuento
                        </label>
                        <img className={styles.infoIcon} src={infoIcon} alt="n" />
                      </div>
                      <div>
                        <button className={styles.btnbono}>Mostrar</button>
                        <button className={styles.btnbono}>Ocultar</button>
                      </div>
                    </div>

                    <hr className={styles.hr}></hr>

                    <input type="checkbox" id="checknewDate" />
                    <label htmlFor="checknewDate"  > + Crear Nueva Fecha</label>

                </div>
              </div>

              

              <div>
                <p className={styles.acceptText}>
                  Al hacer clic en ‘Publicar’ confirma que ha leído y entendido
                  nuestros Términos y Condiciones, Notas legales de privacidad y
                  Seguridad.
                </p>

                <div className={styles.btnContainer}>
                  <button className={styles.viewBtn}>Vista Previa</button>

                  <button className={styles.submitBtn} type="submit">
                    {' '}
                    Publicar Evento
                  </button>

                  <button className={styles.submitBtn} type="submit">
                    Guardar y Publiar Luego
                  </button>
                </div>
                <p>Debes llenar todos los campos para poder continuar.</p>

                <button className={styles.cancelBtn} type="submit">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/*SECTIONS BUTTONS*/}
      <div className={styles.containerBtnSection}>
        <button
          className={styles.btnSectionMove}
          onClick={() => scrollSections(-2000)}
        >
          <KeyboardArrowUpIcon
            sx={{
              fontSize: '40px',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              backgroundColor: '#D53E27',
            }}
          />
        </button>
        <button
          className={styles.btnSectionMove}
          onClick={() => scrollSections(2000)}
        >
          <KeyboardArrowDownRoundedIcon
            sx={{
              fontSize: '40px',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              backgroundColor: '#D53E27',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default EventCreateForm;

/**/

{
  /* <div className={styles.subcon}>
                  
                   
                    // <div className={styles.contDate}>
                    //     <input type="checkbox" id="checkCalendar" />
                    //     <label htmlFor="checkCalendar" className={styles.label}>
                    //     <img className={styles.icon_calendar} src={calendar} alt='n' />
                    //     </label>
                        {/* <input type='date' /> */
}
{
  /* <img className={styles.calendar} src={calendar} alt='n' /> */
}
// <div className={styles.Calendar}>
{
  /* <Calendar
                                color={'#D53E27'}
                                locale={locales['es']}
                                date={date}
                                onChange={(item) => handleFormatDate(item)}
                            /> */
}
// </div>
// </div>
// </div> */}
