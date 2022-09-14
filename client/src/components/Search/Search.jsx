import React from 'react';
import style from './Search.module.css';

const Search = () => {

  return (
    <div className={style.container}>
      <input className={style.input} type="text" placeholder='Buscar'/>

    </div>
  );
}

export default Search;
