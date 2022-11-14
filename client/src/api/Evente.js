import axios from "axios";

const evente = [
   {
      title: "Red Bull Batalla",
      categories: ["Artes"] /*(maximo 3)*/,
      otherCategorie: ["Other"],
      shortDescription:
         "Red Bull Batalla la competencia de freestyle más importante de habla hispana tiene todo listo para su gran definición colombiana: la final, que volverá a contar con la presencia de público.",
      longDescription:
         "Quien gane la final colombiana de Red Bull Batalla logrará el pase a la definición internacional, que se hará en México.",
      pictures: [
         {
            cover: true,
            picture:
               "https://img.redbull.com/images/c_crop,w_1080,h_540,x_0,y_0,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/7/15/gnvwonhmjf09afbablaz/red-bull-batalla-kv-2021",
         },
      ],
      online: false,
      link: "",
      departamento: "Bolivar",
      municipio: "Cartagena de Indias",
      direccion: "Calle Uno 123",
      barrio: "Esperanza",
      specialRequires: "",
      generalBuyers:[],
      overallEarnings:[],
      dates: [
         {
            date: "2022-12-15",
            start: "10:00",
            end: "11:00",
            year: 0,
            cupos: 32,
            price: 8000,
            sells: 12,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 15 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2022-12-17",
            start: "12:00",
            end: "13:00",
            year: 0,
            cupos: 32,
            price: 8000,
            sells: 12,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 17 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2022-12-18",
            start: "15:00",
            end: "16:00",
            year: 0,
            cupos: 32,
            price: 8000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 18 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2022-12-19",
            start: "18:00",
            end: "29:00",
            year: 0,
            cupos: 32,
            price: 9000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 19 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
      ],
      inRevision:false,
      idOrganizer: "6356d50112a8fda25313907a",
      isPublic: true,
      rating: 1,
      opinions: [],
      solds: 10,
      participants: 10,
   },
   {
      title: "Tango Fin del Mundo",
      categories: ["Artes"] /*(maximo 3)*/,
      otherCategorie: ["Other"],
      shortDescription:
         "Exclusive holiday package combining Buenos Aires and Ushuaia! 9 Days in vibrant Buenos Aires learning with the best maestros and assisted by professional dancers during the classes.",
      longDescription: "",
      pictures: [
         {
            cover: true,
            picture:
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0arVTbAN2HgVA1jfEswArZZcMhyr4aoeAK0tkYY6zYkSk55vv_ihaADbtKz08DBcfnY&usqp=CAU",
         },
      ],
      online: false,
      link:
         "https://allevents.in/vicente%20l%C3%B3pez/tango-fin-del-mundo/200022910653000",
      departamento: "Caldas",
      municipio: "Manisales",
      direccion: "Calle Uno 123",
      barrio: "Esperanza",
      specialRequires: "",
      cupos: 50,
      price: 1000,
      generalBuyers:[],
      overallEarnings:[],
      dates: [
         {
            date: "2022-12-15",
            start: "10:00",
            end: "11:00",
            year: 0,
            cupos: 32,
            price: 10000,
            sells: 12,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 15 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2022-12-19",
            start: "15:00",
            end: "17:00",
            year: 0,
            cupos: 10,
            price: 10000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 19 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
      ],
      idOrganizer: "6356d50412a8fda253139080",
      isPublic: true,
      rating: 1,
      opinions: [],
      solds: 10,
      participants: 10,
      inRevision:false
   },
   {
      title: "65º Feria de Cali",
      categories: ["Al Aire Libre"] /*(maximo 3)*/,
      otherCategorie: ["Other"],
      shortDescription:
         "Este año será la 65ª edición de la Feria de Cali, considerada como la fiesta más importante de fin de año en Colombia y uno de los mejores festivales musicales del continente americano.",
      longDescription: "",
      pictures: [
         {
            cover: true,
            picture:
               "https://upload.wikimedia.org/wikipedia/commons/f/fd/Buenos_Aires_-_Avenida_de_Mayo_-_Carnaval_2019.jpg",
         },
      ],
      online: false,
      link:
         "https://www.wetravel.com/trips/65-feria-de-cali-65th-cali-fair-descubre-colombia-cali-97871485",
      departamento: "Boyacà",
      municipio: "Tunja",
      direccion: "Calle Uno 123",
      barrio: "Esperanza",
      specialRequires: "",
      cupos: 50,
      price: 1000,
      generalBuyers:[],
      overallEarnings:[],
      dates: [
         {
            date: "2022-12-23",
            start: "10:00",
            end: "16:00",
            year: 0,
            cupos: 23,
            price: 10000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 23 de 2022",
            inRevision:false,
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
      ],
      idOrganizer: "6356e05c12a8fda253139150",
      isPublic: true,
      rating: 1,
      opinions: [],
      solds: 10,
      participants: 10,
      inRevision:false
   },
   {
      title: "Flamengo vs Atlético Paranaense",
      categories: ["Deportes"] /*(maximo 3)*/,
      otherCategorie: ["Other"],
      shortDescription:
         "Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.",
      longDescription: "",
      pictures: [
         {
            cover: true,
            picture:
               "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
         },
      ],
      online: false,
      link: "",
      departamento: "Caqueta",
      municipio: "Florencia",
      direccion: "Calle Uno 123",
      barrio: "Esperanza",
      specialRequires: "",
      cupos: 50,
      price: 1000,
      generalBuyers:[],
      overallEarnings:[],
      dates: [
         {
            date: "2022-11-30",
            start: "10:00",
            end: "11:00",
            year: 0,
            cupos: 0,
            price: 10000,
            sells: 12,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Noviembre 30 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2023-01-01",
            start: "15:00",
            end: "17:00",
            year: 0,
            cupos: 10,
            price: 10000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Enero 01 de 2023",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
      ],
      idOrganizer: "6356e28812a8fda25313917c",
      isPublic: true,
      rating: 1,
      opinions: [],
      solds: 10,
      participants: 10,
      inRevision:false
   },
   {
      title: "Buceo",
      categories: ["Deportes"] /*(maximo 3)*/,
      otherCategorie: ["Other"],
      shortDescription:
         "Entre mañana, el miércoles y el jueves se jugarán los 16 partidos correspondientes a la segunda fecha de la zona de grupos.",
      longDescription: "",
      pictures: [
         {
            cover: true,
            picture:
               "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
         },
      ],
      online: false,
      link: "",
      departamento: "Caqueta",
      municipio: "Florencia",
      direccion: "Calle Uno 123",
      barrio: "Esperanza",
      specialRequires: "",
      cupos: 50,
      price: 1000,
      generalBuyers:[],
      overallEarnings:[],
      dates: [
         {
            date: "2022-07-01",
            start: "10:00",
            end: "11:00",
            year: 0,
            cupos: 0,
            price: 10000,
            sells: 12,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Julio 01 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2022-12-12",
            start: "15:00",
            end: "17:00",
            year: 0,
            cupos: 10,
            price: 10000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Diciembre 12 de 2022",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         },
         {
            date: "2023-01-01",
            start: "15:00",
            end: "17:00",
            year: 0,
            cupos: 10,
            price: 10000,
            sells: 0,
            isPublic: true,
            precioAlPublico: "",
            gananciaCupo: "",
            gananciaEvento: "",
            dateFormated: "Enero 01 de 2023",
            inRevision:false,
            buyers:[],
            profits:[],
            codigos:[
               {
               codigo:'',
               descuento:0,
               cantidad:0,
               cod:false,
               show: true,
               ed:false,
               uses:0
               }
            ]
         }
      ],
      idOrganizer: "635ad7b8e035cbb513c859df",
      isPublic: true,
      rating: 1,
      opinions: [],
      solds: 10,
      participants: 10,
      inRevision:false
   },
 
];

function createEvents() {
   evente.forEach((e) => {
      axios.post("http://localhost:3001/events/create", e);
   });
   return "ok";
}

createEvents();
