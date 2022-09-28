//@ts-check
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/index.js';
import cors from 'cors';
import './DB.js';

const server = express();
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cors());
server.use('/', router);
server.use(morgan('dev'));

export default server;
