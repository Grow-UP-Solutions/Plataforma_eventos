const months = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Setiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
};

export const formatDate = (date) => {
  const { day, month, year } = date;
  const dateFormatted = `${day} ${months[month]} del ${year}`;
  return dateFormatted;
};
