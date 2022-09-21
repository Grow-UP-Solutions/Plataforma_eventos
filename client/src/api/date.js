import axios from "axios";

const date = [
  {
    date: "Enero 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "Enero 10 / 2022",
    cupos: 20,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "febrero 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "marzo 30 / 2022",
    cupos: 25,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "Octubre 8 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Mayo 3 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Enero 8 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Enero 7 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Diciembre 24 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Darzo 29 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Enero 15 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Febrero 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Enero 25 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "Abril 10 / 2022",
    cupos: 20,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "Febrero 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "marzo 19 / 2022",
    cupos: 25,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
  },
  {
    date: "Mayo 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Junio 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Julio 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Agosto 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Septiembre 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Octubre 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Noviembre 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
  {
    date: "Diciembre 19 / 2022",
    cupos: 15,
    time: "12.00-14.00",
    price: "$300.000",
    year: 2022,
    
  },
];

function createDate() {
    date.forEach((e) => {
      axios.post('http://localhost:3001/date/create', e);
    });
    return 'ok';
  }

 
