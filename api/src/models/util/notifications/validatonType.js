const { EVENT, UPDATE_EVENT, FAVORITOS, BANK, CANCEL_EVENT, SUCCESS_BUY } = require('./notifications.types');

module.exports = function validationType(type, title, userName, totalCupos, fecha) {
  if (type === EVENT) {
    return `Tu evento ${title} ha sido públicado.`;
  }
  if (type === UPDATE_EVENT) {
    return 'Un evento a sido modificado.';
  }
  if (type === FAVORITOS) {
    return `El evento ${title} a sido agregado a tu lista de eventos fávoritos.`;
  }
  if (type === BANK) {
    return 'Tus detalles bancarios han cambiado.';
  }
  if (type === CANCEL_EVENT) {
    return `El evento ${title} de ${fecha} ha sido cancelado.`;
  }
  if (type === SUCCESS_BUY) {
    return `${userName} ha comprado ${totalCupos} cupo(s) para el evento ${title}.`;
  }
};
