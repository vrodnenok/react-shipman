'use strict';

var
  Router = require('koa-router'),
  things = new Router(),
  controller = require('./thing.controller');

console.log(controller);

things.get('/:thingId', controller.show);
things.get('/', controller.index);
things.post('/', controller.create);
things.put('/:thingId', controller.update);
things.del('/:thingId', controller.destroy);

module.exports = things;
