import React, {useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { iconExclamation } from '../../assets/imgs';
import CardProduct from '../../components/CardProduct/CardProduct';
import FormProductPay from '../../components/FormProductPay/FormProductPay';
import styles from './Cart.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import { useState } from 'react';
import { stateContext } from '../../context/state/stateContext';
import { iconPayU, iconAchPse } from '../../assets/imgs';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { UIContext } from '../../context/ui';
import { getReferalCode } from '../../redux/actions';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';




const Cart = () => {

  const id = useParams().id;
  const events = useSelector((state) => state.events);
  const eventDetail = events.filter((e) => e._id === id)[0];
  const { carrito, setCarrito } = useContext(stateContext);
  const { dateToBuy, setDateToBuy } = useContext(stateContext);
  const { code, setCode } = useContext(stateContext);
  const { valorTotal, setValorTotal } = useContext(stateContext);
  const { subTotal , setSubTotal } = useContext(stateContext);
  const dispatch = useDispatch()

  
  const [descuentoTotal , setDescuentoTotal] = useState('')
  const [administracion , setAdministracion] = useState(subTotal*0.16)
  const [iva , setIva] = useState(subTotal*0.19)
  
 
  //PAGINADO//

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 1;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentDate = dateToBuy.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);
  const fechaIn = dateToBuy.length

  const handlePrev = (e)=>{
    if(currentPage===1){
      setCurretPage(dateToBuy.length)
    }else{
      setCurretPage(currentPage-1)
    }

  }

  const handleNext = (e)=>{
    if(currentPage===dateToBuy.length){
      setCurretPage(1)
    }else{
      setCurretPage(currentPage+1)
    }
  }

 
// ----- carrito-------//
  

  useEffect(() => {
    
    const ivaFinal = subTotal*0.19
    const adminfinal = subTotal*0.16
    const precioTotal = subTotal + subTotal*0.19 + subTotal*0.16 - descuentoTotal
    
      setAdministracion(adminfinal)
      setIva(ivaFinal)
      setValorTotal(precioTotal)
      

    }, [subTotal]);


    useEffect(() => {
      const f = subTotal + iva + administracion - descuentoTotal
      setValorTotal(f)
    }, [descuentoTotal]);


// // -----CUPOS-------//

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

  const handleNumberBuyCupos = (e,num , id) => {
  
    //const carritoCupos = [...carrito]
    if (num <= -1) return;
    if (num > 10) return;
    setNumberBuyCupos(num);

    const stotal = []

    for( let i = 0 ; i<carrito.length ; i++){
      if(carrito[i].idDate === id){
        carrito[i].quantity = num
        carrito[i].subtotal = num *   carrito[i].price 
        stotal.push(carrito[i].subtotal) 
        
      } 
    }
  };


  useEffect(() => {
    
    const sTotal = []
    for(let i = 0; i<carrito.length; i++){
      sTotal.push(carrito[i].subtotal)
      let total = sTotal.reduce((a, b) => a + b, 0);
      setSubTotal(total)
    }
   
  }, [numberBuyCupos]);



 
// -----CODIGOS-------//
// codigo de prueba Zbc1234//
// codigo de prueba Zac1234//

  const [codigo , setCodigo] = useState('')
 

  const handleCodigo = (e) =>{
    e.preventDefault()
    setCodigo(e.target.value)
  }

  const[desc , setDesc] = useState('')

  const aplicar = (e , id) =>{
    e.preventDefault()
    for(let d=0; d<currentDate[0].codigos.length; d++){
      if(currentDate[0].codigos[d].codigo === codigo){

        const descValor = currentDate[0].codigos[d].descuento
       
        for(let c = 0 ; c<carrito.length;c++){
            if(carrito[c].idDate===id){

              carrito[c].codigoDescuento=codigo
              carrito[c].codigoCorrecto=true
              carrito[c].descuento= descValor * currentDate[0].price / 100
              const unitDic = carrito[c].unit_price - descValor * currentDate[0].price / 100
              carrito[c].unit_price = unitDic

              setDesc(carrito[c].descuento)
              return swal({
                title: 'Codigo Aplicado',
              })
      }else{
        carrito[c].codigoCorrecto=false
         }}
      }
      return swal({
        title: 'Codigo Incorrecto',
        icon: 'warning',
        dangerMode: true,
      })
    }

  }

  useEffect(() => {
    
    const desTotal = []
    for(let i = 0; i<carrito.length; i++){
      desTotal.push(carrito[i].descuento)
      let total = desTotal.reduce((a, b) => a + b, 0);
      setDescuentoTotal(total)
    }
   
  }, [desc]);




  const quitar = (e,id)=>{
    e.preventDefault()
    for(let i = 0 ; i<carrito.length;i++){
      if(carrito[i].idDate===id){

        const desc = carrito[i].descuento
        const resto = descuentoTotal-desc
        const restoTotal = valorTotal - desc

        carrito[i].unit_price = carrito[i].unit_price  + desc

        setValorTotal(restoTotal)
        setDescuentoTotal(resto)

        if(carrito[i].codigoDescuento.length>0){

          carrito[i].codigoDescuento=''
          carrito[i].descuento=''
          carrito[i].codigoDescuento=''
          carrito[i].codigoCorrecto=''
        } 
      }

    }

  }
 

  //----USER---///

 
  const { user } = useContext(AuthContext);

  const [post,setPost] = useState({
    name:'',
    documentNumber:'',
    address:'',
    city:'',
    phone:'',
    email:''
  })
 
  
  useEffect(() => {
    
    getUserData();

  }, [user]);

  const getUserData = async () => {
    if (user.uid) {
      const userResult = await eventsApi.get(`/users/${user.uid}`);
     
  setPost({
        ...post,
        name:userResult.data.name,
        documentNumber:userResult.data.document,
        address:userResult.data.direction,
        city:userResult.data.name,
        phone:userResult.data.phone,
        email:userResult.data.email,
      })
    }
  };

  
  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }



  //---SUBMIT---//

  async function handleSubmit(e){
    e.preventDefault()
    console.log('handleSubmit:')
    
    const f = []
    const cod= []
    for (let i = 0 ; i<carrito.length ; i++){
    const d =   {
      title: eventDetail.title,
      quantity:carrito[i].quantity,
      unit_price: carrito[i].unit_price,
      id:carrito[i].idDate,
      codigo:carrito[i].codigoDescuento || null
      }
      f.push(d)

      const c = carrito[i].codigoDescuento
      cod.push(c)

      setCode([{
        idEvent : eventDetail._id,
        idDate:carrito[i].idDate,
        code: carrito[i].codigoDescuento
      }
      ])
  
      
    }

    const payload = {
      idUser:user.uid ,
      idEvent: eventDetail._id,
      dates:f
    }
    console.log('payload',payload)

    const json = await eventsApi.post('/mercadoPago/orden', payload)
    console.log('res:',json.data)

   window.location.assign(json.data.init_point)
    
 
  }

  // // mercadoPago/orden?codigo=xxx
// // mercadoPago/success




  return (
    
    <div className={`${styles.pageCart} container`}>
      {dateToBuy.length>0 ?
      <div>
        {carrito.length > 1 ?
        <h1 className={styles.pageCartTitle}>Usted está comprando: {carrito.length} Fechas</h1>
        : <h1 className={styles.pageCartTitle}>Usted está comprando</h1>
        }
        <div className={styles.containerPageCart}>
          <div className={styles.containerCardProduct}>
            {/* CARD PRODUCT */}
            {eventDetail !== undefined ?
            <div>
              <div className={styles.cartProduct}>
                <div className={styles.containerProductDetails}>
                  <div className={styles.imgContainer}>
                    <img src={eventDetail.pictures[0].picture} alt="img-product" />
                  </div>
                  <div className={styles.containerDescription}>
                    <h2 className={styles.productName}>{eventDetail.title}</h2>
                    <div className={styles.containercard}>
                      <div>
                        <div className={styles.productDate}>
                          {carrito.length===1?
                            <div className={styles.quantityBtns}>                          
                            <span>{currentDate[0].dateFormated.replace('/', ' de ')}</span>                         
                            </div>
                            :
                            <div className={styles.quantityBtns}>
                              <button onClick={(e)=>handlePrev(e)}>
                                <img src={iconArrowLeft} alt="icon-left" />
                              </button>
                              <span>{currentDate[0].dateFormated.replace('/', ' de ')}</span>
                              <button onClick={(e)=>handleNext(e)}>
                              <img src={iconArrowRight} alt="icon-right" />
                              </button>
                            </div>
                          }
                         
                        </div>
                        <div>
                        <p className={styles.productTime}>{currentDate[0].start} a {currentDate[0].end}</p>
                        <p className={styles.productLocation}>
                        {eventDetail.departamento} - {eventDetail.municipio}
                          </p>
                        <p className={styles.productCupos}>
                          Cupos disponibles : {currentDate[0].cupos}
                        </p>
                        {carrito.length > 1 ?
                        <h2 className={styles.fechaIn}>Fecha: {currentPage} / {carrito.length}</h2>
                        : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.containerOptions}>
                  <div className={styles.productOptions}>

                     {/*Cantidad de cupos*/}
                    <div className={styles.containerQuantity}>
                      <p className={styles.titleQuantity}>Cantidad</p>
                      
                        {carrito.map(c=>
                        c.idDate === currentDate[0]._id ?
                        <div className={styles.quantityBtns}>
                            <button onClick={(e) => handleNumberBuyCupos(e,c.quantity - 1, c.idDate)}>
                              <img src={iconArrowLeft} alt="icon-left" />
                            </button>
                            <span>{c.quantity}</span>
                            <button onClick={(e) => handleNumberBuyCupos(e, c.quantity + 1, c.idDate )}>
                              <img src={iconArrowRight} alt="icon-right" />
                            </button>
                          </div>
                        : ''
                        )
                        }
                      
                    </div>

                    {/* Precio por cupo */}
                    <div className={styles.containerPriceForBallot}>
                      <p className={styles.titlePriceBallot}>Precio por cupo</p>
                      <span>${currentDate[0].price}</span>
                    </div>

                    {/* Subtotal fecha actual */}
                    {carrito.map((c)=>
                      c.idDate===currentDate[0]._id?
                        <div className={styles.containerPriceSubtotal}>
                          <p className={styles.titleSubtotal}>Subtotal</p>
                          <span>${c.subtotal}</span>
                        </div>
                        :''
                        )
                    }
                  
                  </div>
                  {carrito.length > 0 &&
                    carrito.map((v)=>
                      v.idDate === currentDate[0]._id?
                      <div className={styles.productDiscount}>
                        <p className={styles.titleDiscount}>¿Tiene un código de descuento?</p>
                        <div className={
                          v.codigoCorrecto === '' ?
                          styles.containerInputDiscount :
                          v.codigoCorrecto === true?
                          styles.containerInputDiscountCorrect:
                          v.codigoCorrecto === false?
                          styles.containerInputDiscountIncorrect:
                          styles.containerInputDiscount}>
                          <input
                              name='codigo'
                              placeholder={v.codigoDescuento ||''}
                              onChange={(e) => handleCodigo(e)}
                            />
                          <div className={styles.btnsDisc}>
                            <button onClick={(e)=>{aplicar(e,currentDate[0]._id)}}>Aplicar</button>
                            <button className={styles.quitar} onClick={(e)=>{quitar(e,currentDate[0]._id)}}>Quitar</button>
                          </div>
                        </div>
                      </div>
                    :'')
                    }
                </div>
              </div>
              {eventDetail.specialRequires.length>1?

              <div className={styles.summaryCart}>
                <h2 className={styles.summaryTitle}>
                  <img src={iconExclamation} alt='icon-exclamation' />
                  <span>Accesibilidad y requerimientos especiales</span>
                </h2>
                <p className={styles.summaryDescription}>
                  {eventDetail.specialRequires}
                </p>
              </div> 
              :''
              }
            </div>
            :'LOADING...'}
          </div>

          {/* FORM PRODUCT */}
          <div className={styles.formPayProduct}>
            <form action="">
              {/* USUER DATA*/}
              <div>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre Completo*</label>
                  <input
                    name='name'
                    value={post.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="id">Número de cédula*</label>
                  <input
                      name='document'
                      value={post.document}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address">Dirección</label>
                  <input
                      name='address'
                      value={post.address}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city">Ciudad</label>
                  <input
                      name='city'
                      value={post.city}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Télefono*</label>
                  <input
                      name='phone'
                      value={post.phone}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="mail">Correo electrónico</label>
                  <input
                      name='email'
                      value={post.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                </div>
              </div>

              {/* PAYMENT VALUES */}

              <div className={styles.containerDetailsBuy}>
                 
                <div className={styles.detailsBuy}>
                  <p>Subtotal</p>
                  <span>${subTotal}</span>
                </div>
                <div className={styles.detailsBuy}>
                  <p>Descuento</p>
                  <span className={styles.detailDiscount}>-${descuentoTotal}</span>
                </div>
                <div className={styles.detailsBuy}>
                  <p>Administración</p>
                  <span>${administracion}</span>
                </div>
                <div className={styles.detailsBuy}>
                  <p>Valor IVA</p>
                  <span>${iva}</span>
                </div>
                <div className={styles.formDivisor} />
                <div className={`${styles.detailsBuy} ${styles.totalBuy}`}>
                  <p>Valor total Inc IVA</p>
                  <span>${valorTotal}</span>
                </div>
              </div>

              <p className={styles.textTerms}>
                Al hacer clic en ‘Pagar,’ confirmas que has leído y aceptas la
                Política de privacidad, la Políticas de seguridad y los Términos y
                condiciones de LO QUE QUIERO HACER S.A.S. También confirmas que eres
                mayor de edad y que aceptas ser contactado por Nosotros en relación a
                los eventos que compres.
              </p>

              <div className={styles.containerButtonForm}>
                  <button onClick={(e)=>handleSubmit(e)} className={styles.btnForm}>
                    Pagar
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      :'LOADING...'}
    </div>
  );
};

export default Cart;
