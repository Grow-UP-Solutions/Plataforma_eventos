import React, { useContext, useState } from 'react';
import style from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/state/stateContext';
import { useSelector } from 'react-redux';

const Search = ({ location = 'home' }) => {

  const [input, setInput] = useState('');
  const allEvents = useSelector((state) => state.events);
  const navigate = useNavigate();
  const { setResult } = useContext(stateContext);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      const title = allEvents.filter((event) => {
        const response = event.title === input;
        return response;
      });
      setResult(title);
      navigate('/search/');
      setInput('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = allEvents.filter((event) =>
      event.title === input
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
