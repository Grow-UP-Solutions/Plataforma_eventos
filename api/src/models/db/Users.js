import { Schema, model } from 'mongoose';
import OpinionsEvent from './OpinionsEvent.js';
import OpinionsOrganizer from './OpinionsOrganizer.js';

const UserSchema = new Schema({
  name: String,
  direction: String,
  phone: Number,
  documentNº: Number,
  city: String,
  email: String,
  picture: String,
  password: String,
  canReceiveInformation: {
    type: Boolean,
    default: true,
  },
  code: String,
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
  myFavourites: [
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
  myOpinions: [
    {
      type: Schema.Types.ObjectId,
      ref: OpinionsEvent,
    },
  ],
  opinionsOrg: [
    {
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Users',
      // },
      email: String,
      time: {
        type: Date,
        default: Date.now(),
      },
      rating: {
        type: Number,
        default: 0,
      },
      opinion: String,
      organizer: String,
    },
  ],
});

export default model('Users', UserSchema);
