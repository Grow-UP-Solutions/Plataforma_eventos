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
    text:
      'Con más de 15 años de experiencia en el rubro, nos especializamos en el diseño y ejecución de Exposiciones, Ferias, Congresos y Eventos Corporativos. Trabajamos en conjunto para generar acciones de marketing internas y externas; potenciando las marcas, generando vínculos y reforzando las relaciones internas. Estamos para ayudarte a conectar con tus actuales clientes, generar nuevos y atraer a los potenciales. Logrando una experiencia única, trabajando en equipo y en constante comunicación para definir los objetivos y tener una ruta clara y específica.',
  },
  {
    id: 2,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text:
      'Realizamos una propuesta totalmente personalizada y ajustada a cualquier presupuesto para que quienes estén interesados puedan contratar nuestros servicios. Seré tu socia, asesora y representante, negociando y/o intermediando con los proveedores para poder conseguir una disminución considerable en el presupuesto inicial. Imaginalo, contalo…. disfrutalo!.',
  },
  {
    id: 3,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text:
      'Somos la mejor garantía de éxito, sin nervios, sin preocupaciones, tanto si necesitas ayuda desde el principio de la organización o bien para el día del evento.  No importa si la reunión es pequeña o grande, tu evento merece ser cuidado de forma especial con detalles que hagan que sea único. Mi secreto: Distinción, ilusión, conocimiento con una pizca de elegancia y sutileza.',
  },
  {
    id: 4,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text:
      'En base a esto F&D realiza una propuesta completamente personalizada y ajustada a tu presupuesto. El mismo día del evento, estamos ahí ayudando a que todo salga perfecto. Para que vos disfrutes de este día a pleno, sin preocuparte por algún imprevisto. Seguro estaras encantado con nosotros y obtendras lo que venias a buscar.',
  },
  {
    id: 5,
    title: 'Aqui va una pregunta sobre el tema Usuario',
    text:
      'Tras un primer contacto telefónico o vía mail, concertamos una entrevista donde, nos expones tu idea, tus necesidades, que querés comunicar y presupuesto. Una vez aprobada la propuesta continuamos nuestro trabajo contactando a los proveedores seleccionados y cuidando hasta el último detalle que compone tu evento.',
  },
];

const apiFaqOrganizador = [
  {
    id: 1,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text:
      'El día miércoles 24 de agosto se realizó una charla sobre cómo se encuentra la Comunicación luego de la pandemia, las inclinaciones de las comunicaciones corporativas a la vida diaria y como llegar a su consumidor y los modos de relacionarse entre empresa, medios y clientes post covid. La expositora fue Vanesa Rivera, Directora General de Ver&Comunicar.',
  },
  {
    id: 2,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text:
      'Durante la pandemia y post pandemia lo que sucedió es que creció fuertemente todo lo que tiene que ver con el aspecto de las redes, se introdujo en nuestra vida. Hoy todo pasa por el celular, tiene un protagonismo muy grande dentro de una estrategia comunicacional”, dijo Rivera y continuó “hubo un quiebre en la humanidad durante la pandemia, a todos nos atravesó de alguna forma. Lo que si siempre después de una crisis hay oportunidades,  algunas empresas se vieron muy perjudicadas y otras crecieron.',
  },
  {
    id: 3,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text:
      'Luego la expositora expresó que es importante ver las diferencias entre las dos técnicas que siguen existiendo en el mercado y son las más fuertes, que son la prensa y la publicidad. “Hoy como estrategias de PR se incorporó estrategias de influencers, no existen dos estrategias sino que ambas forman una. Es importante decir que la estrategia digital creció un montón pero no es lo único”. También, Vanesa agregó “desde el lado comunicacional lo que empezamos a compartir con nuestros clientes es que si vamos a utilizar la red social dentro de una estrategia de comunicación, tiene que ser comunicada de una forma más cercana, amigable.',
  },
  {
    id: 4,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text:
      'Por otro lado, la especialista expresó “es importante decir que hoy más allá del contenido todo pasa por lo visual. Cuánto más impacto visual tiene, más impacto podemos tener con ese usuario o consumidor final. También lo impactante y lo fuerte dentro de una construcción de comunicación es el titular.',
  },
  {
    id: 5,
    title: 'Aqui va una pregunta sobre el tema Organizador',
    text:
      'Por último, Rivera concluyó “las marcas no tienen que ser un ícono, sino mostrarse cercanas y sinceras. Tienen que centrarse en lo que el producto o servicio puede hacer por los demás. Por eso dentro de las estrategias de comunicación las empresas empezaron a darle más preponderancia a destinar sus comunicados a responsabilidad social empresaria. Cuanto más sinceros y cercanos somos, está el éxito de una campaña de comunicación.',
  },
];

const Faq = () => {
  const [expanded, setExpanded] = useState(false);
  const [usuario, setUsuario] = useState(true);
  const [organizador, setOrganizador] = useState(false);
  const [newSearch, setNewSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickUsuario = (e) => {
    e.preventDefault();
    setUsuario(!usuario);
    setOrganizador(!organizador);
    if (usuario === true) {
      setUsuario(true);
      setOpen(false);
    }
    if (organizador === false) {
      setOrganizador(false);
      setOpen(false);
    }
  };

  const handleClickOrganizador = (e) => {
    e.preventDefault();
    setOrganizador(!organizador);
    setUsuario(!usuario);
    if (organizador === true) {
      setOrganizador(true);
      setOpen(false);
    }
    if (usuario === false) {
      setUsuario(false);
      setOpen(false);
    }
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setNewSearch(e.target.value);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    if (usuario) {
      const data = apiFaqUsuario.filter((e) => e.text.toLowerCase().includes(newSearch.toLowerCase()));
      setResultSearch(data);
      setOpen(true);
      setNewSearch('');
    } else {
      const data = apiFaqOrganizador.filter((e) => e.text.toLowerCase().includes(newSearch.toLowerCase()));
      setResultSearch(data);
      setOpen(true);
      setNewSearch('');
    }
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>!Hola¡ ¿Cómo te podemos ayudar?</h1>

        <div className={style.containerInputSearch}>
          <input
            type='text'
            placeholder='Escribe una palabra clave'
            className={style.input}
            onChange={handleChangeSearch}
            value={newSearch}
          />
          <button className={style.button} onClick={handleClickSearch}>
            <BsSearch className={style.loop} />
          </button>
        </div>
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

        {usuario && !open
          ? apiFaqUsuario.map((e) => (
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
          : organizador && !open
          ? apiFaqOrganizador.map((e) => (
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
          : (usuario && open) || (organizador && open)
          ? resultSearch.map((e) => (
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
          : ''}

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
