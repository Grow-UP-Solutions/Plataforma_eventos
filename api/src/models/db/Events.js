const { Schema, model } = require('mongoose');
const EventSchema = new Schema(
  {
    title: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
      },
    ],
    idEvent: String,
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
    sells: {
      type: Number,
      default: 0,
    },
    specialRequires: String,

    dates: [
      {
        idDate: String,
        date: String,
        start: String,
        end: String,
        year: Number,
        cupos: Number,
        price: Number,
        sells: Number,
        isPublic: Boolean,
        precioAlPublico: Number,
        gananciaCupo: Number,
        gananciaEvento: Number,

        inRevision: {
          type: Boolean,
          default: false,
        },

        isOld: {
          type: Boolean,
        },

        sendEmail: {
          type: Boolean,
          default: false,
        },


        dateFormated: String,
        buyers: {
          type: Array,
          default: [],
        },
        pendingEarnings: {
          type: Number,
          default: 0,
        },
        payedEarnings: {
          type: Number,
          default: 0,
        },
        overallEarnings: {
          type: Number,
          default: 0,
        },
        codigos: [
          {
            codigo: { type: String, default: '' },
            descuento: { type: Number, default: 0 },
            cantidad: { type: Number, default: 0 },
            cod: { type: Boolean, default: false },
            show: { type: Boolean, default: true },
            ed: { type: Boolean, default: false },
            uses: { type: Number, default: 0 },
          },
        ],
        isPay: {
          type: Boolean,
          default: false,
        },
        datePay: {
          type: String,
          default: '',
        },
        billNumber: {
          type: String,
          default: '',
        },
      },
    ],
    generalBuyers: {
      type: Array,
      default: [],
    },
    
    overallEarnings: {
      type: Number,
      default: 0,
    },
    pendingEarnings: {
      type: Number,
      default: 0,
    },
    payedEarnings: {
      type: Number,
      default: 0,
    },
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

    isOld: {
      type: Boolean,
    },

    inRevision: {
      type: Boolean,
      default: false,
    },

    sendEmail: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },

    dateDelete: {
      type: Array,
      default: [],
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
    
    

    opinions: [
      {
        idUser:{
          type: String,
        },

        title: {
          type: String,
        },

        dateEvent: {
          type: String,
        },

        eventTitle: {
          type: String,
        },

        time: {
          type: Date,
          default: Date.now(),
        },

        rating: {
          type: Number,
        },

        picture: {
          type: String,
        },
        
        opinion: {
          type: String,
        },
      },
    ],

    // opinions: [
    //   {
    //     title: {
    //       type: String,
    //     },
    //     time: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //     rating: Number,
    //     opinion: String,
    //     picture: {
    //       type: String,
    //       default: null,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = model('Events', EventSchema);
