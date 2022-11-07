const { Schema, model } = require("mongoose");
const Message = require("./Message");

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
   saldoPendiente: {
      type: Number,
      default: 0,
   },
   saldoTotal: {
      type: Number,
      default: 0,
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
      default: false,
   },
   isProfileCompleted: {
      type: Boolean,
      default: false,
   },

   userpicture: {
      type: String,
      default: "",
   },
   email: String,
   password: String,
   canReceiveInformation: {
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
      type: String,
      default: null,
   },
   isOrganizer: {
      type: Boolean,
      default: false,
   },
   referralCode: {
      type: String,
      default: "",
   },
   referrals: [
      {
         type: Schema.Types.ObjectId,
         ref: "Users",
      },
   ],
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
   myFavorites: [
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
   
},{ timestamps: true });

module.exports = model("Users", UserSchema);
