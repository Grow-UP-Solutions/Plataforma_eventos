import axios from "axios";

const evente = [
  {
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",

    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    emailOganizer:'sssssssss@gmail.com',

    category: ["Mascotas"],
  },
  {
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
      emailOganizer:'sssssssss@gmail.com',
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
      emailOganizer:'sssssssss@gmail.com',
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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

    category: ["Deportes"],
  },
  {
    name: "Lets cook!",
    nick: "Bring your camera",
    emailOganizer:'sssssssss@gmail.com',
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer: "Jean Pierre",
    category: ["Comidas y Bebidas"],
  },
  {
    name: "French lessons",
    nick: "Bring your camera",
    emailOganizer:'sssssssss@gmail.com',
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
    organizer: "Jean Pierre",

    category: ["Mascotas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",

    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
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
    emailOganizer:'sssssssss@gmail.com',
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
    category: ["Deportes"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    date: ["Junio 1 / 2019"],
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "19.00",
        end: "18.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer: "Jean Pierre",
    category: ["Comidas y Bebidas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",

    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],

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
    organizer: "Jean Pierre",
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    category: ["Mascotas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    emailOganizer:'sssssssss@gmail.com',
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    category: ["Deportes"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer: "Jean Pierre",
    category: ["Comidas y Bebidas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer: "Jean Pierre",
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    category: ["Mascotas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Music",
    nick: "Bring your instruments!",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
    emailOganizer:'sssssssss@gmail.com',
    name: "Futbol",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",

    dates: [
      {
        date: "Enero 30 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "20.00",
        end: "22.00",
      },
      {
        date: "Enero 10 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    category: ["Deportes"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Lets cook!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 7 / 2022",
        start: "18.00",
        end: "22.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
    rating: 4,
    enLinea: false,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36xQkvQbbEOfWOf1eRKbWBoj2FP4q6STgd6V6nGuZUNoW39TodaYuxwdfP3vhQgu0gQU&usqp=CAU",
    ],
    participants: 22,
    organizer: "Jean Pierre",
    category: ["Comidas y Bebidas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
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
    state: "Antioquia",
    city: "Medellin",

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
    organizer: "Jean Pierre",
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,
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
    category: ["Mascotas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "22.00",
        end: "23.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "2.00",
        end: "4.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "1.00",
        end: "4.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 19 / 2022",
        start: "3.00",
        end: "5.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer: "Jean Pierre",
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "French lessons",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 9 / 2022",
        start: "22.00",
        end: "23.00",
      },
      {
        date: "Enero 25 / 2022",
        start: "2.00",
        end: "4.00",
      },
      {
        date: "Enero 29 / 2022",
        start: "1.00",
        end: "4.00",
      },
      {
        date: "Enero 18 / 2022",
        start: "12.00",
        end: "14.00",
      },
      {
        date: "Enero 15 / 2022",
        start: "3.00",
        end: "5.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

    rating: 4,
    enLinea: true,
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8QdIGwFsxfbhxscQnCK_4W79KT1nZfJf9RFb1Iks_3mlqGoSbz33BFunYbZ6PSw8XK0&usqp=CAU",
    ],
    participants: 12,
    organizer: "Jean Pierre",
    category: ["Idiomas"],
  },
  {
    emailOganizer:'sssssssss@gmail.com',
    name: "Hiking with my dog in the nature and make friends!!",
    nick: "Bring your camera",
    description:
      "Lorem ipsum dolor sit amet, consec Lorem ipsum dolor sit amet, consec consec Lorem",
    dates: [
      {
        date: "Enero 19 / 2022",
        start: "12.00",
        end: "14.00",
      },
    ],
    state: "Antioquia",
    city: "Medellin",
    cupos: 15,
    price: "$300.000",
    year: 2022,

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
    category: ["Mascotas"],
  },
];

function createEvents() {
  evente.forEach((e) => {
    axios.post("http://localhost:3001/events/create", e);
  });
  return "ok";
}

createEvents();
