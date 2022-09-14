const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  name: String,
  direction: String,
  phone: Number,
  documentNº: Number,
  city: String,
  email: String,
  picture: String,
  isSuperAdmin:{
    type: Boolean,
    default:false
  },
  isAdmin:{
    type: Boolean,
    default:false
  },
  isOrganizer: {
    type: Boolean,
    default:false
  },
  isLogged: {
    type: Boolean,
    default:false
  },
  membership: String,
  descriptionOrganizer: String,
  myEventsCreated: [{
    type: Schema.Types.ObjectId,
    ref:'Events'
  }],
  myOpinions:[{
    type: Schema.Types.ObjectId,
    ref:'Opinions'
  }]
});

module.exports= model('Users', UserSchema)
