import React, { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/state/stateContext';
import style from './Search.module.css';

const Search = ({ location = 'home' }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { setResult } = useContext(stateContext);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      setResult(input);
      navigate('/resultados-de-busqueda/');
      setInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(input);
    navigate('/resultados-de-busqueda/');
    setInput('');
  };

  return (
    <div className={style.container}>
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={input}
        className={`${location !== 'home' ? style.inputNotHome : style.inputHome}`}
        type='text'
        placeholder='Buscar un evento'
      />
      <button
        onClick={handleSubmit}
        className={`${location !== 'home' ? style.searchBtnNotHome : style.searchBtnHome}`}
      >
        <BsSearch className={`${location !== 'home' ? style.iconSearchNotHome : style.iconSearchHome}`} />
      </button>
    </div>
  );
};

export default Search;
