
import React, { useEffect } from 'react';
import style from './News.module.css';
import { animateScroll as scroll } from 'react-scroll';

const noticias = [
  {
    id: 1,
    title: 'Los nuevos eventos en Colombia',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 2,
    title: 'Hoy comienza el cliclo de Literatura',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 3,
    title: 'Nuevos diseñadores',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 4,
    title: 'Guia practica',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  }
];

const News = () => {

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Noticias</h1>
      <div>
        {
          noticias.map((noti) => (
            <div key={noti.id} className={style.container_news}>

              <div className={style.container_info}>
                <h2 className={style.title_news}>
                  {noti.title}
                </h2>
                <p>{noti.description}</p>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default News;
