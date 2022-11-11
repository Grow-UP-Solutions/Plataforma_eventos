
import React, { useEffect } from 'react';
import style from './Press.module.css';
import { animateScroll as scroll } from 'react-scroll';

const prensa = [
  {
    id: 1,
    title: 'Prensa nº 1',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 2,
    title: 'Prensa nº 2',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 3,
    title: 'Prensa nº 3',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  },
  {
    id: 4,
    title: 'Prensa nº 4',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
  }
];

const Press = () => {

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Prensa</h1>
      <div>
        {
          prensa.map((noti) => (
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

export default Press;
