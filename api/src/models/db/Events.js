const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: String,
  nick: String,
  description: String,
  date: [
    {
      type: Date,
    },
  ],
  time: String,
  state: String,
  city: String,
  price: Number,
  cupos: Number,
  rating: Number,
  enLinea: Boolean,
  pictures: [String],
  participants: Number,
  organizer: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
    
  }],
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  opinions: [
    {
        type:Schema.Types.ObjectId,
        ref: 'Opinions'
    }
  ],
});

module.exports=model('Events', EventSchema)