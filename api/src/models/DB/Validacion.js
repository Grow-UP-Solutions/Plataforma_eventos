import { Schema, model } from 'mongoose';

const ValidacionSchema = new Schema({
  validacion: String,
});

export default model('Validacion', ValidacionSchema);
