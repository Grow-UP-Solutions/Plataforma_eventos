import React, { useContext,useEffect } from 'react';
import styles from './CardProduct.module.css';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import { Navigation, Pagination } from 'swiper';
import { useState } from 'react';
import { stateContext } from '../../context/state/stateContext';

const CardProduct = ({ event }) => {


  const { carrito, setCarrito } = useContext(stateContext);
  console.log('carrito:',carrito)
  console.log('event:',event)

  const datesToBuy = []

  for(let i = 0 ; i < carrito.length ; i++){
    for(let j = 0 ; j < event.dates.length ; i++){
      if(carrito[i].fechasId === event.dates[j]._id){
        const fecha = event.dates[j]._id
        datesToBuy.push(fecha)
      }
    }
  }

  console.log('datesToBuy:',datesToBuy)
 

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 1;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage; 
  const currentCard = event.dates.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);
  console.log('currentCard',currentCard)

  const handlePrev = (e)=>{
    if(currentPage===1){
      setCurretPage(1)
    }else{
      setCurretPage(currentPage-1)
    }

  }

  const handleNext = (e)=>{
    if(currentPage===event.dates.length){
      setCurretPage(event.dates.length)
    }else{
      setCurretPage(currentPage+1)
    }
   
    
  }


  
  return (
    <div className={styles.cartProduct}>
      <div className={styles.containerProductDetails}>       
        <div className={styles.imgContainer}>
          <img src={event.pictures[0].picture} alt="img-product" />
        </div>
        <div className={styles.containerDescription}>
          <h2 className={styles.productName}>{event.title}</h2>
          <div className={styles.containercard}>
          
            <div>
            
              <div className={styles.productDate}>
              <button onClick={(e)=>handlePrev(e)}>
                <img src={iconArrowLeft} alt="icon-left" />
              </button>
                <span>{currentCard[0].dateFormated.replace('/', ' de ')}</span>
                <button onClick={(e)=>handleNext(e)}>
                <img src={iconArrowRight} alt="icon-right" />
              </button>
              </div>
             
              <div>
              <p className={styles.productTime}>{currentCard[0].start} a {currentCard[0].end}</p>
              <p className={styles.productLocation}>
              {event.departamento} - {event.municipio}
                </p>
              <p className={styles.productCupos}>
                Cupos disponibles : {currentCard[0].cupos}
              </p>
              </div>
            </div>
            {/* <div className={styles.container_pagination}>
              <Pagination 
                billsPerPage={CardPerPage}
                state={event.dates.length}
                paginado={paginado}
                page={currentPage}
              />
            </div> */}
          </div>
      

        {/* <div>
          <Swiper
                slidesPerView={1}
                navigation
                spaceBetween={0}
                modules={[Navigation]}
            >
               {event.dates.map((date)=>(
                <SwiperSlide >
                  <div>
                    <div className={styles.productDate}>
                      <span>{date.dateFormated.replace('/', ' de ')}</span>
                    </div>
                   <div>
                   <p className={styles.productTime}>{date.start} a {date.end}</p>
                   <p className={styles.productLocation}>
                   {event.departamento} - {event.municipio}
                    </p>
                   <p className={styles.productCupos}>
                     Cupos disponibles : {date.cupos}
                    </p>
                    </div>
                 </div>
               </SwiperSlide>
               ))}
              
           </Swiper>
        </div>  */}
          {/* {event.dates.map((date)=>(
            <div>
              <div className={styles.productDate}>
                <button className={styles.productDateBtn}>
                  <img src={iconArrowLeft} alt="icon-left" />
                </button>
                  <span>{date.dateFormated.replace('/', ' de ')}</span>
                <button className={styles.productDateBtn}>
                  <img src={iconArrowRight} alt="icon-left" />
                </button>
              </div>
              <p className={styles.productTime}>{date.start} a {date.end}</p>
              <p className={styles.productLocation}>
                {event.departamento} - {event.municipio}
              </p>
              <p className={styles.productCupos}>
                Cupos disponibles : {date.cupos}
              </p>
            </div>
          ))}  */}
          {/* {date!==undefined?
          <div>
              <div className={styles.productDate}>
                <button className={styles.productDateBtn}>
                  <img src={iconArrowLeft} alt="icon-left" />
                </button>
                  <span>{date.dateFormated.replace('/', ' de ')}</span>
                <button className={styles.productDateBtn}>
                  <img src={iconArrowRight} alt="icon-left" />
                </button>
              </div>
              <p className={styles.productTime}>{date.start} a {date.end}</p>
              <p className={styles.productLocation}>
                {event.departamento} - {event.municipio}
              </p>
              <p className={styles.productCupos}>
                Cupos disponibles : {date.cupos}
              </p>
            </div>
            :''} */}
       

        </div>
      </div>
      <div className={styles.containerOptions}>
        <div className={styles.productOptions}>
          <div className={styles.containerQuantity}>
            <p className={styles.titleQuantity}>Cantidad</p>
            <div className={styles.quantityBtns}>
              <button>
                <img src={iconArrowLeft} alt="icon-left" />
              </button>
              <span>4</span>
              <button>
                <img src={iconArrowRight} alt="icon-right" />
              </button>
            </div>
          </div>
          <div className={styles.containerPriceForBallot}>
            <p className={styles.titlePriceBallot}>Precio por cupo</p>
            <span>10.000$</span>
          </div>
          <div className={styles.containerPriceSubtotal}>
            <p className={styles.titleSubtotal}>Subtotal</p>
            <span>10.000$</span>
          </div>
        </div>
        <div className={styles.productDiscount}>
          <p className={styles.titleDiscount}>¿Tiene un código de descuento?</p>
          <div className={styles.containerInputDiscount}>
            <input type="text" />
            <button>Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;


//
{/* <div>
          <Swiper
                slidesPerView={1}
                navigation
                spaceBetween={0}
                modules={[Navigation]}
               
            >
               {event.dates.map((date)=>(
                <SwiperSlide >
                  <div>
                    <div className={styles.productDate}>
                      {/* <button className={styles.productDateBtn}>
                        <img src={iconArrowLeft} alt="icon-left" />
                      </button> */}
             //           <span>{date.dateFormated.replace('/', ' de ')}</span>
                      {/* <button className={styles.productDateBtn}>
                        <img src={iconArrowRight} alt="icon-left" />
                      </button> */}
                  //   </div>
                  //   <div>
                  //   <p className={styles.productTime}>{date.start} a {date.end}</p>
                  //   <p className={styles.productLocation}>
                  //     {event.departamento} - {event.municipio}
                  //   </p>
                  //   <p className={styles.productCupos}>
                  //     Cupos disponibles : {date.cupos}
                  //   </p>
                  //   </div>
                  // </div>
           //     </SwiperSlide>
              
      //    </Swiper>
      //    </div> */}
