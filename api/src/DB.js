//@ts-check
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()
const { MONGOOSE_URI, USERDB, PASSWORDDB } = process.env;


const uri = `mongodb+srv://${USERDB}:${PASSWORDDB}@cluster0.mi7yxnu.mongodb.net/?retryWrites=true&w=majority&dbname=plataforma_eventos`;

mongoose.connect(uri).catch((err) => {
  console.log("ERROR AL CONECTAR", err);
});

const db = mongoose.connection;

db.on("open", (_) => {
  console.log("conectado a ", uri);
});
db.on("error", (err) => {
  console.log("error en db", err);
});