'use strict';

var
  koa = require('koa'),
  config = require('config'),
  Sequelize = require('sequelize-heroku'),
  models = require('./api/models'),
  sequelize = Sequelize.connect(),
  app = module.exports = koa();

require('../config/koa')(app);
require('./api/routes')(app);

sequelize.authenticate()
  .then(function(err){
    console.log("connection has been sucessfully established");
  },
  function(err){
    console.log("Err6r+ " + err);
  });

console.log("Listening at " + config.server.port);

models.sequelize.sync().then(function(){
  if(config.seed) {require("../config/seed");}
  if(!module.parent) app.listen(config.server.port);
}).error(function(err){
  console.log(err.message);
});
