'use strict'

let express = require('express');
let path = require('path');
let join = require('path').join;
let bodyParser = require('body-parser');
let app = express();
let routes = require('./routes/routes');

let port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Settings
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
routes(app);

app.listen(port, () => {
  console.log('Running at port ' + port);
});

module.exports = app;
