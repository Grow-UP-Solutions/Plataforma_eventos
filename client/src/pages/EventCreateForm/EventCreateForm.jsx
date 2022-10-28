import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useContext,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ImageIcon from '@mui/icons-material/Image';
import mapa from '../../assets/imgs/mapa2.png';
import { formatDate } from '../../utils/formatDate';
import styles from './EventCreateForm.module.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConstructionOutlined, ContactMailOutlined, EmergencyRecordingSharp } from '@mui/icons-material';
import { getColombia , postEvent } from '../../redux/actions';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dotenv from 'dotenv';
import {formatDateForm} from '../../utils/formatDateForm';
import {Button ,Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import 'bootstrap'
import { Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import { IoLocationOutline } from 'react-icons/io5';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { AiOutlineClose } from 'react-icons/ai';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import eventsApi from '../../axios/eventsApi';





const EventCreateForm = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()



  //--------------------------------------------------//
  //               USUARIO              //
  const { user } = useContext(AuthContext);
  const id = user.uid;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
   }, [user]);

  useEffect(() => {}, [userData]);
 

  const getUserData = async () => {
      let userResult = {}
      if(user.uid){
        userResult= await eventsApi.get(`/users/${user.uid}`);
        setUserData(userResult.data)
      }
    }

  console.log('user:',user)
  console.log('id:',id)
  console.log('userData:',userData)


  //--------------------------------------------------//
  //               DEPARTAMENTOS              //

  useEffect(() => {
    dispatch(getColombia())
  },[])

  const departamentosAll = useSelector(state=>state.departamentos)
 				
  const departamentosFilter = departamentosAll.map(departamento=>{
    return{
      departamento:departamento.departamento,
      municipio:departamento.municipio
    }
  } )

  const departamentos = [];

const elementExist = (departamentosFilter, value) => {
  let i = 0;
  while (i < departamentosFilter.length) {
    if (departamentosFilter[i].departamento == value) return i;
    i++;
  }
  return false;
}

departamentosFilter.forEach((e) => {
  let i = elementExist(departamentos, e.departamento);
  if (i === false) {
    departamentos.push({
      "departamento": e.departamento,
      "municipio": [e.municipio]
    });
  } else {
    departamentos[i].municipio.push(e.municipio);
  }
});

const capitales = ['Medellín','Tunja','Montería','Quibdó','Pasto' ,'Bucaramanga','Villavicencio' ,'Barranquilla','Cartagena de Indias','Manizales','Florencia','Popayán' ,'Valledupar' ,'Bogotá','Neiva','Riohacha' ,'Santa Marta','Armenia','Pereira' ,'Sincelejo','Ibagué','Arauca','Yopal','Mocoa' ,'Leticia','Inírida','Mitú', 'Puerto Carreño', 'San José del Guaviare','San Andrés','Bogota','Cúcuta','Santiago de Cali']



const nuevoArrayDepartamentos = departamentos.map((item, indice) => ({...item, capital: capitales[indice]}))


  //--------------------------------------------------//
  //               EVENTO HARDCODEADO           //

// const [post, setPost] = useState({
  //   idOrganizer:'632cbed4f208f44f5333af48',
  //   title: 'Hola',
  //   categories: ['Belleza'],
  //   otherCategorie: '',
  //   shortDescription: 'Alta',
  //   longDescription: 'Torneo de playStation, donde el campeon actual defiende su titulo y bvuscara coronarse nuevamente. Torneo online desde cualquier parte del mundo podes jugar.',
  //   pictures: [ {
  //     cover: true,
  //     picture: 'https://culturageek.com.ar/wp-content/uploads/2022/08/Playstation-Torneo-Mexico-Portada.jpg',
  //   }],
  //   online: 'false',
  //   link: '',
  //   departamento: 'Antioquia',
  //   municipio: 'Medellin',
  //   direccion: 'Aaa 21',
  //   barrio: 'Aaaa',
  //   specialRequires: '',
  //   dates:[
  //     { 
  //       date: '15/12/2022', 
  //       start : '10:00', 
  //       end:'11:00', 
  //       year:0 ,  
  //       cupos:32, 
  //       price:10000, 
  //       sells: 12, 
  //       isPublic:true,
  //       precioAlPublico:'',
  //       gananciaCupo:'',
  //       gananciaEvento:'',
  //       dateFormated:'Octubre 30 de 2022'
  //      }
  //    ],
  //   isPublic:true,
  //   revision:false
  // });



  //--------------------------------------------------//
  //               POST Y ERROR            //

    useEffect(() => {
    if (user) {
      setPost({
        ...post,
        idOrganizer: userData._id,
        title: '',
        categories: [],
        otherCategorie: '',
        shortDescription: '',
        longDescription: '',
        pictures: [],
        online: '',
        link: '',
        departamento: '',
        municipio: '',
        direccion: '',
        barrio: '',
        specialRequires: '',
        dates:[{ 
          date: "", 
          start : "", 
          end:"" , 
          year:0 ,  
          cupos:0, 
          price:0, 
          sells: 0 , 
          isPublic:true,
          precioAlPublico:'',
          gananciaCupo:'',
          gananciaEvento:'',
          dateFormated:'',
          inRevision: false
         }],
        isPublic:true,
        inRevision: false
      });
    }
  }, [userData]);

  const [post, setPost] = useState({
    idOrganizer: '',
    title: '',
    categories: [],
    otherCategorie: '',
    shortDescription: '',
    longDescription: '',
    pictures: [],
    online: '',
    link: '',
    departamento: '',
    municipio: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    dates:[{ 
      date: "", 
      start : "", 
      end:"" , 
      year:0 ,  
      cupos:0, 
      price:0, 
      sells: 0 , 
      isPublic:true,
      precioAlPublico:'',
      gananciaCupo:'',
      gananciaEvento:'',
      dateFormated:'',
      inRevision: false
     }],
    isPublic:true,
    inRevision: false
  });

  


  const [errors, setErrors] = useState({
    title: '',
    categories: '',
    otherCategorie: '',
    shortDescription: '',
    longDescription: '',
    pictures: '',
    link: '',
    departamento: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos:'',
    price:'',
    dates:'',
    isPublic:''
  
  })

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

 

  function validate(post) {
     let errors = {}
                
     let letras =  (/^[a-zA-Z]*$/g)
     let offensiveWord= /\b(perro|gato)\b/i
     let mail = (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm)
     let webSite =(/\b(http|https|www)\b/i)
     let numeroYdecimales = /^\d*\.?\d*$/
     let numero = /^[0-9]*$/g
     let notNumber = /^(?=.*\d).+$/g
     
    if (!post.title) {
      errors.title = true
    }

    if (post.title.match(mail)) {
      errors.title = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.title.match(webSite)) {
      errors.title = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.title.match(offensiveWord)) {
      errors.title = 'Palabra ofensiva'
    }

    if (post.title.match(notNumber)) {
      errors.title = 'No puedes ingresar un numero'
    }

    if (!post.categories[0]) {
      errors.categories = true
    }

    if (post.categories.length > 3) {
      errors.categories = 'Solo podes seleccionar 3 categorias'
    }

    // if (!post.otherCategorie.match(letras)) {
    //   errors.otherCategorie = 'Solo se puede agregar una palabra'
    // }

     
    if (!post.shortDescription) {
      errors.shortDescription = true
    }

    if (post.shortDescription.match(mail)) {
      errors.shortDescription = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.shortDescription.match(webSite)) {
      errors.shortDescription = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.shortDescription.match(offensiveWord)) {
      errors.shortDescription = 'Palabra ofensiva'
    }

    if (post.shortDescription.match (notNumber)) {
      errors.shortDescription = 'No puedes ingresar un numero'
    }


    if (!post.longDescription) {
      errors.longDescription = true
    }

    if (post.longDescription.match(mail)) {
      errors.longDescription = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.longDescription.match(webSite)) {
      errors.longDescription = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.longDescription.match(offensiveWord)) {
      errors.longDescription = 'Palabra ofensiva'
    }

    if (post.shortDescription.match (notNumber)) {
      errors.shortDescription = 'No puedes ingresar un numero'
    }

    if (!post.pictures[0]) {
      errors.pictures = 'Debe ingresar al menos una imagen'
    }

    let repetidas= post.pictures.filter(picture=>picture.cover===true)

    if (repetidas.length>1) {
      errors.pictures = 'Solo puede elegir una portada'
    }



    if (post.online) {

      if (!post.link) {
        errors.link = true
      }

      if (post.link.match(offensiveWord)) {
        errors.link = 'Palabra ofensiva'
      }

    } else {

    if (!post.departamento) {
      errors.departamento = true
    }

    if (!post.municipio) {
      errors.municipio = true
    }

    if (!post.direccion) {
      errors.direccion = true
    }

    if (post.direccion.match(mail)) {
      errors.direccion = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.direccion.match(webSite)) {
      errors.direccion = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.direccion.match(offensiveWord)) {
      errors.direccion = 'Palabra ofensiva'
    }

    if (!post.barrio) {
      errors.barrio = true
    }

    if (post.barrio.match(mail)) {
      errors.barrio = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.barrio.match(webSite)) {
      errors.barrio = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.barrio.match(offensiveWord)) {
      errors.barrio = 'Palabra ofensiva'
    }
  }

    if (post.specialRequires.match(mail)) {
      errors.specialRequires = 'No puedes ingresar un email o link a redes sociales'
    }

    if (post.specialRequires.match(webSite)) {
      errors.specialRequires = 'No puedes ingresar un dominio o pagina web'
    }

    if (post.specialRequires.match(offensiveWord)) {
      errors.specialRequires = 'Palabra ofensiva'
    }

    if(post.dates.length>0){
      for (var i=0; i<post.dates.length;i++ ){
        if (!post.dates[i].cupos) {
          errors.cupos= true
        }
      }
    }

    if(post.dates.length>0){
      for (var i=0; i<post.dates.length;i++ ){
        if (!post.dates[i].price) {
          errors.price= true
        }
      }
    }
    
 
    // for (var i=0; i<post.dates.length;i++ ){
    //   if (!post.dates[i].price.match(numeroYdecimales) ) {
    //     errors.dates= 'Debe ser un numero'
    //   }
    // }

    for (var i=0; i<post.dates.length;i++ ){
      if (!post.dates[i].date ||!post.dates[i].start ||!post.dates[i].end ) {
        errors.dates= true
      }
    }
    
    for (var i=0; i<post.dates.length;i++ ){
      if (post.dates[i].start > post.dates[i].end && post.dates[i].end ) {
        errors.dates = 'Error, hora de fin menor a hora de inicio'
      }
    }

    for (var i=0; i<post.dates.length;i++ ){
      for(var j=1; j<post.dates.length;j++ ){
      if (  post.dates[i].start.length>0 && post.dates[j].start.length>0 && post.dates[i].end.length>0
        && post.dates[j].end.length>0 && post.dates[i].date === post.dates[j].date && i !== j ){
          if(post.dates[i].start === post.dates[j].start||
            post.dates[i].end === post.dates[j].end ||
            post.dates[i].start > post.dates[j].start && post.dates[i].start < post.dates[j].end ||
            post.dates[i].end > post.dates[j].start && post.dates[i].end < post.dates[j].end||
            post.dates[i].start < post.dates[j].start && post.dates[i].end > post.dates[j].end ||
            post.dates[i].start > post.dates[j].start && post.dates[i].end < post.dates[j].end ){
            errors.dates = 'Fechas cruzadas'
          }         
        }
        }      
    }
    
    return errors
  }

  //--------------------------------------------------//
  //               POST - TITLE,DESCRIPTION       //


  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }


  //--------------------------------------------------//
  //               POST - CATEGORIA                   //

 
  
  const [seleccionados, setSeleccionados] = useState([])
  const [changed, setChanged] = useState(false)


  function handleCategories(e) {
    var categorieName = e.target.value
    console.log('targetcat:',e.target.value)
    if (!e.target.checked) {
      console.log('seleccionados:',seleccionados)
      let seleccion = seleccionados.filter((categorie) => categorie !== e.target.value)
      console.log('seleccion:',seleccion)
      setSeleccionados(seleccion)
      setPost({
        ...post,
        categories:seleccion
      })
    } else {
      let categorieCheck = categories.find((categorie) => categorie.name === categorieName)
      console.log('categorieCheck:',categorieCheck)
      setSeleccionados([...seleccionados, categorieCheck.name])
      setPost({
        ...post,
        categories:[...post.categories, categorieCheck.name]
      })
    }
  }

  useEffect(() => {
    var checkeds = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false
    }
    setSeleccionados([])
    setPost({
      ...post,
      categories:[]
    })
  }, [changed])


  function handleOtherCategorie(e) {
    setPost({
      ...post,
      otherCategorie:  e.target.value,
    });
  }

  //--------------------------------------------------//
  //                POST - DROP DRAG IMAGES                //

  
const wrapperRef = useRef(null);


const onDragEnter = () => wrapperRef.current.classList.add('dragover');

const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

const onDrop = () => wrapperRef.current.classList.remove('dragover');

const onFileDrop = (e) => {
  
  if (e.target.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (e)=>{
          e.preventDefault();
         setPost({
          ...post,
          pictures: [...post.pictures, {cover:false, picture: e.target.result}]}
         )
         }
      ;
  }
}
const fileRemove = (item) => {
  const updatedPictures=[...post.pictures]
  updatedPictures.splice(post.pictures.indexOf(item), 1);
  setPost({
    ...post,
    pictures:updatedPictures
  })
  ;
}

function handleCover(e){
  
const todas = [...post.pictures]

if(e.target.checked){
todas.map((foto)=>{
    if(foto.picture===e.target.value){
      foto.cover = true}
  })
  setPost({
    ...post,
    pictures:todas
  })
}else{
  todas.map((foto)=>{
    if(foto.picture===e.target.value){
      foto.cover = false}
  })
  setPost({
    ...post,
    pictures:todas
  })
}
}

  //--------------------------------------------------//
  //               POST  UBICACION                //

  function handleCheck(e) {
    if (e.target.checked) {
      setPost({
        ...post,
        [e.target.name]: true,
        departamento:'',
        municipio:'',
        barrio:'',
        direccion:''
      });
    } else {
      setPost({
        ...post,
        [e.target.name]: false,
        link:''
      });
    }
  }


  function handleLink(e) {
    setPost({
      ...post,
      link: e.target.value,
    });
  }

  dotenv.config();
  const location = `${post.municipio}, ${post.departamento}`;
  const apiKey = 'AIzaSyBr-FUseqSbsY6EMqIGNnGmegD39R--nBA';
  const zoom = '14';
  const size =  '200x100';
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=${zoom}&size=${size}&key=${apiKey}`;


 
  //--------------------------------------------------//
  //               POST  PRICE  && DATE        //

  const costoDeManejo = 1672.27
  const IVA = 0.19
  const comision = 0.16

  const a = costoDeManejo * IVA


  let handleChanges = (i, e ) => {
    let newFechas = [...post.dates];
    
    newFechas[i][e.target.name] = e.target.value;
    newFechas[i].precioAlPublico=parseFloat(newFechas[i].price) + parseFloat(costoDeManejo) + parseFloat(a);
    newFechas[i].gananciaCupo = parseFloat(newFechas[i].price)-(((parseFloat(newFechas[i].price)*parseFloat(comision))+((parseFloat(newFechas[i].price)*parseFloat(comision)*parseFloat(IVA)))))
    newFechas[i].gananciaEvento = parseFloat(newFechas[i].gananciaCupo) * parseInt(newFechas[i].cupos)
    if(e.target.name==='date'){
      newFechas[i].dateFormated = formatDateForm(e.target.value)
    }
    setPost({
      ...post,
      dates:newFechas 
     })   
    }

  
  let addFormFields = () => {
    setPost({
      ...post,
      dates:[...post.dates, { date: "", start : "", end:"" , year:0, cupos:'', price:'',isPublic:true,sells:0 , precioAlPublico:'',gananciaCupo:'',gananciaEvento:''}]
    })
  }

  let removeFormFields = (i) => {
    let newFechas = [...post.dates];
      newFechas.splice(i, 1);
      return swal({
        title: "Esta acción eliminara esta fecha.",
        icon: "warning",
        buttons:['Cancelar acción','Continuar'],
        dangerMode: true,
      })
      .then((continuar)=>{  
        if(continuar){                 
          setPost({
            ...post,
            dates:newFechas 
          })
        }
      })
      
      
  }
 
  var fecha = new Date();
  var anio = fecha.getFullYear();
  var dia = fecha.getDate();
  var _mes = fecha.getMonth();//viene con valores de 0 al 11
  _mes = _mes + 1;//ahora lo tienes de 1 al 12
  if (_mes < 10)//ahora le agregas un 0 para el formato date
  { var mes = "0" + _mes;}
  else
  { var mes = ''+_mes;}

  const fechaMinima = anio+'-'+mes+'-'+dia;
  

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
  //                VISTA PREVIA         //

  const [getPreview, setGetPreview] = useState(false);


  //--------------------------------------------------//
  //                 SAVE           //


  function handleSave(e){
    e.preventDefault()
    setPost({
      ...post,
      isPublic:false,
    })
    if (Object.values(errors).length > 0) {
      setFailedSubmit(true)
      return swal({
        title: "Completa los campos faltantes",
        icon: "warning",
        button: "Completar",
        dangerMode: true,
      });
    }else{
    swal({
      title: "Tu evento será guardado",
      buttons: ["Cerrar", "Guardar"],
      dangerMode: true,
    })
    .then((guardar) => {
      if (guardar) {
        dispatch(postEvent(post))
        swal("Tu evento ha sido guardado ", {
          icon: "success",
        });
        console.log('postEnviado:',post)
        setPost({
          idOrganizer:'',
          title: '',
          categories: [],
          otherCategorie: '',
          shortDescription: '',
          longDescription: '',
          pictures: [],
          online: '',
          link: '',
          departamento: '',
          municipio: '',
          direccion: '',
          barrio: '',
          specialRequires: '',
          dates:[{ 
            date: "", 
            start : "", 
            end:"" , 
            year:0 ,  
            cupos:0, 
            price:0, 
            sells: 0 , 
            isPublic:true,
            precioAlPublico:'',
            gananciaCupo:'',
            gananciaEvento:'',
            dateFormated:'',
            inRevision: false
          }],
          isPublic:true,
          inRevision: false
     })
         navigate("user/perfil/datos" )
      } 
    }
    )
  }}

    //--------------------------------------------------//
  //                CANCEL          //



  function handleDelete(e){
    e.preventDefault()
    swal({
      title: "Esta acción borrara todo la información ingresada o modificada en esta sesión",
      buttons: ["Cerrar", "Continuar"],
      dangerMode: true,
    })
    .then((continuar) => {
      if (continuar) {
        navigate("user/perfil/datos" )
      } 
    }
   )
  }



  
  //--------------------------------------------------//
  //                  SUBMIT              //

  const [failedSubmit, setFailedSubmit] = useState(false)
  


  function handleSubmit(e) {
    e.preventDefault()
    if (Object.values(errors).length > 0) {
      setFailedSubmit(true)
      return swal({
        title: "Completa los campos faltantes",
        icon: "warning",
        button: "Completar",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Deseas publicar este evento? ",
        buttons: true,
        dangerMode: true,
      })
      .then((publicar) => {
        if (publicar) {
          dispatch(postEvent(post))
          swal("Tu evento ha sido publicado. Recibirás un correo con los detalles. ", {
            icon: "success",
          });
          console.log('postEnviado:',post)
          setPost({
            idOrganizer:'',
            title: '',
            categories: [],
            otherCategorie: '',
            shortDescription: '',
            longDescription: '',
            pictures: [],
            online: '',
            link: '',
            departamento: '',
            municipio: '',
            direccion: '',
            barrio: '',
            specialRequires: '',
            dates:[{ 
              date: "", 
              start : "", 
              end:"" , 
              year:0 ,  
              cupos:0, 
              price:0, 
              sells: 0 , 
              isPublic:true,
              precioAlPublico:'',
              gananciaCupo:'',
              gananciaEvento:'',
              dateFormated:'',
              inRevision: false
            }],
            isPublic:true,
            inRevision: false
       })
        navigate("user/perfil/datos" )
        } 
      });
    } 
  }

  
  return (
  <div>    
    <div className={styles.container}>  
      <div ref={ref} className={styles.containerForm}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            {/* SECTION 1: Nombre del Evento */}
            <div className={styles.section1}>
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
                {failedSubmit && errors.title?(               
                    <input
                    className={styles.input}
                    type="text"
                    maxlength="75"
                    placeholder="Nombre del evento"
                    name="title"
                    value={post.title}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                
                  ):   <input
                  className={styles.input}
                  type="text"
                  maxlength="75"
                  placeholder="Nombre del evento"
                  name="title"
                  value={post.title}
                  onChange={(e) => handleChange(e)}
                />}
          
                {post.title.length === 75  ?
                <p className={styles.errors}>Máximo 75 caracteres</p>
                  : <p className={styles.subInput}>Máximo 75 caracteres</p>
                  }  
                {errors.title? 
                  <p className={styles.errors}>{errors.title}</p>
                : null}    

              </div>
            </div>

            {/* SECTION 2: Categorias */}
            <div className={styles.section2}>
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

                  {categories.map ((categorie) => (
                    <div className={styles.checks}>
                      <label className={styles.labelsChecks}>
                        <input
                          className={styles.checkBox}
                          type="checkbox"
                          value={categorie.name}
                          onChange={(e) => handleCategories(e)}
                          defaultChecked={false}
                        />
                        {categorie.name}
                      </label>
                    </div>
                  ))}
                  
                </div>

                {/* otra categoria*/}                 
                <div className={styles.checkOther}>
                  <input
                    className={styles.checkBox}
                    defaultChecked={false}
                    type="checkbox"
                    name="categories"
                    value={post.categories}
                  />
                  <label className={styles.labelsChecks}>Otro</label>

                  <div className={styles.otherCategorie}>
                    <label className={styles.subTitle}>
                      Si escogiste ‘otro’, especifica :{' '}
                    </label>
                    {failedSubmit && errors.otherCategorie ?
                  
                        <input
                        className={styles.input2}
                        type="text"
                        name="otherCategorie"
                        values={post.otherCategorie}
                        onChange={(e) => handleOtherCategorie(e)}
                        required
                        />   
                                      
                        :
                        <input
                        className={styles.input2}
                        type="text"
                        name="otherCategorie"
                        values={post.otherCategorie}
                        onChange={(e) => handleOtherCategorie(e)}
                        /> 
                    }
                    
                      
                  </div>
                
                </div>

                {errors.categories &&
                <p className={styles.errors}>{errors.categories}</p>
                }

                {failedSubmit && errors.categories && errors.categories<3?
                <p className={styles.errors}>Debes seleccionar al menos una categoría</p>
                :''
                }

                {failedSubmit && errors.otherCategorie ?
                  <p className={styles.errors}>Solo puedes una ingresar una categoria</p>
                  :''
                  }     
              </div>
            </div>

            {/* SECTION 3: Descripcion */}
            <div className={styles.section3}>
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
                  {failedSubmit && errors.shortDescription?
                  <textarea
                    className={styles.textareaShort}
                    type="text"
                    maxlength="100"
                    placeholder="descripción breve del evento"
                    name="shortDescription"
                    value={post.shortDescription}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  :
                  <textarea
                    className={styles.textareaShort}
                    type="text"
                    maxlength="100"
                    placeholder="descripción breve del evento"
                    name="shortDescription"
                    value={post.shortDescription}
                    onChange={(e) => handleChange(e)}
                  />
                  }
                  
                  {post.shortDescription.length===100?
                  <p className={styles.errors}>Máximo: 100 de caracteres</p>
                  : <p className={styles.subTitle}>Máximo: 100 de caracteres</p>
                  }
                  {post.shortDescription.length>0 ?
                  <p className={styles.subTitle}>Usetd va escribiendo: {post.shortDescription.length}/100 caracteres</p>
                  : ''
                  }
                  {errors.shortDescription?
                  <p className={styles.errors}>{errors.shortDescription}</p>
                  : null}    
                </div>

                {/* longDescription */}
                <div className={styles.containerDescription}>
                  <p className={styles.title}>Descripción detallada</p>
                  <p className={styles.subTitle}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                    diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam nonummy nibh.{' '}
                  </p>
                  {failedSubmit && errors.longDescription ?
                  <textarea
                  className={styles.textareaLong}
                  type="text"
                  minlength="75"
                  placeholder="descripción detallada del evento"
                  name="longDescription"
                  value={post.longDescription}
                  onChange={(e) => handleChange(e)}
                  required
                  />
                  
                  :
                  <textarea
                    className={styles.textareaLong}
                    type="text"
                    minlength="75"
                    placeholder="descripción detallada del evento"
                    name="longDescription"
                    value={post.longDescription}
                    onChange={(e) => handleChange(e)}
                  />
                  }

                  {post.longDescription.length<75 && post.longDescription.length>0  ?
                  <p className={styles.errors}>Minimo 75 caracteres</p>
                  : <p className={styles.subTitle}>Minimo 75 caracteres</p>
                  }
                  {post.longDescription.length>0 ?
                  <p className={styles.subTitle}>Usetd va escribiendo: {post.longDescription.length} caracteres</p>
                  : ''
                  }
                  {errors.longDescription ? 
                  <p className={styles.errors}>{errors.longDescription}</p>
                  : null}    
                </div>
              </div>
            </div>

            {/* SECTION 4: Pictures */}
            <div className={styles.section4}>
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
        
                {failedSubmit && errors.pictures ?
                  <div
                    ref={wrapperRef}
                      className={styles.errorsPicture}
                      onDragEnter={onDragEnter}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    > 
                    <div>
                    <ImageIcon sx={{ fontSize: '50px', color: 'grey' }} />
                    </div>
                    <p>Fotos: Jpg, png, Max.100kb </p> 
                    <p>Videos: .MP4 Max 100kb</p>      
                    <p>"Arrastra los archivos aquí o haz click para agregar archivos"</p>
                    <input 
                      type="file" 
                      value="" 
                      name="pictures"
                      onChange={onFileDrop}
                    />
                    {errors.pictures?
                    <p className={styles.errors}>{errors.pictures}</p>
                    : null
                    }
                  </div>              
                  :
                  <div
                    ref={wrapperRef}
                      className={styles.dropFileIput}
                      onDragEnter={onDragEnter}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    > 
                    <div>
                    <ImageIcon sx={{ fontSize: '50px', color: 'grey' }} />
                    </div>
                    <p>Fotos: Jpg, png, Max.100kb </p> 
                    <p>Videos: .MP4 Max 100kb</p>      
                    <p>"Arrastra los archivos aquí o haz click para agregar archivos"</p>
                    <input 
                      type="file" 
                      placeholder='Arrastra los archivos aquí o haz click para agregar archivos'
                      value="" 
                      name="pictures"
                      onChange={onFileDrop}
                    />
                  </div>
                }
            

                {
                  post.pictures.length > 0 ? (
                    <div className={styles.dropFilePreview}>
                      <p>
                        Ready to upload
                      </p>
                      <Swiper
                        slidesPerView={1}
                        navigation
                        spaceBetween={0}
                        modules={[Navigation]}
                        className={styles.mySwipper}
                      >
                      {
                          post.pictures.map((item, index) => (
                              <div key={index} className={styles.mySwiper}>
                                <SwiperSlide>
                                  <img className={styles.mySwiperImg} src={item.picture} alt=''/>                                
                                  <button className={styles.mySwiperBtnDel} onClick={() => fileRemove(item)}>x</button>
                                  <label className={styles.subInput}>
                                    <input 
                                      className={styles.checkBox4} 
                                      type="checkbox" 
                                      name='cover'
                                      value={item.picture}
                                      onChange={e=>handleCover(e)}                              
                                      defaultChecked={false}
                                    />                 
                                    Quiero que esta sea la portada
                                  </label>
                                </SwiperSlide>
                              </div>
                          ))
                      }
                      </Swiper>
                      {errors.pictures?
                      <p className={styles.errors}>{errors.pictures}</p>
                      : null
                    }
                    </div>
                  ) : null
                }
      
              </div>
            </div>

            {/* SECTION 5: Ubicacion */}
            <div className={styles.section5}>
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

                  {failedSubmit && errors.link?
                  <div className={styles.online}>
                    <input
                    type="text"
                    placeholder="Colocar el enlace del evento"
                    name="link"
                    value={post.link}
                    onChange={(e) => handleLink(e)}
                    required
                  />
                    </div>               
                  :
                  <div className={styles.online}>
                    <input
                      type="text"
                      placeholder="Colocar el enlace del evento"
                      name="link"
                      value={post.link}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  }
                  {errors.link?
                    <p className={styles.errors}>{errors.link}</p>
                    : null
                  }

                  {/*notOnline*/}
                  <div className={styles.notOnline}>
                    {/* Dpto */}
                    <div className={styles.containerDirection}>
                      {failedSubmit && errors.departamento?
                      <input
                      className={styles.select}
                      list="dptos"
                      id="myDep"
                      name="departamento"
                      placeholder="Departamento"
                      value={post.departamento}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                      
                      :
                      <input
                        className={styles.select}
                        list="dptos"
                        id="myDep"
                        name="departamento"
                        placeholder="Departamento"
                        value={post.departamento}
                        onChange={(e) => handleChange(e)}
                      />
                      }
                      <datalist id="dptos">
                        {nuevoArrayDepartamentos &&
                          nuevoArrayDepartamentos.map((departamento) => (
                            <option value={departamento.departamento}>
                              {departamento.departamento}
                            </option>
                          ))}
                      </datalist>

                    
                    
                    

                      {/* Municipio*/}

                      {nuevoArrayDepartamentos &&
                        nuevoArrayDepartamentos.map((departamento)=>(
                          <div>
                            {departamento.departamento === post.departamento &&
                            <div>
                              {failedSubmit && errors.municipio ?
                              <div  className={styles.Muni}>
                                      <input
                                      list="municipio"
                                      id="myMuni"
                                      name="municipio"
                                      placeholder={departamento.capital}
                                      value={post.municipio}
                                      onChange={(e) => handleChange(e)}
                                      required
                                      />
                                    <datalist id="municipio">
                                      <option>
                                        {departamento.capital}
                                      </option>   
                                      {departamento.municipio.map((m)=>                                
                                        <option >
                                          {m}
                                        </option>                              
                                        )}
                                    </datalist>
                              </div>
                              :
                              <div  className={styles.Muni}>
                              <input
                                list="municipio"
                                id="myMuni"
                                name="municipio"
                                placeholder={departamento.capital}
                                value={post.municipio}
                                onChange={(e) => handleChange(e)}
                              />
                              <datalist id="municipio">
                              <option>
                              {departamento.capital}
                              </option>   
                            {departamento.municipio.map((m)=>                                
                                <option >
                                  {m}
                                </option>                              
                            )
                            }
                          </datalist>
                          </div>
                            }                           
                                                      
                              </div>
                            }
                          </div>
                        )
                        )

                      }
                    
                    </div>

                    {/* Direccion*/}
                    {failedSubmit && errors.direccion?
                    <div className={styles.direccionError}>
                    <input
                    className={styles.input5}
                    type="text"
                    placeholder="Dirección del evento"
                    name="direccion"
                    value={post.direccion}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                    </div>                                   
                    :
                    <input
                      className={styles.input5}
                      type="text"
                      placeholder="Dirección del evento"
                      name="direccion"
                      value={post.direccion}
                      onChange={(e) => handleChange(e)}
                    />
                    }
                    {errors.direccion? 
                    <p className={styles.errors}>{errors.direccion}</p>
                    : null}  

                    {/* Barrio*/}
                    {failedSubmit && errors.barrio?
                    <div className={styles.barrio}>
                    <input
                    className={styles.input5}
                    type="text"
                    placeholder="Barrio"
                    name="barrio"
                    value={post.barrio}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                    </div>                
                    :
                    <input
                      className={styles.input5}
                      type="text"
                      placeholder="Barrio"
                      name="barrio"
                      value={post.barrio}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                    {errors.barrio? 
                    <p className={styles.errors}>{errors.barrio}</p>
                    : null}  

                    {/* Map*/}
                    <div className={styles.containerMap}>
                      <p className={styles.titleMap}>Ubicación en el mapa</p>
                      {post.municipio?
                      <div>
                      <img 
                        src={url} 
                        alt="mapaStaticGoogleMaps" 
                      />
                      </div>
                      :
                      <div>
                      <img 
                        src={mapa} 
                        alt="mapaStaticGoogleMaps" 
                      />
                      </div>}
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
                {errors.specialRequires? 
                <p className={styles.errors}>{errors.specialRequires}</p>
                : null}  
              </div>
            </div>

            {/*SECTION 6: Dates */}
            <div className={styles.section6}>
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
                {/* titulo*/}
                <div>
                  <p className={styles.title}>Costo y fecha</p>
                  <p className={styles.subTitle}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                    diam nonummy nibh, Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam nonummy nibh.{' '}
                  </p>
                </div>

                <hr className={styles.hr}></hr>

                {/* fechas*/}
                <div>            
                    {post.dates.map((element, index) => (
                    <div>
                      <div className={styles.containerInfo} key={index}>
                        {/* cupos*/}
                        <div className={styles.containerSubInfo}>
                          <label className={styles.subInfoTitle}>
                            Máximo número de participantes
                            {failedSubmit && errors.cupos?
                            <input
                            id='cupos'   
                            type="number"
                            placeholder="10"
                            name="cupos"
                            value={element.cupos || ""} 
                            onChange={e => handleChanges(index, e)}
                            required
                            />
                            :
                            <input
                              id='cupos'
                              className={styles.subInfoInput}
                              type="number"
                              placeholder="10"
                              name="cupos"
                              value={element.cupos || ""} 
                              onChange={e => handleChanges(index, e)}
                            />
                            }
                          </label>          
                        </div>

                        {/* precio*/}
                        <div className={styles.containerSubInfo}>
                          <label className={styles.subInfoTitle}>
                            Precio por cupo
                            <div className={styles.labelS}>
                              <p>$</p>
                              {failedSubmit && errors.dates?
                              <input
                              type='number'
                              placeholder="20.00"
                              name="price"
                              value={element.price || ""} 
                              onChange={e => handleChanges(index, e)}
                              required
                              />
                              :
                              <input
                                className={styles.subInfoInput}
                                type="number"
                                placeholder="20.00"
                                name="price"
                                value={element.price || ""} 
                                onChange={e => handleChanges(index, e)}
                              />
                              }
                            </div>
                          </label>

                          {element.price === '' ? <p>$21.990</p> : <p>{element.precioAlPublico}</p>}

                          <p className={styles.subInfotxt}>
                            Precio al público incluyendo costo de manejo e IVA
                          </p>
                        </div>

                        {/* ganacia x cupo*/}
                        <div className={styles.containerSubInfo}>
                          <label className={styles.subInfoTitle}>
                            Tu ganas por cupo
                            <div className={styles.labelS}>
                              <p>$</p>
                              <p className={styles.subInfoInput}>{element.gananciaCupo}</p>
                            </div>
                          </label>
                          <p className={styles.subInfotxt}>
                            Después de nuestra comisión + IVA
                          </p>
                          <a className={styles.btn6} href="user/perfil/datos" target="_blank">Ver mas</a>                  
                        </div>

                        {/* ganacia x evento*/}
                        <div className={styles.containerSubInfo}>
                          <label className={styles.subInfoTitle}>
                            Tu ganas por evento
                            <div className={styles.labelS}>
                              <p>$</p>
                            <p className={styles.subInfoInput}>{element.gananciaEvento}</p>
                            </div>
                          </label>
                          <p className={styles.subInfotxt}>
                            Esto sería lo que ganarías si se venden todos tus cupos
                          </p>
                          <a className={styles.btn6} href="user/perfil/datos" target="_blank">Ver mas</a>
                        </div> 
                      </div>

                      <div  className={styles.contTimeAndDate} key={index}>
                         {/* fecha*/}
                        <div className={styles.contDate}>
                          <label>Fecha</label>
                            {failedSubmit && errors.dates ?
                              <input 
                              classname={styles.errors}
                              type="date" 
                              name="date" 
                              value={element.date || ""} 
                              onChange={e => handleChanges(index, e)} 
                              min={fechaMinima}
                              required
                              />                          
                            :
                            <input 
                            id="fecha"
                            type="date" 
                            name="date" 
                            value={element.date || ""} 
                            onChange={e => handleChanges(index, e)} 
                            min={fechaMinima}              
                            />                      
                            }  
                          <p>{element.dateFormated}</p>                         
                        </div>

                        {/* hora inicio*/}
                        <div className={styles.contStart}>                
                          <label>Comienza</label>
                          {failedSubmit && errors.dates?
                            <input 
                            type="time" 
                            name="start" 
                            value={element.start || ""} 
                            onChange={e => handleChanges(index, e)} 
                            required
                            />
                            :
                            <input 
                            type="time" 
                            name="start" 
                            value={element.start || ""} 
                            onChange={e => handleChanges(index, e)} 
                            step="900"
                            />
                          }
                        </div>

                        {/* hora fin*/}
                        <div className={styles.contStart}>
                        <label>End</label>
                        {failedSubmit && errors.dates?
                          <input 
                          type="time" 
                          name="end" 
                          value={element.end || ""} 
                          onChange={e => handleChanges(index, e)} 
                          required
                          />                      
                          :
                          <input 
                          type="time" 
                          name="end" 
                          value={element.end || ""} 
                          onChange={e => handleChanges(index, e)} 
                          />
                        }                 
                        </div>

                        {/* Remove date*/}
                        {
                          index ? 
                            <button lassName={styles.addDelete}  type="button"  onClick={() => removeFormFields(index)}>
                              <img className={styles.basquet} src={basquet} alt="n" />
                            </button> 
                          : null
                        }
                      </div>

                      <hr className={styles.hr}></hr> 
                    </div>
                    ))}
                </div>

                {/* errores*/}
                {errors.dates && (
                <p className={styles.errors}>{errors.dates}</p>
                )} 
                {errors.cupos && (
                  <p className={styles.errors}>{errors.cupos}</p>
                  )}

                {/* agregar fecha*/}
                <div>
                  <button className={styles.addDate}  type="button" onClick={() => addFormFields()}> + Crear Nueva Fecha</button>
                </div>

                {/*botones*/}
                <div>
                  <p className={styles.acceptText}>
                    Al hacer clic en ‘Publicar’ confirma que ha leído y entendido
                    nuestros Términos y Condiciones, Notas legales de privacidad y
                    Seguridad.
                  </p>

                  {/*vistaprevia-publicar-guardar*/}
                  <div className={styles.btnContainer}>
                    {/*vista previa*/}
                    <div className={styles.btnVista}>
                        <p onClick={() => setGetPreview(!getPreview)} className={styles.viewBtn}>
                          Vista Previa
                        </p>
                        {getPreview &&(
                        <div className={styles.modal}>
                          <div className={styles.closeMenuGetPreview}>
                                  <button className={styles.viewBtn} onClick={() => setGetPreview(false)}>
                                    Salir de Vista Previa
                                  </button>
                              </div>  
                          <div className={styles.modalContent }>                         
                            <div className={styles.column1} >                         
                              <div className={styles.containerInfoModal}>
                                  {post.pictures.length>0? 
                                  <Swiper
                                      slidesPerView={1}
                                      spaceBetween={40}
                                      navigation
                                      onSlideChange={() => console.log('slide change')}
                                      onSwiper={(swiper) => console.log(swiper)}
                                      modules={[Pagination, Navigation]}
                                      className={styles.mySwipperInfo}
                                    >
                                      {                              
                                          post.pictures.map((picture) =>(
                                            <SwiperSlide>
                                              <img className={styles.imgInfo} src={picture.picture} alt="Not Found ):" />
                                            </SwiperSlide>
                                          ))
                                      }
                                  </Swiper>  
                                  :'No'}

                                      <div className={styles.container_icon_heartInfo}>
                                        <FavoriteIcon className={styles.icon_heartInfo} sx={{ fontSize: 25 }} />
                                      </div>

                                      <div className={styles.container_icon_shareInfo}>
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" className={styles.labelInfo}>
                                          <LaunchOutlinedIcon
                                            className={styles.icon_shareInfo}
                                            sx={{ fontSize: 25 }}
                                          />
                                        </label>
                                      </div>
                                                
                                      <div className={styles.titleInfo}>
                                        <p>{post.title}</p>

                                        <div className={styles.container_ratingInfo}> 
                                        <Rating
                                            className={styles.ratingInfo}
                                            name="read-only"
                                            value={5}
                                            readOnly
                                            sx={{ fontSize: 25 }}
                                        />
                                        </div>
                                        <p className={styles.numberRatingInfo}>({5})</p>
                                      </div>
                                      <div className={styles.container_opinionsInfo}>
                                        <p className={styles.opinionsInfo}>Ver Opiniones</p>
                                      </div>
                                      <p className={styles.title_descriptionInfo}>
                                        <DescriptionOutlinedIcon fontSize="large" /> Descripcion Del Evento
                                      </p>
                                      <p className={styles.descriptionInfo}>{post.longDescription}</p>
                                      <div className={styles.container_plusInfo}>
                                        <p>Ver más</p>
                                      </div>
                                      <hr className={styles.hr}></hr> 

                                      <p className={styles.reportInfo}>
                                        <WarningOutlinedIcon fontSize="medium" /> Reportar Contenido Inapropiado
                                      </p>
                              </div>
                              <div className={styles.containerLoc}>
                                  <div className={styles.container_locationLoc}>
                                      <IoLocationOutline className={styles.iconLoc}/>
                                      <p>Ubicacion</p>
                                    </div>
                                  {post.online === 'false' ?                             
                                      <div>
                                        <div>
                                          <span className={styles.cityLoc}>{post.municipio} / </span>
                                          <span className={styles.stateLoc}>{post.departamento}</span>
                                          <p className={styles.textoLoc}>La ubicación exacta se te enviará al adquirir tu entrada</p>
                                        </div>
                                        <div className={styles.imgLoc}>
                                          <div>
                                            <img 
                                              src={url} 
                                              alt="mapaStaticGoogleMaps" 
                                            /> 
                                          </div>
                                        </div>

                                      </div>
                                    :
                                      <div>
                                        <span className={styles.cityLoc}>En Linea</span>
                                        <p className={styles.textoLoc}>El enlace para el evento se te enviara al momento de adquirir tu cupo</p>
                                      </div>
                                    } 
                                    <p className={styles.descriptionLoc}>{post.shortDescription}</p>
                                    <hr className={styles.hr}></hr> 
                              </div>
                            </div>
                            <div className={styles.column2}>
                                  <div className={styles.eventDate}>                              
                                      <div >
                                        <div className={styles.containerTitleDate}>
                                          <CalendarMonthIcon
                                            sx={{
                                              fontSize: '16px',
                                              color: '#585858',
                                              '& :hover': { color: '#ef5350' },
                                            }}
                                          />
                                          <p className={styles.titleDate}>Próximas Fechas</p>
                                        </div>
                                        <div>
                                          <table className={styles.tableDate}>
                                            <thead>
                                              <tr>
                                                <th></th>
                                                <th>Fecha</th>
                                                <th>Hora</th>
                                                <th>Precio</th>
                                                <th>Cupos Dispopnibles</th>
                                                <th>Cupos a Comprar</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {post.dates.map((date) => (
                                                <tr >
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      class={styles.checkBox}
                                                      value={date.id}
                                                      defaultChecked={false}
                                                    ></input>
                                                  </td>
                                                  <td>{date.date}</td>
                                                  <td>{date.start}-{date.end}</td>
                                                  <td>{date.price}</td>
                                                  <td>{date.cupos}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>                                 
                                          <p className={styles.buttonDate}>Comprar</p>                                  
                                        <p className={styles.parrafoDate}>
                                          Nuevas fechas pueden ser solicitadas en cuyo caso un mínimo aplicaría de
                                          cupos a ser adquiridos por el solicitante, será sujeto a aprobación de
                                          fecha
                                        </p>
                                        <p >
                                          Solicitar nuevas fechas
                                        </p>   
                                        <hr className={styles.hr}></hr>                                 
                                      </div>
                                </div>                      
                                  <div className={styles.container2Special}>
                                    <p className={styles.c2titleSpecial}>Accesibilidad y requerimientos especiales</p>
                                    <div className={styles.subcontainer2Special}>
                                      <p className={styles.iconSpecial}>!</p>
                                      <p className={styles.c2subtitleSpecial}>{post.specialRequires}</p>
                                    </div>
                                  </div>
                                  <hr className={styles.hr}></hr>   
                                  {/* Orgna */}
                                  {userData?
                                  <div className={styles.containerOrg}>
                                    <div className={styles.containerTopOrg}>
                                      <p className={styles.titleOrg}>Organizador</p>
                                      <div className={styles.btnOrg}>
                                        <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
                                        <button className={styles.buttonOrg}>
                                          Enviar Mensaje
                                        </button>
                                      </div>
                                    </div>
                                    <div className={styles.orgContOrg}>
                                    
                                        <img className={styles.orgImgOrg} src={userData.userpicture} alt="N" />
                                  

                                      <div className={styles.orgSubContOrg}>
                                            <p className={styles.orgNameOrg}>{userData.name}</p>
                                            <p className={styles.orgMembershipOrg}>
                                              Miembro desde *falta valor real*
                                            </p>
                                      </div>
                                    </div>
                                        <p className={styles.orgDescriptionOrg}>
                                        {userData.descriptionOrganizer}
                                        </p>
                                        <button className={styles.button2Org}>
                                          Otros eventos organizados por {userData.name}
                                        </button>
                                  </div>
                                  :'No hay usuario todavia'}                                
                              </div>                                           
                            </div>                                   
                        </div>
                        )}
                    </div>

                    {/*publicar*/}
                    <div>
                      <button className={styles.viewBtn} type="submit">
                        {' '}
                        Publicar Evento
                      </button>
                    </div>

                    {/*guardar*/}
                    <div>
                      <button className={styles.viewBtn} onClick={(e) => handleSave(e)} >
                        Guardar y Publicar Luego
                      </button>
                    </div>
                  </div>

                  <p>Debes llenar todos los campos para poder continuar.</p>

                  {/*cancelar*/}
                  <button className={styles.cancelBtn} onClick={(e) => handleDelete(e)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/*SECTIONS BUTTONS - UP AND DOWN*/}
      {getPreview === false ? 
      <div className={styles.containerBtnSection}>
        <button
          className={styles.btnSectionMove}
          onClick={() => scrollSections(-1000)}
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
          onClick={() => scrollSections(1000)}
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
      :''}
     
    </div>
  </div>
  );
};

export default EventCreateForm;