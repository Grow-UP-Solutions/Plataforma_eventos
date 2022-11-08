const { Schema, model } = require('mongoose');

const verificacionSchema = new Schema({
  validacion: String,
},{ timestamps: true });

module.exports = model('Verificacion', verificacionSchema);
