'use strict';

console.log('test is being run');

const
  app = require("../server"),
  should = require("should"),
  request = require('supertest').agent(app.listen());

var thingCreated = {};

describe("index", function(){

  it("should render the mainpage", function(done){
    request.get("/")
    .expect(200)
    .end(done);
  });

  it("should respond to api/things with json", function(done){
    request.get("/api/things")
    .set("Accept", "application/json")
    .expect("content-type", /json/)
    .expect(200)
    .end(done);
  });

  it("should create a new thing and read it", function(done){
    var thing={name: "new", info: "thing", done: false};
    request.post("/api/things")
    .send(thing)
    //.set("content-type", "json")
    .expect(200)
    .end(function(err, res){
      if(err) throw err;
      res.body.should.have.property("id");
      res.body.name.should.equal("new");
      res.body.info.should.equal("thing");
      res.body.done.should.equal(false);
      thingCreated = res.body;
      console.log(thingCreated.id);
      request.get("/api/things/" + thingCreated.id)
      .expect(200)
      .end(done);
      //done();
    });
  });

  it("should render main page on any arbitrary path", function(done){
    request.get("/api/thizsdfsdngs")
    .expect(200)
    .end(done);
  });

  it(" PUT '/api/things/:id' should update a row in db", function(done){
    let thing = {name: "updated", info: "thing", done: true};
    request.put("/api/things/" + thingCreated.id)
    .send(thing)
    .expect(200)
    .end(function(err, res){
      if(err) throw err;
      should.exist(res.body);
      done();
    });
  });

  it(" PUT '/api/things/:id' should throw if wrong id", function(done){
    let thing = {name: "updated", info: "thing", done: true};
    request.put("/api/things/" + 1)
    .send(thing)
    .expect(404)
    .end(done);
  });

  it(" DELETE '/api/things/:id' should destroy a row in db", function(done){
    console.log("ID = " + thingCreated.id);
    request.del("/api/things/" + thingCreated.id)
    .expect(200)
    .end(function(err, res){
      if(err) throw err;
      should.exist(res.body);
      done();
    });
  });

});
