import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useRef, useState } from 'react';
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
import styles from './EventEdit.module.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConstructionOutlined, ContactMailOutlined, EmergencyRecordingSharp } from '@mui/icons-material';
import { getColombia , postEvent } from '../../redux/actions';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { getEvents } from '../../redux/actions';

const EventEdit = () => {


  const dispatch = useDispatch()

  const f = new Date();
  //Devuelve formato sólo de fecha pero en el formato regional actual ejemplo: 24/8/2019
  console.log(f.toLocaleDateString());

 

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
  //               POST Y ERROR            //

  useEffect(() => {
    dispatch(getEvents());
  }, []);


  const allEvents = useSelector((state) => state.events)
  console.log('eventos:',allEvents)
  console.log('evento:',allEvents[0])
//   const id = useParams().id
//   const bookId = allBooks.filter((book) => book._id === id)

  


  const [post, setPost] = useState({
    idOrganizer:'632cbed4f208f44f5333af48',
    title: '',
    categories: [],
    otherCategorie: [],
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
    cupos:'',
    price:'',
    dates:[{ date: "", start : "", end:"" , year:0}],
    isPublic:true,
    sells:10,
    revision: false
  });

  
  useEffect(() => {
    if(allEvents.length>1){
   
    setPost({
      ...post,
      idOrganizer:'632cbed4f208f44f5333af48',
      title: allEvents[0].title,
      categories: allEvents[0].categories,
      otherCategorie:  allEvents[0].otherCategorie,
      shortDescription: allEvents[0].shortDescription,
      longDescription:  allEvents[0].longDescription,
      pictures:  allEvents[0].pictures,
      online:  allEvents[0].online,
      link:  allEvents[0].link,
      departamento:  allEvents[0].departamento,
      municipio:  allEvents[0].municipio,
      direccion:  allEvents[0].direccion,
      barrio: allEvents[0].barrio,
      specialRequires: allEvents[0].specialRequires,
      cupos: allEvents[0].cupos,
      price: allEvents[0].price,
      dates: allEvents[0].dates,
      isPublic:allEvents[0].isPublic
    })}
  }, [allEvents])

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
    price: '',
    dates:'',
    isPublic:true
  
  })

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

 

  function validate(post) {
     let errors = {}
                
     let letras =  /^[a-zA-Z]*$/g
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

    if (post.title.match (notNumber)) {
      errors.title = 'No puedes ingresar un numero'
    }

    // if (!post.categories[0]) {
    //   errors.categories = true
    // }

    // if (post.categories.length > 3) {
    //   errors.categories = 'Solo podes seleccionar 3 categorias'
    // }

    // if (!post.otherCategorie) {
    //   errors.otherCategorie = 'Campo obligatorio(!)'
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

    if (!post.cupos) {
      errors.cupos = true
    }

    if (!post.cupos.match(numero)) {
      errors.cupos = 'Debe ser un numero'
    }


    if( parseInt(post.cupos) < post.sells){
        errors.cupos = 'x'
        return swal({
            title: `Ya se vendieron ${post.sells} cupos. El número no puede ser inferior a los cupos ya vendidos`,
            icon: "warning",
            button: "Cerrar",
            dangerMode: true,
          });
    }

    if (!post.price) {
      errors.price = true
    }

    if (!post.price.match(numeroYdecimales)) {
      errors.price = 'Debe ser un numero'
    }

    if(post.sells>0 && allEvents.length>0 && post.price<allEvents[0].price){
        errors.cupos = 'x'
        return swal({
            title: `Ya se vendieron ${post.sells} cupos. El precio no puede ser inferior al de los cupos ya vendidos`,
            icon: "warning",
            button: "Cerrar",
            dangerMode: true,
          });

    }

    for (var i=0; i<post.dates.length;i++ ){
      if (!post.dates[i].date ||!post.dates[i].start ||!post.dates[i].end ) {
        errors.dates = true
      }
    }

   



   

    
    for (var i=0; i<post.dates.length;i++ ){
      if (post.dates[i].start > post.dates[i].end ) {
        errors.dates = 'Error'
      }
    }

    for (var i=0; i<post.dates.length;i++ ){
      for(var j=1; j<post.dates.length;j++ ){
      if (post.dates[i].date === post.dates[j].date && post.dates[j].start < post.dates[i].end &&
        post.dates[j].start >post.dates[i].start || post.dates[j].end >post.dates[i].start &&
        post.dates[j].end < post.dates[i].end || post.dates[j].start < post.dates[i].start &&
        post.dates[j].end > post.dates[i].end
         )
      errors.dates = 'Fechas cruzadas'
    }}
    
    return errors
  }

  //--------------------------------------------------//
  //               POST - TITLE,DESCRIPTION ...       //


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
      let seleccion = seleccionados.filter((categorie) => categorie.name !== categorieName)
      setSeleccionados(seleccion)
      setPost({
        ...post,
        categories:seleccion
      })
    } else {
      let categorieCheck = categories.find((categorie) => categorie.name === categorieName)
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




    
  //--------------------------------------------------//
  //               POST  PRICE            //

  
  const costoDeManejo = 1672.27
  const IVA = 0.19
  const comision = 0.16

  const a = costoDeManejo * IVA


  const [precioAlPublico,setPrecioAlPublico] = useState()

  const [gananciaPorCupo,setGananciaPorCupo] = useState()

  const [gananciaPorEvento,setGananciaPorEvento] = useState()


  function handleCupos(e) {

    setPost({
      ...post,
      cupos: e.target.value,
    })
  }


  function handlePrice(e) {
   
    setPost({
      ...post,
      price: e.target.value,
    });

    const precioPorCupo = parseFloat(e.target.value) + parseFloat(costoDeManejo) + parseFloat(a)
    setPrecioAlPublico(
      precioPorCupo
    )
    const gananciaCupo = parseFloat(e.target.value)-(((parseFloat(e.target.value)*parseFloat(comision))+((parseFloat(e.target.value)*parseFloat(comision)*parseFloat(IVA)))))
    setGananciaPorCupo(
      gananciaCupo
    )
    
    if(post.cupos && gananciaCupo ){
      const ganaciaEvento = parseFloat(gananciaCupo) * parseInt(post.cupos)
      setGananciaPorEvento(
        ganaciaEvento
      )
    }
  }



  //--------------------------------------------------//
  //               POST  DATE        //

  const [newDate, setNewDate] = useState(
    {
        dates:[{ date: "", start : "", end:"" , year:0}], 
      }
  )


  let handleChanges = (i, e ) => {
    let newFechas = [...post.dates];
    newFechas[i][e.target.name] = e.target.value;
    setNewDate({
      ...newDate,
      dates:newFechas 
    })
     for(var j=0; j<allEvents[0].dates.length;j++ ){
        for(var i=0; i<newDate.dates.length;i++ ){
         if(post.sells>0 && newDate.dates[i].date !== allEvents[0].dates[j].date){
            return swal({
            title: `Texto &&&&&&&&&&, ver sección &&&& en Guía del Organizador. Si procedes, es importante que le informes de inmediato sobre este cambio a los Asistentes.`,
            icon: "warning",
            buttons: ["Cerrar", "Cambiar fecha/hora"],
            dangerMode: true,
          })
          .then((cambiar) => {
            if (cambiar) {
              setPost({
                ...post,
             dates:newFechas 
           })
         }
     })
    }else if(post.sells>0 && 
        newDate.dates[i].start !== allEvents[0].dates[j].start ||
        newDate.dates[i].end !== allEvents[0].dates[j].end ){
        return swal({
            title: `Texto &&&&&&&&&&, ver sección &&&& en Guía del Organizador. Si procedes, es importante que le informes de inmediato sobre este cambio a los Asistentes.`,
            icon: "warning",
            buttons: ["Cerrar", "Cambiar hora"],
            dangerMode: true,
          })
          .then((cambiar) => {
            if (cambiar) {
              setPost({
                ...post,
             dates:newFechas 
           })
         }
     })
    }
   }
  }
  }

 
  let addFormFields = () => {
    setPost({
      ...post,
      dates:[...post.dates, { date: "", start : "", end:"" , year:0}]
    })
    
  }

  let removeFormFields = (i) => {
    let newFechas = [...post.dates];
    newFechas.splice(i, 1);
      if(allEvents[0].isPublic && post.sells===0){
        return swal({
            title: `Esta acción quitará esta fecha de publicados y ya no será visible para el público.
            También se borrará en esta pagina los datos relacionados a esta fecha: hora, número de cupos, precio por cupo y códigos de descuento si alguno.
            `,
            icon: "warning",
            buttons: ["Cancelar acción", "Continuar"],
            dangerMode: true,
          })
          .then((Continuar) => {
            if (Continuar) {
          setPost({
            ...post,
            dates:newFechas 
            })
            }
            })
      } else if(allEvents[0].isPublic && post.sells>0){
        return swal({
            title: `Ya hay xx cupo(s) comprado(s) para esta fecha, si la quitas de publicados el dinero será devuelto a los compradores. Esta devolución genera unos costos los cuales deberas asumir. Ver sección &&&&&&&&&& en Términos y Condiciones. También se borrará en esta pagina los datos relacionados a esta fecha: hora, número de cupos, precio por cupo y códigos de descuento si alguno.
            Deseas quitar esta fecha de publicados? 
            `,
            icon: "warning",
            buttons: ["Cancelar acción", "Continuar"],
            dangerMode: true,
          })
          .then((Continuar) => {
            if (Continuar) {
          setPost({
            ...post,
            dates:newFechas 
            })
            }
            })
      }else if(allEvents[0].isPublic===false){
        return swal({
            title: `Se borrara esta fecha y los datos relacionados a la misma: hora, número de cupos, precio por cupo y códigos de descuento si alguno.
            `,
            icon: "warning",
            buttons: ["Cancelar acción", "Continuar"],
            dangerMode: true,
          })
          .then((Continuar) => {
            if (Continuar) {
          setPost({
            ...post,
            dates:newFechas 
            })
            }
            })
      }else if(allEvents[0].isPublic===false && post.revision===false && post.sells>0){
        return swal({
            title: `Ya hay xx cupo(s) comprado(s) para esta fecha, si procedes el dinero será devuelto a los compradores. Texto &&&&&&&&&&, ver sección &&&& en Guía del Organizador. También se borrará en esta pagina los datos relacionados a esta fecha: hora, número de cupos, precio por cupo y códigos de descuento si alguno.
            `,
            icon: "warning",
            buttons: ["Cerrar", "Continuar"],
            dangerMode: true,
          })
          .then((Continuar) => {
            if (Continuar) {
          setPost({
            ...post,
            dates:newFechas 
            })
            }
            })
      }

      
  }

  //--------------------------------------------------//
  //                  CALENDAR                 //

  // const [date, setDate] = useState(null);
  // const [dateFormatted, setDateFormatted] = useState('');

  

  
  // const handleFormatDate = (i,date) => {
  //   var todas = [...post.dates]
  //   todas[i][date] = date
  //   console.log('date;,',date)
  //   setPost({
  //     ...post,
  //     dates:[...post.dates,{date:date}]
  //   })
  //   // setDateFormatted(formatDate(date));
  //   // console.log('Date:',date)
  //   // console.log('dateFormatted:',dateFormatted)
  // };



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
  //                 SAVE           //

  const navigate = useNavigate()


  function hanldeClick(e){
    e.preventDefault()
    setPost({
      ...post,
      isPublic:false
    })

    console.log('postGuardar',post)
    e.preventDefault()
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
        setPost({
          title: '',
          categories: [],
          otherCategorie: [],
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
          cupos:'',
          price: '',
          dates:[{ date: "", start : "", end:"" , year:0}],
          isPublic:true
     })
        navigate("/user/profile" )
      } 
    }
    )
  }}

    //--------------------------------------------------//
  //                CANCEL          //



  function handleDelete(e){
    console.log('guardar')
    e.preventDefault()
    
    swal({
      title: "Esta acción borrara todo la información ingresada o modificada en esta sesión",
      buttons: ["Cerrar", "Continuar"],
      dangerMode: true,
    })
    .then((continuar) => {
      if (continuar) {
        navigate("/user/profile" )
      } 
    }
   )
  }



  
  //--------------------------------------------------//
  //                  SUBMIT              //

  const [failedSubmit, setFailedSubmit] = useState(false)
  
  const id= '632cbed4f208f44f5333af48'

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
          dispatch(postEvent(post,id))
          swal("Tu evento ha sido publicado. Recibirás un correo con los detalles. ", {
            icon: "success",
          });
          setPost({
            title: '',
            categories: [],
            otherCategorie: [],
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
            cupos:'',
            price: '',
            dates:[{ date: "", start : "", end:""}],
            isPublic:true
       })
        } 
      });
    } 
  }

  
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.containerForm}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
             
                {/* {post.categories.length<4 ?
                 <div className={styles.containerChecks}>  </div>
                   :<div className={styles.containerChecks2}>  </div>
                }
               */}

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
                  <input
                    className={styles.input2}
                    type="text"
                    name="otherCategorie"
                    values={post.otherCategorie}
                    onChange={(e) => handleOtherCategorie(e)}
                  /> 
                </div>
                {errors.otherCategorie && (
                        <p className={styles.errors}>{errors.otherCategorie}</p>
                    )}
              </div>

              {errors.categories &&
              <p className={styles.errors}>{errors.categories}</p>
              }

              {failedSubmit && errors.categories && errors.categories<3?
              <p className={styles.errors}>Debes seleccionar al menos una categoría</p>
              :''
              }

              
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
              {errors.specialRequires? 
              <p className={styles.errors}>{errors.specialRequires}</p>
              : null}  
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
                      {failedSubmit && errors.cupos?
                       <input
                       id='cupos'
                       className={styles.subInfoInput}
                       type="number"
                       placeholder="10"
                       name="cupos"
                       value={post.cupos}
                       onChange={(e) => handleCupos(e)}
                       required
                     />
                      :
                      <input
                        id='cupos'
                        className={styles.subInfoInput}
                        type="number"
                        placeholder="10"
                        name="cupos"
                        value={post.cupos}
                        onChange={(e) => handleCupos(e)}
                      />
                     }
                    </label>
                    {errors.cupos && (
                      <p className={styles.errors}>{errors.cupos}</p>
                    )}
                    
                  </div>
                 

                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Precio por cupo
                      <div className={styles.labelS}>
                        <p>$</p>
                        {failedSubmit && errors.price?
                         <input
                         className={styles.subInfoInput}
                         type='number'
                         placeholder="20.00"
                         name="price"
                         value={post.price}
                         onChange={(e) => handlePrice(e)}
                         required
                       />
                        
                        :
                        <input
                          className={styles.subInfoInput}
                          type="number"
                          placeholder="20.00"
                          name="price"
                          value={post.price}
                          onChange={(e) => handlePrice(e)}
                        />
                      }
                      </div>
                    </label>

                    {post.price === '' ? <p>$21.990</p> : <p>{precioAlPublico}</p>}

                    <p className={styles.subInfotxt}>
                      Precio al público incluyendo costo de manejo e IVA
                    </p>

                    {errors.price && (
                    <p className={styles.errors}>{errors.price}</p>
                    )}

                  </div>

                  <div className={styles.containerSubInfo}>
                    <label className={styles.subInfoTitle}>
                      Tu ganas por cupo
                      <div className={styles.labelS}>
                        <p>$</p>
                        <input
                         id='gananciaPorCupo'
                          className={styles.subInfoInput}
                          type="txt"
                          placeholder={gananciaPorCupo}
                        />
                      </div>
                    </label>
                    <p className={styles.subInfotxt}>
                      Después de nuestra comisión + IVA
                    </p>
                    <Link to={`/user/profile`} target={"_blank"}>
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
                        id='gananciaPorEvento'
                          className={styles.subInfoInput}
                          type="txt"
                          placeholder={gananciaPorEvento}
                        />
                      </div>
                    </label>
                    <p className={styles.subInfotxt}>
                      Esto sería lo que ganarías si se venden todos tus cupos
                    </p>
                    <Link to={`/user/profile`} target="_blank" rel="noopener noreferrer">
                      <button className={styles.btn6}
                      >Ver Más</button>
                    </Link>
                  </div>
                </div>
              </div>

              

              


              <hr className={styles.hr}></hr>


               {/* fechas*/}

                <div>
                      
                  {post.dates.map((element, index) => (
                    <div  className={styles.contTimeAndDate} key={index}>
                      <div className={styles.contDate}>
                        
                        {/* <div className={styles.contInputDate}>             
                            <input 
                              type="text" 
                              id="date" 
                              value={dateFormatted} />

                            <div className={styles.containerDate}>
                              <input
                                type="checkbox"
                                defaultChecked={false}
                                name="date"
                                value={element.dadateFormatted || ""}
                                onChange={e => handleChanges(index, e)}
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
                                  name='date'
                                  onChange={(item) => handleFormatDate(index,item)}
                                />
                              </div>
                            </div>                          
                        </div> */}

                      
                        <label>Fecha</label>
                          {failedSubmit && errors.dates ?
                            <input 
                            classname={styles.errors}
                            type="date" 
                            name="date" 
                            value={element.date || ""} 
                            onChange={e => handleChanges(index, e)} 
                            required
                            />
                          
                          :
                          <input 
                         
                          type="date" 
                          name="date" 
                          value={element.date || ""} 
                          onChange={e => handleChanges(index, e)} 
                        
                          />
                        
                      
                          }
                          
                      </div>



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
                          />
                        }
                      </div>

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

                      {
                        index ? 
                          <button lassName={styles.addDelete}  type="button"  onClick={() => removeFormFields(index)}>
                            <img className={styles.basquet} src={basquet} alt="n" />
                          </button> 
                        : null
                      }
                    </div>
                  ))}

                </div>
                {errors.dates && (
                <p className={styles.errors}>{errors.dates}</p>
                )}

          <hr className={styles.hr}></hr> 

          <div  >
              <button className={styles.addDate}  type="button" onClick={() => addFormFields()}> + Crear Nueva Fecha</button>
          </div>

   

              <div>
                <p className={styles.acceptText}>
                  Al hacer clic en ‘Publicar’ confirma que ha leído y entendido
                  nuestros Términos y Condiciones, Notas legales de privacidad y
                  Seguridad.
                </p>

                <div className={styles.btnContainer}>
                  <div>
                  <button className={styles.viewBtn}>
                    Vista Previa
                  </button>
                  </div>

                  <div>

                  <button className={styles.viewBtn} type="submit">
                    {' '}
                    Publicar Evento
                  </button>
                  </div>

                  <div>
                  <button className={styles.viewBtn} onClick={(e) => hanldeClick(e)} >
                    Guardar y Publicar Luego
                  </button>
                  </div>

                </div>
                <p>Debes llenar todos los campos para poder continuar.</p>

                <button className={styles.cancelBtn} onClick={(e) => handleDelete(e)}>
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

export default EventEdit;

