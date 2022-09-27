import {Schema,model}from 'mongoose'


const cuponSchema= new Schema({
    cupon: String,
    limit: Number,
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Events'
    }
})

export default model('Cupon', cuponSchema)