const months = {
  Jan: 'Enero',
  Feb: 'Febrero',
  Mar: 'Marzo',
  Apr: 'Abril',
  May: 'Mayo',
  Jun: 'Junio',
  Jul: 'Julio',
  Aug: 'Agosto',
  Sep: 'Setiembre',
  Oct: 'Octubre',
  Nov: 'Noviembre',
  Dec: 'Diciembre',
};
/* 
const day = {
  Mon: 'Lunes',
  Tue: 'Martes',
  Wed: 'Miercoles',
  Thu: 'Jueves',
  Wed: 'Viernes',
  Sat: 'Sabado',
  Sun: 'Domingo',
};
 */
export const formatDate = (date) => {
  const aux = date.toString();
  let dateFormatted = aux.split(' ');
  dateFormatted = `${months[dateFormatted[1]]} ${dateFormatted[2]} de ${
    dateFormatted[3]
  }`;
  return dateFormatted;
};
