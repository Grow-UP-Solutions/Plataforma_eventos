import React, { useState } from 'react';
import styles from './Categories.module.css';
import events from '../../api/events';
import categories from '../../api/categories';

const Categories = () => {

  const [data, setData] = useState('');
  const [state, setState] = useState([]);
  const allEvents = events;
  const allCategories = categories;

  const handleClick = (e) => {
    e.preventDefault();
    setData(e.target.name);
    const filtro = allEvents.filter((event) =>
      event.category.name === e.target.name
    );
    setState(filtro);
  }

  return (
    <div className={styles.sectionCategories}>
      <h2 className={styles.titleCategories}>Categorías</h2>
      <ul className={styles.listCategories}>
        {allCategories.map((categorie) => {
          return (
            <li className={styles.categorie}>
              <img name={categorie.name} onClick={handleClick} src={categorie.img} alt={categorie.name} />
              <div className={styles.categorieText}>
                <p className={styles.categorieTitle}>{categorie.name}</p>
                <p className={styles.categorieDescription}>
                  {categorie.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
