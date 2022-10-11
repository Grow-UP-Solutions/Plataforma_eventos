const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: String,
  img: String,
  description: String,
});

module.exports = model('Category', CategorySchema);
