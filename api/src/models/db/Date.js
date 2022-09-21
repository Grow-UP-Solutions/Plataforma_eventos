const {Schema ,model}= require('mongoose')


const dateSchema= new Schema({
    date: String,
    cupos: Number,
    time: String,
    price: String,
    year: Number,
  })

  module.exports= model('Date', dateSchema)