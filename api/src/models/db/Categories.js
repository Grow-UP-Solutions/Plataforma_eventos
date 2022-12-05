const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: String,
    img: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = model('Categories', CategorySchema);
