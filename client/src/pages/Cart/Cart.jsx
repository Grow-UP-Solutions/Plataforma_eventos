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


  useEffect(() => {
    scroll.scrollToTop();
  }, []);


  

  // ----- CARD PRODUCT-------//

  const { carrito, setCarrito } = useContext(stateContext);

  // const [carrito , SetCarrito ] = useState([{
  //   fechaId :'636bab4976757c4e621660eb',
  //   cupos:3,
  //   price:10000,
  //   codigoDescuento:'',
  //   codigoReferido:'',
  //   codigoCorrecto:'',
  //   subtotal:30000 ,
  //   descuento:''
  // },
  // {
  //   fechaId :'636bab4976757c4e621660ed',
  //   cupos:2,
  //   price:30000,
  //   codigoDescuento:'',
  //   codigoReferido:'',
  //   codigoCorrecto:'',
  //   subtotal: 60000,
  //   descuento:''
  // }])
  

  //fechas seleccionadas para comprar//
  const datesToBuy = []

    if(carrito.length >0 && carrito !== undefined && eventDetail !== undefined){
      for(let x = 0 ; x < carrito.length ; x++){
        for(let j = 0 ; j < eventDetail.dates.length ; j++){
          if(carrito[x].fechaId === eventDetail.dates[j]._id){
            const fecha = eventDetail.dates[j]
            datesToBuy.push(fecha)
          }
        }

      }

    }



  // ----- CARD PRODUCT PAGINCADO-------//

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 1;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentDate = datesToBuy.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);
  const fechaIn = datesToBuy.length
  console.log('fechaIn',fechaIn)

  const handlePrev = (e)=>{
    if(currentPage===1){
      setCurretPage(datesToBuy.length)
    }else{
      setCurretPage(currentPage-1)
    }

  }

  const handleNext = (e)=>{
    if(currentPage===datesToBuy.length){
      setCurretPage(1)
    }else{
      setCurretPage(currentPage+1)
    }
  }


// ----- VALORES-------//
  const [subTotal , setSubTotal] = useState(0)
  const [descuentoTotal , setDescuentoTotal] = useState(0)
  const [administracion , setAdministracion] = useState(subTotal*0.16)
  const [iva , setIva] = useState(subTotal*0.19)
  const [valorTotal , setValorTotal] = useState(subTotal + iva + administracion - descuentoTotal)


  useEffect(() => {
      const precioTotal = subTotal + subTotal*0.19 + subTotal*0.16 - descuentoTotal
      const ivaFinal = subTotal*0.19
      const adminfinal = subTotal*0.16

      setAdministracion(adminfinal)
      setIva(ivaFinal)
      setValorTotal(precioTotal)
      setPost({
        ...post,
        administrationCost:adminfinal,
        ivaCost:ivaFinal,
        total:precioTotal,
        subTotal:subTotal
      })
    }, [subTotal]);


    useEffect(() => {
      const f = subTotal + iva + administracion - descuentoTotal
    setValorTotal(f)
    setPost({
      ...post,
      total:f

    })
    }, [descuentoTotal]);



// -----CUPOS-------//

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

 
//cambiar cantidad de cupos//

  const handleNumberBuyCupos = (e,num , id) => {
    //const carritoCupos = [...carrito]
    if (num <= -1) return;
    if (num > 10) return;


    const stotal = []

    setNumberBuyCupos(num);
    for( let i = 0 ; i<carrito.length ; i++){
      if(carrito[i].fechaId === id){
        carrito[i].cupos = num
        carrito[i].subtotal = num *   carrito[i].price     
        setPost({
          ...post,
          dates:carrito
        })
      }
      stotal.push(carrito[i].subtotal)
      let total = stotal.reduce((a, b) => a + b, 0);
      setSubTotal(total)
      setPost({
              ...post,
              subTotal:total
            })

    } 
  };

 
// -----CODIGOS-------//
// codigo de prueba Zbc1234//

  const [codigo , setCodigo] = useState('')
  const [codigoCorrecto , setCodigoCorrecto] = useState('')
  const [refEnter, setRefEnter] = useState('')
  const [idCarrito, setIdCarrito] = useState('')


 // input del codigo//
  const handleCodigo = (e) =>{
    e.preventDefault()
    setCodigo(e.target.value)
  }

  // Boton aplicar y Caso: codigo descuento//

  const aplicar = (e , id) =>{
    e.preventDefault()
    for(let d=0; d<currentDate[0].codigos.length; d++){
      if(currentDate[0].codigos[d].codigo === codigo){
        const descValor = currentDate[0].codigos[d].descuento
        
        for(let c = 0 ; c<carrito.length;c++){
          if(carrito[c].fechaId===id){
            carrito[c].codigoDescuento=codigo
            carrito[c].codigoCorrecto=true
            carrito[c].descuento= descValor * currentDate[0].price / 100
            const d = descValor * currentDate[0].price / 100
            const s = post.descuentoTotal + d
            if(post.descuentoTotal===''){
          
              setPost({
                ...post,
                dates:carrito,
                descuentoTotal:d
              })
              setDescuentoTotal(d)
              return swal({
                title: 'Codigo Aplicado',
              })
            }else{
            
              setPost({
                ...post,
                dates:carrito,
                descuentoTotal:s
              })
              setDescuentoTotal(s)
              return swal({
                title: 'Codigo Aplicado',
              })
            }
          }
        }
      }else if(currentDate[0].codigos[d].codigo !== codigo){
        setRefEnter(codigo)
        setIdCarrito(id) 
      }
    }

  }

 
  useEffect(() => {
    getReferalCode();
  }, [refEnter]);

  
  //Caso: codigo de referido y codigo incorrecto//

  const getReferalCode = async () => {
      const codeResult = await eventsApi.get(`/codeDiscount/getCodeDiscountByCode/${codigo} `);
      for(let c = 0 ; c<carrito.length;c++){
        if(carrito[c].fechaId===idCarrito){
          if(codeResult.data.codeDiscount.length===1){
            carrito[c].codigoReferido=codeResult.data.codeDiscount[0].code
            carrito[c].codigoCorrecto=true
            carrito[c].descuento=codeResult.data.codeDiscount[0].value
            if(post.descuentoTotal===''){
              const r = codeResult.data.codeDiscount[0].value
              setPost({
                ...post,
                dates:carrito,
                descuentoTotal:r
                })
              setDescuentoTotal(r)
              return swal({
                title: 'Codigo Aplicado',
                })
            }else{
              const t = post.descuentoTotal + codeResult.data.codeDiscount[0].value
              setPost({
                ...post,
                dates:carrito,
                descuentoTotal:t
                })
                setDescuentoTotal(t)
              return swal({
                title: 'Codigo Aplicado',
                })
            }
            
          }else{
              carrito[c].codigoCorrecto=false
              return swal({
                title: 'Codigo Incorrecto',
                icon: 'warning',
                dangerMode: true,
              })
            }
        }
      }
  };

  const luis={
    idUser: "6356d50112a8fda25313907a",
    idEvent: "636bab4a76757c4e62166121",
    dates:[ 
      {
      title: "algo 2",
      quantity:2,
      unit_price: 250000,
      idDate: "636bab4a76757c4e62166123",
      },
      {
        title: "algo 3",
        quantity:2,
        unit_price: 250000,
        idDate: "636bab4a76757c4e62166123",
        }
    ]
    }

// mercadoPago/orden?codigo=xxx
// mercadoPago/success

  useEffect(() => {
    const discTotal = []
 
    
    for(let i = 0; i<post.dates.length; i++){
      discTotal.push(post.dates[i].discount)
      let totalD = discTotal.reduce((a, b) => a + b, 0);
      setDescuentoTotal(totalD)
      setPost({
        ...post,
        descuentoTotal:totalD
      })
    }
    
  }, [post]);


  const quitar = (e,id)=>{
    e.preventDefault()
    for(let c = 0 ; c<carrito.length;c++){
      if(carrito[c].fechaId===id){

        const desc = carrito[c].descuento
        const resto = post.descuentoTotal-desc
        const restoTotal = post.total - desc

        setValorTotal(restoTotal)
        setDescuentoTotal(resto)


        if(carrito[c].codigoDescuento.length>0){

          carrito[c].codigoDescuento=''
          carrito[c].descuento=''
          carrito[c].codigoDescuento=''
          carrito[c].codigoCorrecto=''

          setPost({
            ...post,
            dates:carrito,
            descuentoTotal:resto,
            total:restoTotal
          })
        } else if(carrito[c].codigoReferido.length>0){

          carrito[c].codigoReferido=''
          carrito[c].descuento=''
          carrito[c].codigoCorrecto=''

          setPost({
            ...post,
            dates:carrito,
            descuentoTotal:resto,
            total:restoTotal
          })
        } 
      }

    }

  }
 


 
// ----- FORM PRODUCT-------//
  const[post , setPost] = useState({
    eventId:'',
    dates:{
      fechaId :'',
      cupos:'',
      price:'',
      codigoDescuento:'',
      codigoReferido:'',
      codigoCorrecto:'',
      subtotal:'' ,
      discount:'',
    },
    userId:'',
    name:'',
    documentNumber:'',
    address:'',
    city:'',
    phone:'',
    email:'',
    card:'',
    bankSelect:'',
    bank:'',
    tipoCliente:'',
    tipoDeDcomuento:'',
    payU:'',
    subTotal:'',
    descuentoTotal:'',
    administrationCost:'',
    ivaCost:'',
    total:''
  })

  //----USER---///

 
  const { user } = useContext(AuthContext);
 
  
  useEffect(() => {
    const stotal = []
    
    for(let i = 0; i<carrito.length; i++){
      stotal.push(carrito[i].subtotal)
      let total = stotal.reduce((a, b) => a + b, 0);
     setSubTotal(total)
    }
    getUserData();
    
  }, [user]);

  const getUserData = async () => {
    if (user.uid) {
      const userResult = await eventsApi.get(`/users/${user.uid}`);
    
    setPost({
      ...post,
      eventId:id,
      userId:userResult.data._id,
      name:userResult.data.name,
      documentNumber:userResult.data.document,
      address:userResult.data.direction,
      city:userResult.data.name,
      phone:userResult.data.phone,
      email:userResult.data.email,
      total:valorTotal,
      ivaCost:iva,
      administrationCost:administracion,
    })
  }
  };

  
  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }




//----
 const [isPayAchpse, setIsPayAchpse] = useState(false);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setIsPayAchpse(true);
      setPost({
        ...post,
        bankSelect: true,
      });
    } else {
      setIsPayAchpse(false);
      setPost({
        ...post,
        bankSelect: '',
      });
    }
 
  };

  const handlePayU = (e) => {
    if (e.target.checked) {
      setPost({
        ...post,
        payU: true,
      });
    } else {
      setPost({
        ...post,
        payU: '',
      });
    }
 
  };

  //---SUBMIT---//

  function handleSubmit(){
    console.log('submit')
    console.log('post',post)
  }



  return (
    <div className={`${styles.pageCart} container`}>
      {currentDate[0] !== undefined ?
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
                    <div className={styles.containerQuantity}>
                      <p className={styles.titleQuantity}>Cantidad</p>
                      
                        {carrito.map(c=>
                        c.fechaId === currentDate[0]._id ?
                        <div className={styles.quantityBtns}>
                            <button onClick={(e) => handleNumberBuyCupos(e,c.cupos - 1, c.fechaId)}>
                              <img src={iconArrowLeft} alt="icon-left" />
                            </button>
                            <span>{c.cupos}</span>
                            <button onClick={(e) => handleNumberBuyCupos(e, c.cupos + 1, c.fechaId )}>
                              <img src={iconArrowRight} alt="icon-right" />
                            </button>
                          </div>
                        : ''
                        )
                        }
                      
                    </div>
                    <div className={styles.containerPriceForBallot}>
                      <p className={styles.titlePriceBallot}>Precio por cupo</p>
                      <span>${currentDate[0].price}</span>
                    </div>
                    {carrito.map((c)=>
                      c.fechaId===currentDate[0]._id ?
                        <div className={styles.containerPriceSubtotal}>
                        <p className={styles.titleSubtotal}>Subtotal</p>
                        <span>${c.subtotal}</span>
                        </div>
                        :''
                        )
                    }
                  
                  </div>
                  {carrito.map((c)=>
                    c.fechaId === currentDate[0]._id?
                    <div className={styles.productDiscount}>
                      <p className={styles.titleDiscount}>¿Tiene un código de descuento?</p>
                      <div className={
                        c.codigoCorrecto === '' ?
                        styles.containerInputDiscount :
                        c.codigoCorrecto === true?
                        styles.containerInputDiscountCorrect:
                        c.codigoCorrecto === false?
                        styles.containerInputDiscountIncorrect:
                        styles.containerInputDiscount}>
                        <input
                            name='codigo'
                            placeholder={c.codigoDescuento? c.codigoDescuento: c.codigoReferido||''}
                            onChange={(e) => handleCodigo(e)}
                          />
                        <div className={styles.btnsDisc}>
                          <button onClick={(e)=>{aplicar(e,currentDate[0]._id)}}>Aplicar</button>
                          <button className={styles.quitar} onClick={(e)=>{quitar(e,currentDate[0]._id)}}>Quitar</button>
                        </div>
                      </div>
                    </div>
                    :'')}
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
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo*</label>
                <input
                  name='name'
                  value={post.name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              {!isPayAchpse && (
                <>
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
                </>
              )}

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

              {/* CHECKBOX */}
              <div className={styles.checkContainer}>
                <input type="checkbox" onChange={handleChecked} />
                <label htmlFor="">Paga fácil con tu tarjeta débito </label>
                <img src={iconAchPse} alt="icon-Ach-Pse" />
              </div>
              {!isPayAchpse && (
                <div className={styles.checkContainer}>
                  <input type="checkbox" onChange={handlePayU} />
                  <label htmlFor="">Paga fácil, rápido y seguro con Pay U </label>
                  <img src={iconPayU} alt="icon-payU" />
                </div>
              )}

              <div className={styles.containerDetailsBuy}>
                {!isPayAchpse ? (
                  <>
                    <div className={styles.detailsBuy}>
                      <p>Subtotal</p>
                      <span>${post.subTotal}</span>
                    </div>
                    <div className={styles.detailsBuy}>
                      <p>Descuento</p>
                      <span className={styles.detailDiscount}>-${post.descuentoTotal}</span>
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
                  </>
                ) : (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="back">Seleccione banco*</label>
                      <select name="bank" id="back">
                        <option value="Banco colombia">BANCO COLOMBIA</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="back">Tipo de cliente*</label>
                      <select name="bank" id="back">
                        <option value="Banco colombia">Persona natural</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="back">Tipo de documento*</label>
                      <select name="bank" id="back">
                        <option value="Banco colombia">
                          C.C ( Cédula de ciudadanía)
                        </option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="id">Número de dócumento*</label>
                      <input type="text" id="id" required />
                    </div>
                  </>
                )}
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
              <button onClick={handleSubmit} className={styles.btnForm}>
                    Pagar
                  </button>
                {/* <Link to={'/payment'}>
                  <button type="submit" className={styles.btnForm}>
                    Pagar
                  </button>
                </Link> */}
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
