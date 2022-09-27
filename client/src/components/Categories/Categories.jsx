import React, { useContext } from 'react';
import styles from './Categories.module.css';
import { stateContext } from '../../context/state/stateContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Categories = () => {

  const allCategories = useSelector((state) => state.categories);
  const allEvents = useSelector((state) => state.events);
  const { setResult } = useContext(stateContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const data = e.target.id
    const filtro = allEvents.filter((event) =>
      event.category.find((e) => e.name === data)
    );  
    setResult(filtro);
    navigate('/categories/');
  };

  return (
    <div className={styles.sectionCategories}>
      <h2 className={styles.titleCategories}>Categorías</h2>
      <ul className={styles.listCategories}>
        {allCategories.map((categorie) => {
          return (
            <li key={categorie.name} className={styles.categorie}>
              <img src={categorie.img} alt={categorie.name} />
              <div className={styles.categorieText}>
                <p
                  id={categorie.name}
                  onClick={handleClick}
                  className={styles.categorieTitle}
                >
                  {categorie.name}
                </p>
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
