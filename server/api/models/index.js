// This file has been automatically generated with Sequelize-cli

'use strict';

const
  fs = require('fs'),
  path = require('path'),
  config = require('config'),
  Sequelize = require('sequelize'),
  sequelize = new Sequelize(config.db.name,
  {
      ssl: true
  }
  );

let db = {};

var modelsPath = path.resolve('./server/api/models');

fs.readdirSync(modelsPath).filter(function(file){
    return (file.indexOf('.') !== 0) && (file.indexOf('.spec.') === -1) && ( file !== 'index.js');
  }).forEach(function(file){
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName){
  if("associate" in db[modelName]){
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
