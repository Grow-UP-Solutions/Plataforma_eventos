import {Schema,model}from 'mongoose'
import Events from './Events.js'

const cuponSchema= new Schema({
    cupon: String,
    limit: Number,
    event:{
        type: Schema.Types.ObjectId,
        ref: Events
    }
})

export default model('cupon', cuponSchema)