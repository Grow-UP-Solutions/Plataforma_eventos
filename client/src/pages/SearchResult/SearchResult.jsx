import React, { useContext, useEffect } from 'react';
import style from './SearchResult.module.css';

import { animateScroll as scroll } from 'react-scroll';
import { Context } from '../../context/Context';

import { Card } from '../../components';

const SearchResult = () => {
  const { result } = useContext(Context);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>Eventos</p>
      <div className={style.containerCard}>
        {result.length ? (
          result.map((event, index) => {
            return (
              <div key={index} className={style.card}>
                <Card event={event} />
              </div>
            );
          })
        ) : (
          <h5>No hay eventos</h5>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
