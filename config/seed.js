'use strict';

const
  models = require("../server/api/models"),
  Thing = models.Thing;

Thing.destroy({where:{}}).then(function(){
  Thing.bulkCreate([{
    name: "emailer",
    info: "must be done soon"
  }]);
});
