import { Schema, model } from 'mongoose';

const VerificarSchema = new Schema({
  mensaje: String,
});

export default model('Verificar', VerificarSchema);
