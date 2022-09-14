const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
  img: String,
  description: String,
});

module.exports = model("Category", CategorySchema);

// {
//     name: 'Artes',
//     img:
//       'https://img.freepik.com/fotos-premium/pincel-manchado-pintura_23-2148002444.jpg?w=2000',
//     description: 'Duis autem vel eum iriure',
//   }
