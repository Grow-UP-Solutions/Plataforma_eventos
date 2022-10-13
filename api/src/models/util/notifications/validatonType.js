const { EVENT, UPDATE_EVENT, FAVORITOS } = require("./notifications.types");

module.exports = function validationType(type) {
  if (type === EVENT) {
    return "Acabas de organizar un vento";
  }
  if (type === UPDATE_EVENT) {
    return "Un evento a sido modificado";
  }
  if (type === FAVORITOS) {
    return "el evento a sido agregado a tu lista de eventos pendientes";
  }
};
