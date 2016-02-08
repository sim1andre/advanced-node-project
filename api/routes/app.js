'use strict'

//CONTROLLERS
import Auth from '../controllers/auth';
var LocalStrategy = require('passport-local').Strategy;

module.exports = (app, router, passport) => {

  router.get('/', (req, res) => {
      res.render('login');
  });

  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile',
      failureRedirect : '/login',
      failureFlash : true
  }));

  //Prevent all interactions with auth routes
  router.all('/admin/*', Auth.isAuthenticated);

  router.get('/admin/prosjekter', (req, res) => {
    res.json({test: 'prosjekter'});
  });

  router.get('/admin/interessenter', (req, res) => {
    res.json({test: 'interessenter'});
  });

  app.use('/', router);

}
