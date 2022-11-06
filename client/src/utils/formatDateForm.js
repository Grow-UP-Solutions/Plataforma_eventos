/* const months = {
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
}; */

export const formatDateForm = (date) => {
  const year = date.slice(0, 4) + '';
  const day = date.slice(8, 10) + '';
  const _month_ = date.slice(5, 7);
  let _mes_ = '';

  if (_month_ === '1') {
    _mes_ = 'Enero ';
  } else if (_month_ === '02') {
    _mes_ = 'Febrero';
  } else if (_month_ === '03') {
    _mes_ = 'Marzo';
  } else if (_month_ === '04') {
    _mes_ = 'Abril';
  } else if (_month_ === '05') {
    _mes_ = 'Mayo';
  } else if (_month_ === '06') {
    _mes_ = 'Junio';
  } else if (_month_ === '07') {
    _mes_ = 'Julio';
  } else if (_month_ === '08') {
    _mes_ = 'Agosto';
  } else if (_month_ === '09') {
    _mes_ = 'Septiembre';
  } else if (_month_ === '10') {
    _mes_ = 'Octubre';
  } else if (_month_ === '11') {
    _mes_ = 'Noviembre';
  } else if (_month_ === '12') {
    _mes_ = 'Diciembre';
  }

  const fechaFormateada = _mes_ + ' ' + day + ' ' + 'de' + ' ' + year;

  return fechaFormateada;
};
