'use strict'

//All routes goes here
module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index');
  });

}
