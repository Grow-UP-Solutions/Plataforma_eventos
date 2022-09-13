import React, { useState, useEffect } from 'react';
import style from './CarrouselHome.module.css'; 

const CarrouselHome = () => {
  
  return (
    <div className={style.container}>
      <div className={style.carousel}>
        <img className={style.img} src="https://res.cloudinary.com/djsp3n1qy/image/upload/v1663093777/Plataforma_Eventos/image12_rhn20q.svg" alt="foto1" />
      </div>
      
      <div className={style.input}>
        <input type="radio" />
        <input type="radio" />
        <input type="radio" />
      </div>
      
    </div>
  );
}

export default CarrouselHome;
