const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  status: {
    type: String,
  },
  usuario: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  fecha: {
    type: Date,
  },
  produt: [
    {
      type: String,
    },
  ],
  total: {
    type: Number,
  },

  payment_id: {
    type: String,
  },
  status_order: {
    type: String,
    default: '',
  },
  libros: {
    type: [],
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  libros:{
    type:[]
  }
})
module.exports = model('Orders', orderSchema)
