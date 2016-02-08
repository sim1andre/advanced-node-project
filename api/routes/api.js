'use strict'

module.exports = (api, router, passport) => {

  /*router.get('/login', (req, res) => {
    res.render('login');
  });*/

  api.use('/api', router);

}
