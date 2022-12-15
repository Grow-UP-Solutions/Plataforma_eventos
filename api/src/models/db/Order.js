const { Schema, model, STATES } = require('mongoose');

const orderSchema = new Schema({
  idCompra: String,
  idOrganizer: String,
  idEvent: String,
  organizerName: String,
  organizerLastName: String,
  organizerisDeclarant: Boolean,
  idBuyer: String,
  buyerDni: String,
  buyerCity: String,
  buyerAddress: String,
  buyerPhone: String,
  buyerName: String,
  buyerLastName: String,
  eventName: String,
  eventDate: {
    type: Array,
    default: [],
  },
  dateBuy: String,
  timeBuy: String,
  adminEarns: String,
  comision: String,
  iva: String,
  organizerEarns: String,
});
module.exports = model('Orders', orderSchema);
