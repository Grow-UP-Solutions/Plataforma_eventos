const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: String,
  img: String,
  description: String,
  otros:
    {
     type: [String],
     img:{
      type:String,
      default: ''
     }
    }
  

},{ timestamps: true });

module.exports = model('Categories', CategorySchema);
