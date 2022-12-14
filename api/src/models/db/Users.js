const { Schema, model } = require('mongoose');
const Message = require('./Message');

const UserSchema = new Schema(
  {
    idUser: String,
    idOrganizer: {
      type: String,
      default: '',
    },
    firstName: String,
    lastName: String,
    name: String,
    nickname: String,
    direction: String,
    phone: String,
    tel: String,
    document: String,
    city: String,
    frontDocument: String,
    backDocument: String,
    imageRent: String,
    registerProvider: String,
    membership: {
      type: String,
      default: '',
    },
    factura: [
      {
        evento: {
          type: String,
          default: '',
        },
        fechaDeFacturacion: {
          type: String,
          default: '',
        },
        numeroDeFactura: {
          type: String,
          default: '',
        },
        ganancia: {
          type: Number,
          default: 0,
        },
        isPay: {
          type: Boolean,
          default: false,
        },
      },
    ],
    bank: {
      type: Array,
      default: [],
    },
    availableCredit: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isDeclarant: {
      type: Boolean,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },

    userpicture: {
      type: String,
      default: '',
    },
    email: String,
    password: String,
    canReceivedInformation: {
      type: Boolean,
      default: true,
    },
    canNotificationMyEvents: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isProccessingToOrganizer: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    isReferral: {
      code: {
        type: String,
        default: undefined,
      },
      use: {
        type: Boolean,
        default: false,
      },
    },

    isOrganizer: {
      type: Boolean,
      default: false,
    },
    referralCode: {
      type: String,
      default: '',
    },
    referrals: {
      type: Array,
      default: [],
    },
    isLogged: {
      type: Boolean,
      default: false,
    },
    membership: String,
    descriptionOrganizer: String,
    myEventsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Events',
      },
    ],
    myFavorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Events',
      },
    ],
    myEventsBooked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Events',
      },
    ],

    opinionsOrg: [
      {
        idUser: {
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

        opinion: String,
      },
    ],
    notifications: [
      {
        msg: String,

        read: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    message: [
      {
        type: Schema.Types.ObjectId,
        ref: Message,
      },
    ],
    payedEarnings: {
      type: Number,
      default: 0,
    },
    pendingEarnings: {
      type: Number,
      default: 0,
    },
    overallEarnings: {
      type: Number,
      default: 0,
    },
    ordenes: [
      {
        thumbnail: {
          type: String,
          default: '',
        },
        motivo: {
          type: String,
          default: '',
        },
        codigoDeLaTransaccion: {
          type: String,
          default: '',
        },
        DestinoDePago: {
          type: String,
          default: '',
        },
        fechaDePago: {
          type: String,
          default: '',
        },
        valorDeLaTransaccion: {
          type: String,
          default: '',
        },
        costoDeLaTransaccion: {
          type: String,
          default: '',
        },
        referencia: {
          type: String,
          default: '',
        },
        estatus: {
          type: String,
          default: '',
        },
        cuposComprados: {
          type: Array,
          default: [],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Users', UserSchema);
