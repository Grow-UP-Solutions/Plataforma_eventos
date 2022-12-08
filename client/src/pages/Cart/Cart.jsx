import React, { useContext, useEffect } from 'react';
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
import { administracion, iva } from '../../utils/administracion';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { postPayment } from '../../redux/actions';

const Cart = () => {
  const id = useParams().id;
  const events = useSelector((state) => state.events);
  const eventDetail = events.filter((e) => e._id === id)[0];
  const { carrito, setCarrito } = useContext(stateContext);
  const { dateToBuy, setDateToBuy } = useContext(stateContext);
  const { code, setCode } = useContext(stateContext);
  const { valorTotal, setValorTotal } = useContext(stateContext);
  const { subTotal, setSubTotal } = useContext(stateContext);
  const dispatch = useDispatch();

  const [descuentoTotal, setDescuentoTotal] = useState('0');

  //PAGINADO//

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 1;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentDate = dateToBuy.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);
  const fechaIn = dateToBuy.length;

  const handlePrev = (e) => {
    if (currentPage === 1) {
      setCurretPage(dateToBuy.length);
    } else {
      setCurretPage(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    if (currentPage === dateToBuy.length) {
      setCurretPage(1);
    } else {
      setCurretPage(currentPage + 1);
    }
  };

  // ----- carrito-------//

  useEffect(() => {
    const precioTotal = subTotal + iva + administracion - descuentoTotal;

    setValorTotal(precioTotal);
  }, [subTotal]);

  useEffect(() => {
    const f = subTotal + iva + administracion - descuentoTotal;
    setValorTotal(f);
  }, [descuentoTotal]);

  // // -----CUPOS-------//

  const [numberBuyCupos, setNumberBuyCupos] = useState(0);

  const handleNumberBuyCupos = (e, num, id, cupos) => {
    //const carritoCupos = [...carrito]
    if (num <= -1) return;
    if (num > cupos) return;
    setNumberBuyCupos(num);

    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idDate === id) {
        carrito[i].quantity = num;
        carrito[i].subtotal = num * carrito[i].price;
        carrito[i].ganancias = carrito[i].priceOrg * carrito[i].quantity;
      }
    }
  };

  useEffect(() => {
    const sTotal = [];
    for (let i = 0; i < carrito.length; i++) {
      sTotal.push(carrito[i].subtotal);
      let total = sTotal.reduce((a, b) => a + b, 0);
      setSubTotal(total);
    }
  }, [numberBuyCupos]);

  // -----CODIGOS-------//
  // codigo de prueba Zbc1234//
  // codigo de prueba Zac1234//

  const [codigo, setCodigo] = useState('');
  const [desc, setDesc] = useState('');

  const handleCodigo = (e) => {
    e.preventDefault();
    setCodigo(e.target.value);
  };

  const aplicar = async (e, id) => {
    e.preventDefault();

    for (let c = 0; c < carrito.length; c++) {
      if (carrito[c].idDate === id) {
        for (let d = 0; d < currentDate[0].codigos.length; d++) {
          if (currentDate[0].codigos[d].codigo === codigo) {
            const descValor = currentDate[0].codigos[d].descuento; //10%
            carrito[c].codigoDescuento = codigo;
            carrito[c].codigoCorrecto = true;

            const valorDescuento = (descValor * currentDate[0].price) / 100; //$1000
            const valorDescuentoCupos = valorDescuento * carrito[c].quantity; //$2000

            carrito[c].descuento = valorDescuentoCupos; //$2000

            const unitDic = carrito[c].unit_price - valorDescuento;
            carrito[c].unit_price = unitDic;

            setDesc(carrito[c].descuento);
            return swal({
              title: 'Codigo Aplicado',
            });
          } else if (currentDate[0].codigos[d].codigo !== codigo) {
            console.log('en referal');

            const codeResult = await eventsApi.get(`/codeDiscount/getCodeDiscountByCode/${codigo} `);

            if (codeResult.data.codeDiscount.length === 1) {
              carrito[c].codigoReferido = codeResult.data.codeDiscount[0].code;
              carrito[c].codigoCorrecto = true;
              carrito[c].descuento = codeResult.data.codeDiscount[0].value;

              const refUnit = codeResult.data.codeDiscount[0].value / carrito[c].quantity;

              //const descuentoUnit = carrito[c].unit_price - codeResult.data.codeDiscount[0].value

              const descuentoUnit = carrito[c].unit_price - refUnit;

              carrito[c].unit_price = descuentoUnit;

              setDesc(codeResult.data.codeDiscount[0].value);

              return swal({
                title: 'Codigo Aplicado',
              });
            } else {
              carrito[c].codigoCorrecto = false;
              return swal({
                title: 'Codigo Incorrecto',
                icon: 'warning',
                dangerMode: true,
              });
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const desTotal = [];
    for (let i = 0; i < carrito.length; i++) {
      desTotal.push(carrito[i].descuento);
      let total = desTotal.reduce((a, b) => a + b, 0);
      setDescuentoTotal(total);
    }
  }, [desc]);

  const quitar = (e, id) => {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idDate === id) {
        const desc = carrito[i].descuento;

        const descUnit = carrito[i].descuento / carrito[i].quantity;

        const resto = descuentoTotal - desc;
        const restoTotal = valorTotal - desc;

        carrito[i].unit_price = carrito[i].unit_price + descUnit;

        setValorTotal(restoTotal);
        setDescuentoTotal(resto);
        setCodigo('');

        carrito[i].codigoDescuento = '';
        carrito[i].codigoReferido = '';
        carrito[i].descuento = '';
        carrito[i].codigoCorrecto = '';
      }
    }
  };

  //----USER---///

  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({
    name: '',
    documentNumber: '',
    address: '',
    city: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    if (user.uid) {
      const userResult = await eventsApi.get(`/users/${user.uid}`);

      setPost({
        ...post,
        name: userResult.data.name,
        documentNumber: userResult.data.document,
        address: userResult.data.direction,
        city: userResult.data.city,
        phone: userResult.data.phone,
        email: userResult.data.email,
      });
    }
  };

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  //---SUBMIT---//

  async function handleSubmit(e) {
    e.preventDefault();

    const costos = administracion + iva;

    
    const ganancia = [];
    const f = [];
    const cod = [];
    for (let i = 0; i < carrito.length; i++) {

      const costoCarrito = costos/carrito.length

      carrito[i].costos = costoCarrito/carrito[i].quantity 
      carrito[i].unit_price = carrito[i].price+carrito[i].costos
      

      ganancia.push(carrito[i].ganancias);

      const d = {
        title: eventDetail.title,
        quantity: carrito[i].quantity,
        unit_price: Math.trunc(carrito[i].unit_price),
        id: carrito[i].idDate,
        ganancias: carrito[i].ganancias,
        codigo: carrito[i].codigoDescuento || null,
      };
      f.push(d);

      const c = carrito[i].codigoDescuento;
      cod.push(c);

      setCode([
        {
          idEvent: eventDetail._id,
          idDate: carrito[i].idDate,
          code: carrito[i].codigoDescuento,
        },
      ]);
    }

    const gananciaTotalOrg = ganancia.reduce((a, b) => a + b);

    console.log({ gananciaTotalOrg });

    const payload = {
      idUser: user.uid,
      idEvent: eventDetail._id,
      ganancia: gananciaTotalOrg,
      dates: f,
    };

    console.log('payload', payload);

    const json = await eventsApi.post('/mercadoPago/orden', payload);
    console.log('res:', json.data);

    window.location.assign(json.data.init_point);
  }

  const [nextPageForm, setNextPageForm] = useState(false);

  return (
    <div className={`${styles.pageCart} container`}>
      {dateToBuy.length > 0 && !nextPageForm && (
        <>
          {carrito.length > 1 ? (
            <h1 className={styles.pageCartTitle}>Usted está comprando: {carrito.length} Fechas</h1>
          ) : (
            <h1 className={styles.pageCartTitle}>Usted está comprando</h1>
          )}
          <div className={styles.containerPageCart}>
            <div className={styles.containerCardProduct}>
              {/* CARD PRODUCT */}
              {eventDetail !== undefined ? (
                <div>
                  <div className={styles.cartProduct}>
                    <div className={styles.containerProductDetails}>
                      <div className={styles.imgContainer}>
                        <img src={eventDetail.pictures[0].picture} alt='img-product' />
                      </div>
                      <div className={styles.containerDescription}>
                        <h2 className={styles.productName}>{eventDetail.title}</h2>
                        <div className={styles.containercard}>
                          <div>
                            <div className={styles.productDate}>
                              {carrito.length === 1 ? (
                                <div className={styles.quantityBtns}>
                                  <span>{currentDate[0].dateFormated.replace('/', ' de ')}</span>
                                </div>
                              ) : (
                                <div className={styles.quantityBtns}>
                                  <button onClick={(e) => handlePrev(e)}>
                                    <img src={iconArrowLeft} alt='icon-left' />
                                  </button>
                                  <span>{currentDate[0].dateFormated.replace('/', ' de ')}</span>
                                  <button onClick={(e) => handleNext(e)}>
                                    <img src={iconArrowRight} alt='icon-right' />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className={styles.productTime}>
                                {currentDate[0].start} a {currentDate[0].end}
                              </p>
                              <p className={styles.productLocation}>
                                {eventDetail.departamento} - {eventDetail.municipio}
                              </p>
                              <p className={styles.productCupos}>Cupos disponibles : {currentDate[0].cupos}</p>
                              {carrito.length > 1 ? (
                                <h2 className={styles.fechaIn}>
                                  Fecha: {currentPage} / {carrito.length}
                                </h2>
                              ) : (
                                ''
                              )}
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

                          {carrito.map((c) =>
                            c.idDate === currentDate[0]._id ? (
                              <div className={styles.quantityBtns}>
                                <button
                                  onClick={(e) =>
                                    handleNumberBuyCupos(e, c.quantity - 1, c.idDate, currentDate[0].cupos)
                                  }
                                >
                                  <img src={iconArrowLeft} alt='icon-left' />
                                </button>
                                <span>{c.quantity}</span>
                                <button
                                  onClick={(e) =>
                                    handleNumberBuyCupos(e, c.quantity + 1, c.idDate, currentDate[0].cupos)
                                  }
                                >
                                  <img src={iconArrowRight} alt='icon-right' />
                                </button>
                              </div>
                            ) : (
                              ''
                            )
                          )}
                        </div>

                        {/* Precio por cupo */}
                        <div className={styles.containerPriceForBallot}>
                          <p className={styles.titlePriceBallot}>Precio por cupo</p>
                          <span>${currentDate[0].price}</span>
                        </div>

                        {/* Subtotal fecha actual */}
                        {carrito.map((c) =>
                          c.idDate === currentDate[0]._id ? (
                            <div className={styles.containerPriceSubtotal}>
                              <p className={styles.titleSubtotal}>Subtotal</p>
                              <span>${c.subtotal}</span>
                            </div>
                          ) : (
                            ''
                          )
                        )}
                      </div>
                      {carrito.length > 0 &&
                        carrito.map((c) =>
                          c.idDate === currentDate[0]._id ? (
                            <div className={styles.productDiscount}>
                              <p className={styles.titleDiscount}>¿Tiene un código de descuento?</p>
                              <div className={styles.containerInputBtnsDiscount}>
                                {c.codigoCorrecto === '' ? (
                                  <div className={styles.containerInputDiscount}>
                                    <input name='codigo' placeholder={''} onChange={(e) => handleCodigo(e)} />
                                  </div>
                                ) : c.codigoCorrecto === true ? (
                                  <div className={styles.containerInputDiscountCorrect}>
                                    <input name='codigo' placeholder={c.codigoDescuento || c.codigoReferido} disabled />
                                  </div>
                                ) : c.codigoCorrecto === false ? (
                                  <div className={styles.containerInputDiscountIncorrect}>
                                    <input
                                      name='codigo'
                                      placeholder={c.codigoDescuento || ''}
                                      onChange={(e) => handleCodigo(e)}
                                    />
                                  </div>
                                ) : (
                                  <div className={styles.containerInputDiscount}>
                                    <input
                                      name='codigo'
                                      placeholder={c.codigoDescuento || ''}
                                      onChange={(e) => handleCodigo(e)}
                                    />
                                  </div>
                                )}
                                <div className={styles.btnsDisc}>
                                  <button
                                    className={styles.quitar}
                                    onClick={(e) => {
                                      aplicar(e, currentDate[0]._id);
                                    }}
                                  >
                                    Aplicar
                                  </button>
                                  <button
                                    className={styles.quitar}
                                    onClick={(e) => {
                                      quitar(e, currentDate[0]._id);
                                    }}
                                  >
                                    Quitar
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )
                        )}
                    </div>
                  </div>
                  {eventDetail.specialRequires.length > 1 ? (
                    <div className={styles.summaryCart}>
                      <h2 className={styles.summaryTitle}>
                        <img src={iconExclamation} alt='icon-exclamation' />
                        <span>Accesibilidad y requerimientos especiales</span>
                      </h2>
                      <p className={styles.summaryDescription}>{eventDetail.specialRequires}</p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                'LOADING...'
              )}
            </div>

            {/* FORM PRODUCT */}
            <div className={styles.formPayProduct}>
              <form action=''>
                {/* USUER DATA*/}
                <div>
                  <div className={styles.formGroup}>
                    <label htmlFor='name'>Nombre Completo*</label>
                    <input name='name' value={post.name} onChange={(e) => handleChange(e)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor='id'>Número de cédula*</label>
                    <input name='document' value={post.document} onChange={(e) => handleChange(e)} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='address'>Dirección</label>
                    <input name='address' value={post.address} onChange={(e) => handleChange(e)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor='city'>Ciudad</label>
                    <input name='city' value={post.city} onChange={(e) => handleChange(e)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor='phone'>Télefono*</label>
                    <input name='phone' value={post.phone} onChange={(e) => handleChange(e)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor='mail'>Correo electrónico</label>
                    <input name='email' value={post.email} onChange={(e) => handleChange(e)} required />
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
                  Al hacer clic en ‘Pagar,’ confirmas que has leído y aceptas la Política de privacidad, la Políticas de
                  seguridad y los Términos y condiciones de LO QUE QUIERO HACER S.A.S. También confirmas que eres mayor
                  de edad y que aceptas ser contactado por Nosotros en relación a los eventos que compres.
                </p>

                <div className={styles.containerButtonForm}>
                  <button onClick={(e) => handleSubmit(e)} className={styles.btnForm}>
                    Pagar
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.containerResponsiveDetailBuy}>
            <h2 className={styles.titleResponsiveDetailBuy}>Resumen de la compra</h2>
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
          </div>

          <div className={styles.containerResponsiveAccesbility}>
            {eventDetail.specialRequires.length > 1 && (
              <div className={styles.summaryCart}>
                <h2 className={styles.summaryTitle}>
                  <img src={iconExclamation} alt='icon-exclamation' />
                  <span>Accesibilidad y requerimientos especiales</span>
                </h2>
                <p className={styles.summaryDescription}>{eventDetail.specialRequires}</p>
              </div>
            )}
          </div>

          <div className={styles.containerResponsiveBtnPagar}>
            <button onClick={() => setNextPageForm(true)}>Pagar</button>
          </div>
        </>
      )}

      {nextPageForm && (
        <div className={styles.containerResponsiveForm}>
          <div className={styles.containerIconReturn}>
            <MdOutlineArrowBackIos onClick={() => setNextPageForm(false)} className={styles.iconReturn} />
          </div>
          <div>
            <div className={styles.formGroup}>
              <label htmlFor='name'>Nombre Completo*</label>
              <input name='name' value={post.name} onChange={(e) => handleChange(e)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='id'>Número de cédula*</label>
              <input name='document' value={post.document} onChange={(e) => handleChange(e)} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='address'>Dirección</label>
              <input name='address' value={post.address} onChange={(e) => handleChange(e)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='city'>Ciudad</label>
              <input name='city' value={post.city} onChange={(e) => handleChange(e)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='phone'>Télefono*</label>
              <input name='phone' value={post.phone} onChange={(e) => handleChange(e)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='mail'>Correo electrónico</label>
              <input name='email' value={post.email} onChange={(e) => handleChange(e)} required />
            </div>
          </div>

          <div className={`${styles.detailsBuy} ${styles.totalBuy}`}>
            <p>Valor total Inc IVA</p>
            <span>${valorTotal}</span>
          </div>

          <p className={styles.textTerms}>
            Al hacer clic en ‘Pagar’ confirma que ha leído y entendido nuestros Términos y Condiciones, Notas legales de
            privacidad y Seguridad.
          </p>

          <div className={styles.containerResponsiveBtnPagar}>
            <button onClick={(e) => handleSubmit(e)}>Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
