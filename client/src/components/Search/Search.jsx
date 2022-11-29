import React, { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/state/stateContext';
import style from './Search.module.css';
import { getColombia } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Search = ({ location = 'home' }) => {

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getColombia());
  }, []);

  const departamentosAll = useSelector((state) => state.departamentos);

  const departamentosFilter = departamentosAll.map((departamento) => {
    const municipios = []
    return {
      municipio: departamento.municipio,
    };
  });

  const municipios = []
    for(let i = 0; i<departamentosFilter.length;i++){
      municipios.push(departamentosFilter[i].municipio)
    }

  const municipiosOrdered = municipios.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  });


  

 


  

  return (
    <div className={style.container}>
      <input
        list='municipios'
        id='myMuni'
        name='municipio'
        onChange={(e)=>handleChangeMuni(e)}
        onKeyPress={handleKeyPress}
        value={municipio}
        className={`${location !== 'home' ? style.inputNotHomeMuni : style.inputHomeMuni}`}
        type='text'
        placeholder='Municipio'
      />
      <datalist id='municipios'>
        {municipios.length &&
          municipios.map((municipio) => (
            <option value={municipio}>{municipio}</option>
          ))}
      </datalist>

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
