import React, { useContext, useState } from 'react';
import style from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import events from '../../api/events';
import { stateContext } from '../../context/state/stateContext';

const Search = ({ location = 'home' }) => {

  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const {setResult} = useContext(stateContext);
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
        className={`${
          location !== 'home' ? style.inputNotHome : style.inputHome
        }`}
        type="text"
        placeholder="Buscar"
      />
      <button
        onClick={handleSubmit}
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
