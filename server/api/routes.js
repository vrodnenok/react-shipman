'use strict';

module.exports = function (app){

const
  thingRouter = require('./thing'),
  mount = require('koa-mount'),
  Router = require('koa-router'),
  router = new Router(),
  IndexController = require('../index.controller.js');

app.use(mount("/api/things", thingRouter.routes()));
router.get("/*", IndexController.index);
app.use(router.routes());
};
