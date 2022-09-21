import React, { useState } from 'react';
import style from './Privacy.module.css';

const Privacy = () => {

  const [clickOne, setClickOne] = useState(false);
  const [clickTwo, setClickTwo] = useState(true);
  
  const handleClickOne = (e) => {
    e.preventDefault();
    setClickOne(!clickOne);
    setClickTwo(!clickTwo);
    if(clickOne === true) setClickOne(true);
    if(clickTwo === false) setClickTwo(false);
  } 

  const handleClickTwo = (e) => {
    e.preventDefault();
    setClickTwo(!clickTwo);
    setClickOne(!clickOne);
    if(clickTwo === true) setClickTwo(true);
    if(clickOne === false) setClickOne(false);
  } 

  return (
    <div className={style.container}>

      <div className={style.container_box}>
        
        <span 
          onClick={handleClickOne}
          className={`${clickOne ? style.box_event : style.box1}`}
        >
          Organizador
        </span>

        <span className={style.hidden}></span>
        
        <span 
          onClick={handleClickTwo}
          className={`${clickTwo ? style.box_event : style.box2}`}
        >
          Usuario
        </span> 
      
      </div>

      <h1 className={style.title}>Privacidad</h1>

      <div className={style.container_text}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!</p>
        <br />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!</p>
        <br />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ad? Cumque nostrum officiis perspiciatis expedita autem! Consequuntur, velit. Architecto, officia asperiores. Nemo debitis atque asperiores impedit, nostrum fuga repellat minus!</p>
      </div>

    </div>
  );
}

export default Privacy;
