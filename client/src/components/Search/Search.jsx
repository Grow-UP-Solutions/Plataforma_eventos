import React from 'react';
import style from './Search.module.css';

import { BsSearch } from 'react-icons/bs';

const Search = () => {
  return (
    <div className={style.container}>
      <input className={style.input} type="text" placeholder="Buscar" />
      <button className={style.searchBtn}>
        <BsSearch className={style.iconSearch} />
      </button>
    </div>
  );
};

export default Search;
