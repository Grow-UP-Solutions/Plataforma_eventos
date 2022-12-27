import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UIContext } from '../../context/ui';
import styles from './Categories.module.css';

const Categories = () => {
  const { categories } = useContext(UIContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const data = e.target.id;
    navigate('/resultado-categoria/' + data);
  };

  return (
    <div id='categories' className={`${styles.sectionCategories} container`}>
      <h2 className={styles.titleCategories}>Categorías</h2>
      <ul className={styles.listCategories}>
        {categories.map((categorie) => {
          return (
            <li key={categorie.name} className={styles.categorie}>
              <img src={categorie.img} alt={categorie.name} onClick={handleClick} id={categorie.name} />
              <div className={styles.categorieText}>
                <p id={categorie.name} onClick={handleClick} className={styles.categorieTitle}>
                  {categorie.name}
                </p>
                <p className={styles.categorieDescription}>{categorie.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
