//@ts-check
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index.js');
const cors = require('cors');
require('./DB.js');
const passport = require('passport');
require('./models/util/middlewares/facebook-auth.js');
require('./models/util/middlewares/google-auth.js');

const server = express();
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cors());
server.use('/', router);
server.use(morgan('dev'));
server.use(passport.initialize());
module.exports = server;
