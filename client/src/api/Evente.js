import axios from "axios";

const evente = [
  {
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],

    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer: "Jean Pierre",

    category:[ "Mascotas"],
    
  },
  {
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Junio 7 / 2023",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
    ],

    rating: 5,
    enLinea: false,
    pictures: [
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
    ],
    participants: 48,
    organizer: "Jean Pierre",     
    category: ["Artes"],
      
  },
  {
    
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        id: "1",
        date: "Enero 30 / 2022",
        cupos: 6,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2022,
      },
      {
        id: "2",
        date: "Enero 19 / 2023",
        cupos: 14,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
      {
        id: "3",
        date: "Junio 30 / 2023",
        cupos: 3,
        time: "20.00-22.00",
        price: "$800.000",
        year: 2023,
      },
    ],

    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
    ],
    participants: 34,
    organizer: "Jean Pierre",

    category:["Deportes"],
     
    
  },
  {
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 13,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 30 / 2019",
        cupos: 25,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2019,
      },
    ],

    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer: "Jean Pierre",
    category:["Comidas y Bebidas" ]
  
  },
  {
    
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 1,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
    time: "13:00 - 16:00",
    state: "Antioquia",
    city: "Medellin",
    price: "150.000",
    cupos: 10,
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 11,
    organizer: "Jean Pierre", 
    category:["Idiomas"]
  },
  {
    
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],
    time: "20:00 - 22:00",
    state: "Antioquia",
    city: "Medellin",
    price: "$250.000",
    cupos: 10,
    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer:"Jean Pierre" ,
    
    category:["Mascotas"] 
  },
  {
    
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Junio 7 / 2023",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
    ],
    
    rating: 5,
    enLinea: false,
    pictures: [
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
    ],
    participants: 48,
    organizer:"Jean Pierre", 
    category:["Artes"],
  },
  {
    
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        id: "1",
        date: "Enero 30 / 2022",
        cupos: 6,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2022,
      },
      {
        id: "2",
        date: "Enero 19 / 2023",
        cupos: 14,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
      {
        id: "3",
        date: "Junio 30 / 2023",
        cupos: 3,
        time: "20.00-22.00",
        price: "$800.000",
        year: 2023,
      },
    ],
   
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
    ],
    participants: 34,
    organizer:"Jean Pierre" ,
    category:["Deportes"]
     
  },
  {
    
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 13,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 30 / 2019",
        cupos: 25,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2019,
      },
    ],
    
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer:"Jean Pierre",
    category:["Comidas y Bebidas"],
  },
  {
    
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
    time: "13:00 - 16:00",
    state: "Antioquia",
    city: "Medellin",
    price: "150.000",
    cupos: 10,
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer:"Jean Pierre",
    category:["Idiomas"], 
  },
  {
    
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],
    
    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer:"Jean Pierre",
    category:["Mascotas"],
  },
  {
    
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Junio 7 / 2023",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
    ],
  
    rating: 5,
    enLinea: false,
    pictures: [
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
    ],
    participants: 48,
    organizer:"Jean Pierre", 
    category:["Artes"], 
  },
  {
    
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        id: "1",
        date: "Enero 30 / 2022",
        cupos: 6,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2022,
      },
      {
        id: "2",
        date: "Enero 19 / 2023",
        cupos: 14,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
      {
        id: "3",
        date: "Junio 30 / 2023",
        cupos: 3,
        time: "20.00-22.00",
        price: "$800.000",
        year: 2023,
      },
    ],
  
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
    ],
    participants: 34,
    organizer:"Jean Pierre", 
    category:["Deportes"],
  },
  {
    
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 13,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 30 / 2019",
        cupos: 25,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2019,
      },
    ],  
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer:"Jean Pierre", 
    category:["Comidas y Bebidas"], 
  },
  {
   
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
    
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer:"Jean Pierre", 
    category:["Idiomas"], 
  },
  {
    
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],
   
    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer:"Jean Pierre",
    category:["Mascotas"], 
  },
  {
    
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Junio 7 / 2023",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    price: "$300.000",
    cupos: 30,
    rating: 5,
    enLinea: false,
    pictures: [
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
      "https://learnenglishfunway.com/wp-content/uploads/2020/12/Music-2.jpg",
    ],
    participants: 48,
    organizer:"Jean Pierre", 
    category:["Artes"],
  },
  {
   
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        id: "1",
        date: "Enero 30 / 2022",
        cupos: 6,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2022,
      },
      {
        id: "2",
        date: "Enero 19 / 2023",
        cupos: 14,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2023,
      },
      {
        id: "3",
        date: "Junio 30 / 2023",
        cupos: 3,
        time: "20.00-22.00",
        price: "$800.000",
        year: 2023,
      },
    ],
    
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllO9WJMqhNIow2YLouFkjClr_cvteJ1DGTg&usqp=CAU",
    ],
    participants: 34,
    organizer:"Jean Pierre", 
    category:["Deportes"], 
  },
  {
  
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 13,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 30 / 2019",
        cupos: 25,
        time: "20.00-22.00",
        price: "$150.000",
        year: 2019,
      },
    ],
    
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer:"Jean Pierre",
    category:["Comidas y Bebidas"], 
  },
  {
   
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
   
    cupos: 10,
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer:"Jean Pierre",
    category:["Idiomas"], 
  },
  {
    
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],
    time: "20:00 - 22:00",
    state: "Antioquia",
    city: "Medellin",
    price: "$250.000",
    cupos: 10,
    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer:"Jean Pierre", 
    category:["Mascotas"], 
  },
  {
   
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
    
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer:"Jean Pierre",
    category:["Idiomas"],
  },
  {
    
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
      {
        date: "Enero 19 / 2019",
        cupos: 10,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2019,
      },
    ],
    
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer:"Jean Pierre",
    category: ["Idiomas"],
  },
  {
    
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        cupos: 15,
        time: "12.00-14.00",
        price: "$300.000",
        year: 2022,
      },
    ],
    
    rating: 4.5,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LJVx4Si1ZAl45KUHRGvJyaQh2weSey-KA7Q7aOV09ySDIm-7TiiXkKLRs-7pwSCvpiM&usqp=CAU",
    ],
    participants: 33,
    organizer: "Jean Pierre",
    category:["Mascotas"],
  },
];

function createEvents() {
  evente.forEach((e) => {
    axios.post("http://localhost:3001/events/create", e);
  });
  return "ok";
}

createEvents();
