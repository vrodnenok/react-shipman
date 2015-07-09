'use strict';

const
  koa = require('koa'),
  config = require('config'),
  path = require('path'),
  views = require('koa-views'),
  serve = require('koa-static'),
  logger = require('koa-logger'),
  json = require('koa-json'),
  bodyParser = require('koa-bodyparser'),
  staticPath = path.resolve(config.static);

module.exports = function(app){
  app.use(views(config.template.path));
  app.use(serve(__dirname + '/build/public'));
  app.use(logger());
  app.use(bodyParser());
};
