import axios from "axios";

const evente = [
  {
    title: 'Red Bull Batalla',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Red Bull Batalla la competencia de freestyle más importante de habla hispana tiene todo listo para su gran definición colombiana: la final, que volverá a contar con la presencia de público.',
    longDescription: 'Quien gane la final colombiana de Red Bull Batalla logrará el pase a la definición internacional, que se hará en México.',
    pictures: [
      {
        cover: true,
        picture: 'https://img.redbull.com/images/c_crop,w_1080,h_540,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/7/15/gnvwonhmjf09afbablaz/red-bull-batalla-kv-2021',
      },
    ],
    online: false,
    link: 'https://www.movistararena.com.ar/show/red-bull-batalla/',
    departamento: 'Bolivar',
    municipio: 'Cartagena de Indias',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '15/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '16/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Tango Fin del Mundo',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Exclusive holiday package combining Buenos Aires and Ushuaia! 9 Days in vibrant Buenos Aires learning with the best maestros and assisted by professional dancers during the classes.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0arVTbAN2HgVA1jfEswArZZcMhyr4aoeAK0tkYY6zYkSk55vv_ihaADbtKz08DBcfnY&usqp=CAU',
      },
    ],
    online: false,
    link: 'https://allevents.in/vicente%20l%C3%B3pez/tango-fin-del-mundo/200022910653000',
    departamento: 'Caldas',
    municipio: 'Manisales',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '25/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: '65º Feria de Cali',
    categories: ['Al Aire Libre'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Este año será la 65ª edición de la Feria de Cali, considerada como la fiesta más importante de fin de año en Colombia y uno de los mejores festivales musicales del continente americano.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Buenos_Aires_-_Avenida_de_Mayo_-_Carnaval_2019.jpg',
      },
    ],
    online: false,
    link: 'https://www.wetravel.com/trips/65-feria-de-cali-65th-cali-fair-descubre-colombia-cali-97871485',
    departamento: 'Boyacà',
    municipio: 'Tunja',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '22/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Flamengo vs Atlético Paranaense',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg',
      },
    ],
    online: false,
    link: '',
    departamento: 'Caqueta',
    municipio: 'Florencia',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '2/11/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4c',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Gamer PlayStation',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Torneo de playStation, donde el campeon actual defiende su titulo y bvuscara coronarse nuevamente. Torneo online desde cualquier parte del mundo podes jugar.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://culturageek.com.ar/wp-content/uploads/2022/08/Playstation-Torneo-Mexico-Portada.jpg',
      },
    ],
    online: true,
    link: '',
    departamento: '',
    municipio: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/11/2022',
        start: '16:00',
        end: '20:00'
      },
      
    ],
    idOrganizer: '632da0fe5dc24cb5d13d6c7a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Red Bull Batalla',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Red Bull Batalla la competencia de freestyle más importante de habla hispana tiene todo listo para su gran definición colombiana: la final, que volverá a contar con la presencia de público.',
    longDescription: 'Quien gane la final colombiana de Red Bull Batalla logrará el pase a la definición internacional, que se hará en México.',
    pictures: [
      {
        cover: true,
        picture: 'https://img.redbull.com/images/c_crop,w_1080,h_540,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/7/15/gnvwonhmjf09afbablaz/red-bull-batalla-kv-2021',
      },
    ],
    online: false,
    link: 'https://www.movistararena.com.ar/show/red-bull-batalla/',
    departamento: 'Bolivar',
    municipio: 'Cartagena de Indias',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '15/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '16/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Tango Fin del Mundo',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Exclusive holiday package combining Buenos Aires and Ushuaia! 9 Days in vibrant Buenos Aires learning with the best maestros and assisted by professional dancers during the classes.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0arVTbAN2HgVA1jfEswArZZcMhyr4aoeAK0tkYY6zYkSk55vv_ihaADbtKz08DBcfnY&usqp=CAU',
      },
    ],
    online: false,
    link: 'https://allevents.in/vicente%20l%C3%B3pez/tango-fin-del-mundo/200022910653000',
    departamento: 'Caldas',
    municipio: 'Manisales',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '25/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: '65º Feria de Cali',
    categories: ['Al Aire Libre'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Este año será la 65ª edición de la Feria de Cali, considerada como la fiesta más importante de fin de año en Colombia y uno de los mejores festivales musicales del continente americano.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Buenos_Aires_-_Avenida_de_Mayo_-_Carnaval_2019.jpg',
      },
    ],
    online: false,
    link: 'https://www.wetravel.com/trips/65-feria-de-cali-65th-cali-fair-descubre-colombia-cali-97871485',
    departamento: 'Boyacà',
    municipio: 'Tunja',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '22/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Flamengo vs Atlético Paranaense',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg',
      },
    ],
    online: false,
    link: '',
    departamento: 'Caqueta',
    municipio: 'Florencia',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '2/11/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4c',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Gamer PlayStation',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Torneo de playStation, donde el campeon actual defiende su titulo y bvuscara coronarse nuevamente. Torneo online desde cualquier parte del mundo podes jugar.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://culturageek.com.ar/wp-content/uploads/2022/08/Playstation-Torneo-Mexico-Portada.jpg',
      },
    ],
    online: true,
    link: '',
    departamento: '',
    municipio: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/11/2022',
        start: '16:00',
        end: '20:00'
      },
      
    ],
    idOrganizer: '632da0fe5dc24cb5d13d6c7a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Red Bull Batalla',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Red Bull Batalla la competencia de freestyle más importante de habla hispana tiene todo listo para su gran definición colombiana: la final, que volverá a contar con la presencia de público.',
    longDescription: 'Quien gane la final colombiana de Red Bull Batalla logrará el pase a la definición internacional, que se hará en México.',
    pictures: [
      {
        cover: true,
        picture: 'https://img.redbull.com/images/c_crop,w_1080,h_540,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/7/15/gnvwonhmjf09afbablaz/red-bull-batalla-kv-2021',
      },
    ],
    online: false,
    link: 'https://www.movistararena.com.ar/show/red-bull-batalla/',
    departamento: 'Bolivar',
    municipio: 'Cartagena de Indias',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '15/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '16/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Tango Fin del Mundo',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Exclusive holiday package combining Buenos Aires and Ushuaia! 9 Days in vibrant Buenos Aires learning with the best maestros and assisted by professional dancers during the classes.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0arVTbAN2HgVA1jfEswArZZcMhyr4aoeAK0tkYY6zYkSk55vv_ihaADbtKz08DBcfnY&usqp=CAU',
      },
    ],
    online: false,
    link: 'https://allevents.in/vicente%20l%C3%B3pez/tango-fin-del-mundo/200022910653000',
    departamento: 'Caldas',
    municipio: 'Manisales',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '25/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: '65º Feria de Cali',
    categories: ['Al Aire Libre'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Este año será la 65ª edición de la Feria de Cali, considerada como la fiesta más importante de fin de año en Colombia y uno de los mejores festivales musicales del continente americano.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Buenos_Aires_-_Avenida_de_Mayo_-_Carnaval_2019.jpg',
      },
    ],
    online: false,
    link: 'https://www.wetravel.com/trips/65-feria-de-cali-65th-cali-fair-descubre-colombia-cali-97871485',
    departamento: 'Boyacà',
    municipio: 'Tunja',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '22/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Flamengo vs Atlético Paranaense',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg',
      },
    ],
    online: false,
    link: '',
    departamento: 'Caqueta',
    municipio: 'Florencia',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '2/11/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4c',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Gamer PlayStation',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Torneo de playStation, donde el campeon actual defiende su titulo y bvuscara coronarse nuevamente. Torneo online desde cualquier parte del mundo podes jugar.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://culturageek.com.ar/wp-content/uploads/2022/08/Playstation-Torneo-Mexico-Portada.jpg',
      },
    ],
    online: true,
    link: '',
    departamento: '',
    municipio: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/11/2022',
        start: '16:00',
        end: '20:00'
      },
      
    ],
    idOrganizer: '632da0fe5dc24cb5d13d6c7a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Red Bull Batalla',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Red Bull Batalla la competencia de freestyle más importante de habla hispana tiene todo listo para su gran definición colombiana: la final, que volverá a contar con la presencia de público.',
    longDescription: 'Quien gane la final colombiana de Red Bull Batalla logrará el pase a la definición internacional, que se hará en México.',
    pictures: [
      {
        cover: true,
        picture: 'https://img.redbull.com/images/c_crop,w_1080,h_540,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/7/15/gnvwonhmjf09afbablaz/red-bull-batalla-kv-2021',
      },
    ],
    online: false,
    link: 'https://www.movistararena.com.ar/show/red-bull-batalla/',
    departamento: 'Bolivar',
    municipio: 'Cartagena de Indias',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '15/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '16/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Tango Fin del Mundo',
    categories: ['Arte'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Exclusive holiday package combining Buenos Aires and Ushuaia! 9 Days in vibrant Buenos Aires learning with the best maestros and assisted by professional dancers during the classes.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0arVTbAN2HgVA1jfEswArZZcMhyr4aoeAK0tkYY6zYkSk55vv_ihaADbtKz08DBcfnY&usqp=CAU',
      },
    ],
    online: false,
    link: 'https://allevents.in/vicente%20l%C3%B3pez/tango-fin-del-mundo/200022910653000',
    departamento: 'Caldas',
    municipio: 'Manisales',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '25/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af48',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: '65º Feria de Cali',
    categories: ['Al Aire Libre'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Este año será la 65ª edición de la Feria de Cali, considerada como la fiesta más importante de fin de año en Colombia y uno de los mejores festivales musicales del continente americano.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Buenos_Aires_-_Avenida_de_Mayo_-_Carnaval_2019.jpg',
      },
    ],
    online: false,
    link: 'https://www.wetravel.com/trips/65-feria-de-cali-65th-cali-fair-descubre-colombia-cali-97871485',
    departamento: 'Boyacà',
    municipio: 'Tunja',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '22/10/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Flamengo vs Atlético Paranaense',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg',
      },
    ],
    online: false,
    link: '',
    departamento: 'Caqueta',
    municipio: 'Florencia',
    direccion: 'Calle Uno 123',
    barrio: 'Esperanza',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/10/2022',
        start: '15:00',
        end: '20:00'
      },
      {
        date: '2/11/2022',
        start: '15:00',
        end: '20:00'
      },
    ],
    idOrganizer: '632cbed4f208f44f5333af4c',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
  {
    title: 'Gamer PlayStation',
    categories: ['Deportes'],  /*(maximo 3)*/
    otherCategorie: ['Other'],
    shortDescription: 'Torneo de playStation, donde el campeon actual defiende su titulo y bvuscara coronarse nuevamente. Torneo online desde cualquier parte del mundo podes jugar.',
    longDescription: '',
    pictures: [
      {
        cover: true,
        picture: 'https://culturageek.com.ar/wp-content/uploads/2022/08/Playstation-Torneo-Mexico-Portada.jpg',
      },
    ],
    online: true,
    link: '',
    departamento: '',
    municipio: '',
    direccion: '',
    barrio: '',
    specialRequires: '',
    cupos: 50,
    price: 1000,
    dates: [
      {
        date: '30/11/2022',
        start: '16:00',
        end: '20:00'
      },
      
    ],
    idOrganizer: '632da0fe5dc24cb5d13d6c7a',
    isPublic: true,
    rating: 1,
    opinions: [],
    solds: 10,
    participants: 10,   
  },
];

function createEvents() {
  evente.forEach((e) => {
    axios.post("http://localhost:3001/events/create", e);
  });
  return "ok";
}

createEvents();
