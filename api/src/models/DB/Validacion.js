const { Schema, model } = require('mongoose');

const ValidacionSchema = new Schema({
  validacion: String,
});

module.exports = model('Validacion', ValidacionSchema);
