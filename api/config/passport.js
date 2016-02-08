'use strict'

var LocalStrategy = require('passport-local').Strategy;
import mysql from 'mysql';
import db from './db';
//var db = mysql.createConnection(DBconfig);

db.query('USE bakke_user');

module.exports = (passport) => {

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    db.getConnection( (err, db) =>  {
      db.query('SELECT * FROM bakke_user WHERE ID=?', [id], (err, rows) => {
        done(err, rows[0]);
      });
    });
  });

  passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
          db.getConnection( (err, db) => {
            if(err) throw err;

              db.query("SELECT * FROM bakke_user WHERE username = ?",[username], (err, rows) => {
                  if (err)
                      return done(err);
                  if (!rows.length) {
                      return done(null, false, req.flash('loginMessage', 'No user found.'));
                  }
                  /*if (password != rows[0].password) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                  }*/
                  else {
                    return done(null, rows[0]);
                  }
              });

          });
        })
    );
}
