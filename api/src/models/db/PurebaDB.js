const { Schema, model } = require('mongoose');

const pruebaSchema = new Schema({
  validacion: String,
});

module.exports = model('Brueba', pruebaSchema);
