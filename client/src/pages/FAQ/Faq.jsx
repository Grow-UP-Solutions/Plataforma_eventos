import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsCalendar2Check, BsSearch } from 'react-icons/bs';
import { RiUserLine } from 'react-icons/ri';
import { TbHeadset } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import style from './Faq.module.css';
import { animateScroll as scroll } from 'react-scroll';

const apiFaqUsuario = [
  {
    id: 1,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text: 'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.'
  },
  {
    id: 2,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text: 'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.'
  },
  {
    id: 3,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text: 'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.'
  },
  {
    id: 4,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text: 'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.'
  },
  {
    id: 5,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text: 'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.'
  },
];

const apiFaqOrganizador = [
  {
    id: 1,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text: 'Durante los últimos años hemos crecido y hoy en dia contamos con presencia a nivel regional. Contamos con oficinas en Santiago de Chile, Buenos Aires y Lima. A su vez trabajamos con partners locales en Bolivia, Paraguay y Uruguay. Queremos posicionarnos como una de las empresas más importantes del sector, por eso brindamos a nuestros clientes un servicio con experiencia, profesional y trabajo en conjunto.',
  },
  {
    id: 2,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text: 'Durante los últimos años hemos crecido y hoy en dia contamos con presencia a nivel regional. Contamos con oficinas en Santiago de Chile, Buenos Aires y Lima. A su vez trabajamos con partners locales en Bolivia, Paraguay y Uruguay. Queremos posicionarnos como una de las empresas más importantes del sector, por eso brindamos a nuestros clientes un servicio con experiencia, profesional y trabajo en conjunto.',
  },
  {
    id: 3,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text: 'Durante los últimos años hemos crecido y hoy en dia contamos con presencia a nivel regional. Contamos con oficinas en Santiago de Chile, Buenos Aires y Lima. A su vez trabajamos con partners locales en Bolivia, Paraguay y Uruguay. Queremos posicionarnos como una de las empresas más importantes del sector, por eso brindamos a nuestros clientes un servicio con experiencia, profesional y trabajo en conjunto.',
  },
  {
    id: 4,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text: 'Durante los últimos años hemos crecido y hoy en dia contamos con presencia a nivel regional. Contamos con oficinas en Santiago de Chile, Buenos Aires y Lima. A su vez trabajamos con partners locales en Bolivia, Paraguay y Uruguay. Queremos posicionarnos como una de las empresas más importantes del sector, por eso brindamos a nuestros clientes un servicio con experiencia, profesional y trabajo en conjunto.',
  },
  {
    id: 5,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text: 'Durante los últimos años hemos crecido y hoy en dia contamos con presencia a nivel regional. Contamos con oficinas en Santiago de Chile, Buenos Aires y Lima. A su vez trabajamos con partners locales en Bolivia, Paraguay y Uruguay. Queremos posicionarnos como una de las empresas más importantes del sector, por eso brindamos a nuestros clientes un servicio con experiencia, profesional y trabajo en conjunto.',
  },
]

const Faq = () => {

  const [expanded, setExpanded] = useState(false);
  const [usuario, setUsuario] = useState(true);
  const [organizador, setOrganizador] = useState(false);
  const [newSearch, setNewSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickUsuario = (e) => {
    e.preventDefault();
    setUsuario(!usuario);
    setOrganizador(!organizador);
    if (usuario === true) setUsuario(true);
    if (organizador === false) setOrganizador(false);
  };

  const handleClickOrganizador = (e) => {
    e.preventDefault();
    setOrganizador(!organizador);
    setUsuario(!usuario);
    if (organizador === true) setOrganizador(true);
    if (usuario === false) setUsuario(false);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setNewSearch(e.target.value);
  }

  const handleClickSearch = (e) => {
    e.preventDefault();

  }
  
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Typography variant='h1' fontWeight={'bold'}>
          ¡Hola! ¿Cómo te
        </Typography>
        <Typography variant='h1' fontWeight={'bold'}>
          podemos ayudar?
        </Typography>

        <br />
        <br />
        <br />

        <input type='text' placeholder='Escribe una palabra clave' className={style.input} onChange={handleChangeSearch}/>
        <button className={style.button}>
          <BsSearch className={style.loop} />
        </button>
        <TbHeadset className={style.headset} />
      </header>

      <main>
        <div className={style.container_box}>
          <span className={organizador ? style.box : style.box1} onClick={handleClickOrganizador}>
            <BsCalendar2Check className={style.icon} />
            <p>Organizador</p>
          </span>

          <span className={usuario ? style.box : style.box1} onClick={handleClickUsuario}>
            <RiUserLine className={style.icon} />
            <p>Usuario</p>
          </span>
        </div>

        {
          usuario ?
          apiFaqUsuario.map((e) => (
            <div className={style.container_accordion}>
              <Accordion
                expanded={expanded === `panel${e.id}`}
                onChange={handleChange(`panel${e.id}`)}
                sx={{ backgroundColor: 'transparent' }}
              >
                <AccordionSummary
                  className={style.box_accordion}
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: '#585858',
                        fontSize: '3rem',
                      }}
                    />
                  }
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                  sx={{
                    backgroundColor: 'white',
                    boxShadow: '1px 1px 5px 1px #d6d6d6',
                    borderRadius: '5px',
                    margin: '1rem 0 0 0',
                  }}
                >
                  <p className={style.text}>{e.title}</p>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                  <p className={style.detail}>{e.text}</p>
                </AccordionDetails>
              </Accordion>
            </div>
          )) :
          apiFaqOrganizador.map((e) => (
            <div className={style.container_accordion}>
              <Accordion
                expanded={expanded === `panel${e.id}`}
                onChange={handleChange(`panel${e.id}`)}
                sx={{ backgroundColor: 'transparent' }}
              >
                <AccordionSummary
                  className={style.box_accordion}
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: '#585858',
                        fontSize: '3rem',
                      }}
                    />
                  }
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                  sx={{
                    backgroundColor: 'white',
                    boxShadow: '1px 1px 5px 1px #d6d6d6',
                    borderRadius: '5px',
                    margin: '1rem 0 0 0',
                  }}
                >
                  <p className={style.text}>{e.title}</p>
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                  <p className={style.detail}>{e.text}</p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        }

        <p className={style.parrafo}>
          ¿No encontraste la respuesta que buscabas?{' '}
          <Link className={style.link} to={'/contactanos'}>
            Contáctanos
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Faq;

/**
|--------------------------------------------------
| 

{
    usuario ?
          


          <div className={style.container_accordion}>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              sx={{ backgroundColor: 'transparent' }}
            >
              <AccordionSummary
                className={style.box_accordion}
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel1bh-content'
                id='panel1bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Usuario</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit vitae iste enim optio provident laborum
                  voluptates obcaecati laudantium. Libero rem consequuntur cupiditate delectus omnis soluta, natus
                  officiis voluptatibus architecto ipsam.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel2bh-content'
                id='panel2bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Usuario</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem voluptatibus asperiores tempora
                  omnis aperiam recusandae obcaecati molestias officia facilis, nam nostrum! Iste doloribus quas nostrum
                  placeat omnis odio atque.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel3bh-content'
                id='panel3bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Usuario</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, error! Nam, vitae et nobis vel nisi
                  exercitationem aperiam harum, quos culpa ad omnis odit, minima maxime nesciunt pariatur porro ipsa?
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel4bh-content'
                id='panel4bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Usuario</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil ipsum nam tempora excepturi
                  ab sapiente est in reprehenderit, nulla commodi voluptatem porro quasi. Et maiores accusantium sint
                  fugiat beatae?
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel5bh-content'
                id='panel5bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Usuario</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque libero corporis, perferendis eaque ut
                  illum eveniet sit nemo in ratione sed reiciendis ullam minima dolor facilis rerum ab quae recusandae.
                </p>
              </AccordionDetails>
            </Accordion>
          </div>  
          :
          <div className={style.container_accordion}>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              sx={{ backgroundColor: 'transparent' }}
            >
              <AccordionSummary
                className={style.box_accordion}
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel1bh-content'
                id='panel1bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Organizador</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit vitae iste enim optio provident laborum
                  voluptates obcaecati laudantium. Libero rem consequuntur cupiditate delectus omnis soluta, natus
                  officiis voluptatibus architecto ipsam.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel2bh-content'
                id='panel2bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Organizador</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem voluptatibus asperiores tempora
                  omnis aperiam recusandae obcaecati molestias officia facilis, nam nostrum! Iste doloribus quas nostrum
                  placeat omnis odio atque.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel3bh-content'
                id='panel3bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Organizador</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, error! Nam, vitae et nobis vel nisi
                  exercitationem aperiam harum, quos culpa ad omnis odit, minima maxime nesciunt pariatur porro ipsa?
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel4bh-content'
                id='panel4bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Organizador</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil ipsum nam tempora excepturi
                  ab sapiente est in reprehenderit, nulla commodi voluptatem porro quasi. Et maiores accusantium sint
                  fugiat beatae?
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: '#585858',
                      fontSize: '30px',
                    }}
                  />
                }
                aria-controls='panel5bh-content'
                id='panel5bh-header'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 5px 1px #d6d6d6',
                  borderRadius: '5px',
                  margin: '10px 0 0 0',
                }}
              >
                <p className={style.text}>Aqui va una pregunta sobre el tema Organizador</p>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: '#d6d6d6' }}>
                <p className={style.detail}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque libero corporis, perferendis eaque ut
                  illum eveniet sit nemo in ratione sed reiciendis ullam minima dolor facilis rerum ab quae recusandae.
                </p>
              </AccordionDetails>
            </Accordion>
          </div>
}

|--------------------------------------------------
*/