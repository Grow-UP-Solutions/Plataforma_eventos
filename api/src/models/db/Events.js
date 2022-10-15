const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  title: String,
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  otherCategorie: [String],
  shortDescription: String,
  longDescription: String,
  pictures: [
    {
      picture: String,
      cover: Boolean,
    },
  ],
  online: String,
  link: String,
  departamento: String,
  municipio: String,
  direccion: String,
  barrio: String,

  specialRequires: String,

  dates: [
    {
      date: String,
      start: String,
      end: String,
      year: Number,
      cupos: String,
      price: String,
      sells: Number,
      isPublic: Boolean,
      precioAlPublico: String,
      gananciaCupo: String,
      gananciaEvento: String,
      date: String,
    },
  ],
  notificaciones: [
    {
      image: String,
      description: String,
      user: String,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  isPublic: {
    type: Boolean,
  },

  rating: {
    type: Number,
    default: 0,
  },

  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },

  opinions: [
    {
      title: {
        type: String
        
      },     
      time: {
        type: Date,
        default: Date.now(),
      },
      rating: Number,
      opinion: String,
      picture: {
        type: String,
        default: null,
      },
    }
    
  ]
},{ timestamps: true });

module.exports = model('Events', EventSchema);
