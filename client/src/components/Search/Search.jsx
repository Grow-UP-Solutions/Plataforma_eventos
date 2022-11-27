import React, { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/state/stateContext';
import style from './Search.module.css';

const Search = ({ location = 'home' }) => {

  const [input, setInput] = useState('');
  const [municipio, setMunicipio] = useState('');
  const navigate = useNavigate();
  const { setResult, setMuni } = useContext(stateContext);
 
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleChangeMuni = (e) => {
    e.preventDefault();
    setMunicipio(e.target.value)
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      setResult(input);
      setMuni(municipio)
      navigate('/resultados-de-busqueda/');
      setInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(input);
    setMuni(municipio)
    navigate('/resultados-de-busqueda/');
    setInput('');
  };

  return (
    <div className={style.container}>
      <input
        onChange={(e)=>handleChangeMuni(e)}
        onKeyPress={handleKeyPress}
        value={municipio}
        className={`${location !== 'home' ? style.inputNotHomeMuni : style.inputHomeMuni}`}
        type='text'
        placeholder='Municipio'
      />

      <input
        onChange={(e)=>handleChange(e)}
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
