'use strict';

var
  Thing = require('../models').Thing;

module.exports = {

  index: function* (){
    let ctx = this;
    ctx.body = yield Thing.findAll();
  },

  show: function* (){
    let ctx = this;
    let id = ctx.params.thingId;
    // console.log(" and the id = " + id + (parseInt(id, 10) === NaN));
    if(!id || (parseInt(id, 10) === NaN)) return ctx.throw('Object Id must be present and must be an integer', 404);
    let thing = yield Thing.findById(id);
    if(!thing) return ctx.throw('Object not found', 404);
    // console.log(thing);
    ctx.body = thing;
  },

  create: function* (){
    let ctx = this;
    console.log(ctx.request.body);
    if(!ctx.request.body){
      ctx.throw("The body is empty", 400);
    }
    ctx.status = 200;
    ctx.body = yield Thing.create(ctx.request.body);
  },

  destroy: function* (){
    let ctx = this;
    let id = ctx.params.thingId;
    console.log(id);
    if(!id || (parseInt(id, 10) === NaN)) ctx.throw("There must be id specified and it must be a number", 400);
    var thing = yield Thing.destroy({where: {id: id}});
    ctx.body = thing + " records have been destroyed.";
  },

  update: function* (){
    var thing = {};
    let ctx = this;
    let id = parseInt(ctx.params.thingId, 10);
    if(id === NaN) ctx.throw ("No id specified ot it's not a number", 400);
    if(!ctx.request.body) ctx.throw("There must have been an object passed", 400);
    if(ctx.request.body.id) delete ctx.request.body.id;
    try {
      thing = yield Thing.findById(id);
    } catch (err) {
      this.throw(400, err);
    }
    if(!thing) ctx.throw("record not found", 404);
    // console.log(thing);
    let updatedThing =  yield thing.update(ctx.request.body);
    ctx.body = updatedThing;
  }

};
