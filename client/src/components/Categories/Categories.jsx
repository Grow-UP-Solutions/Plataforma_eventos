import React from 'react';
import styles from './Categories.module.css';

import { categories } from '../../api/categories';

const Categories = () => {
  return (
    <div className={styles.sectionCategories}>
      <h2 className={styles.titleCategories}>Categorías</h2>
      <ul className={styles.listCategories}>
        {categories.map((categorie) => {
          return (
            <li className={styles.categorie}>
              <img src={categorie.img} alt={categorie.name} />
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
