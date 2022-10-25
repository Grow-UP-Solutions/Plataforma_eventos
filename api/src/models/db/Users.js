const { Schema, model } = require('mongoose');
const Message = require('./Message');

const UserSchema = new Schema({
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
  referenceU: String,
  referenceZ: String,
  isDeclarant: {
    type: Boolean,
    default: false,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
  userpicture: {
    type: String,
    default: null,
  },
  email: String,
  picture: String,
  password: String,
  canReceiveInformation: {
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
  isOrganizer: {
    type: Boolean,
    default: false,
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
      title: {
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
        default: null,
      },
      opinion: String,
    },
  ],
  notifications: [
    {
      msg: String,
      date: {
        type: Date,
        timestamps: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  message: [
    {
      type: Schema.Types.ObjectId,
      ref: Message,
    },
  ],
});

module.exports = model('Users', UserSchema);
