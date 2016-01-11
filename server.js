'use strict'

import express from 'express';
import path, {join} from 'path';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Settings
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
routes(app);

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
