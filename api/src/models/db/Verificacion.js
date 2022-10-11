const { Schema, model } = require('mongoose');

const verificacionSchema = new Schema({
  validacion: String,
});

module.exports = model('Verificacion', verificacionSchema);
