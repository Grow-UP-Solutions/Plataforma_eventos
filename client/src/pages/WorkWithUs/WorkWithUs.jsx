import React from 'react';
import styles from './WorkWithUs.module.css';
import { Link } from 'react-router-dom';

const works = [
  {
    id: 'admin',
    title: 'Administrador',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 2,
  },
  {
    id: 'inge',
    title: 'Ingeniero',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'disegn',
    title: 'Diseñador UX',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 4,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
  {
    id: 'servclient',
    title: 'Servicio al cliente',
    description:
      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores impedit, quasi esse repellat numquam architecto nostrum ullam delectus, voluptas dolore ipsam obcaecati quibusdam vel facere ab doloribus nulla commodi?',
    quantity: 1,
  },
];

const WorkWithUs = () => {
  return (
    <div className={`${styles.pageWorkWithUs} container`}>
      <h1 className={styles.titleWorkWithUs}>Trabaja con nosotros</h1>
      <div>
        {works.map((work) => (
          <div key={work.id} className={styles.containerWork}>
            <div className={styles.containerInfoWork}>
              <h2 className={styles.titleWork}>
                {work.title} ({work.quantity})
              </h2>
              <p>{work.description}</p>
            </div>
            <Link className={styles.btnWork} to={`/workWithUs/form/${work.title}`}>
              Aplicar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkWithUs;
