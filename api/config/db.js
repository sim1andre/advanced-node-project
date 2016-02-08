import mysql from 'mysql';

const db = mysql.createPool({
  host: 'localhost',
  username: 'reel',
  password: 'Autofil167',
  database: 'bakke'
});

module.exports = db;
