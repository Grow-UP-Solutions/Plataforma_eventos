import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import style from './SearchResult.module.css';
import Card from '../Cards/Card';

const SearchResut = () => {

  const {result} = useContext(Context);

  return (
    <div className={style.container}>
      <p className={style.title}>Eventos</p>
      <div className={style.containerCard}>
       
        {
          result.length ? 
          (
            result.map((event, index) => {
              return (
                <div key={index} className={style.card}>
                  <Card event={event} />
                </div>
              );
            })
          ) : (<h5>No hay eventos</h5>)
        }
        
      </div>
    </div>
  );
}

export default SearchResut;