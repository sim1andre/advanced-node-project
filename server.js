'use strict'

import express from 'express';
import mysql from 'mysql';
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
import flash from 'connect-flash';
import path, {join} from 'path';
import bodyParser from 'body-parser';
import db from './api/config/db';

import routes from './api/routes/app';
import api_routes from './api/routes/api';


var app = express();
var router = express.Router();

const port = process.env.PORT || 3000;

// Settings
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

// Middleware
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session({
  secret: 'test',
  resave: true,
  saveUninitalized: true
}));

app.use(flash());

require('./api/config/passport')(passport);

routes(app, router, passport);
api_routes(app, router, passport);

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
