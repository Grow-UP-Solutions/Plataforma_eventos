import React, { useContext, useState } from 'react';
import style from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import events from '../../api/events';
import { Context } from '../../context/Context';

const Search = () => {

  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const {setResult} = useContext(Context);
  const allEvents = events;

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      const title = allEvents.filter((e) =>
      e.name.toLowerCase().includes(input.toLowerCase())
      );
      setResult(title);
      navigate('/search/');
      setInput('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = allEvents.filter((e) =>
    e.name.toLowerCase().includes(input.toLowerCase())
    );
    setResult(title);
    navigate('/search/');
    setInput('');
  }  

  return (
    <div className={style.container}>

      <input 
        onChange={handleChange} 
        onKeyPress={handleKeyPress}
        value={input} 
        className={style.input} 
        type="text" 
        placeholder="Buscar" 
      />
      <button onClick={handleSubmit} className={style.searchBtn}>
        <BsSearch className={style.iconSearch} />
      </button>

    </div>
  );
};

export default Search;
