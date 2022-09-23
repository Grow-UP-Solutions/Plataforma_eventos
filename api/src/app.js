//@ts-check
import express, { json } from "express";
import morgan from 'morgan';
import router from "./routes/index.js";
import cors from 'cors';
import './DB.js';


const server = express();
server.use(json())
server.use(cors())
server.use("/", router);
server.use(morgan("dev"));


export default server;