import React from 'react';
import style from './Search.module.css';
import { BsSearch } from 'react-icons/bs';

const Search = ({ location = 'home' }) => {
  return (
    <div className={style.container}>
      <input
        className={`${
          location !== 'home' ? style.inputNotHome : style.inputHome
        }`}
        type="text"
        placeholder="Buscar"
      />
      <button
        className={`${
          location !== 'home' ? style.searchBtnNotHome : style.searchBtnHome
        }`}
      >
        <BsSearch
          className={`${
            location !== 'home' ? style.iconSearchNotHome : style.iconSearchHome
          }`}
        />
      </button>
    </div>
  );
};

export default Search;
