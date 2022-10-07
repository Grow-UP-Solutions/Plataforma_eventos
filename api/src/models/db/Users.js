import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  direction: String,
  phone: Number,
  documentNº: Number,
  city: String,
  frontDocument: String,
  backDocument: String,
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
      ref: "Events",
    },
  ],
  myFavourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  ],
  myEventsBooked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
  ],

  opinionsOrg: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      email: String,
      title: String,
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
  notifications: [
    {
      subject: String,
      msg: String,
      date: {
        type: Date,
        default: Date.now(),
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
  
});

export default model("Users", UserSchema);
