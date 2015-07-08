module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {'use strict';
  
  var koa = __webpack_require__(40),
      config = __webpack_require__(39),
      Sequelize = __webpack_require__(107),
      models = __webpack_require__(108),
      sequelize = new Sequelize(config.db.name),
      app = module.exports = koa();
  
  __webpack_require__(98)(app);
  __webpack_require__(99)(app);
  
  sequelize.authenticate().then(function (err) {
    console.log('connection has been sucessfully established');
  }, function (err) {
    console.log('Err6r+ ' + err);
  });
  
  console.log('Listening at ' + config.server.port);
  console.log(models.sequelize.DatabaseError);
  
  models.sequelize.sync().then(function () {
    if (!module.parent) app.listen(config.server.port);
  }).error(function (err) {
    console.log(err.message);
  });
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)(module)))

/***/ },

/***/ 38:
/***/ function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },

/***/ 39:
/***/ function(module, exports) {

  module.exports = require("config");

/***/ },

/***/ 40:
/***/ function(module, exports) {

  module.exports = require("koa");

/***/ },

/***/ 41:
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var koa = __webpack_require__(40),
      config = __webpack_require__(39),
      path = __webpack_require__(41),
      views = __webpack_require__(106),
      serve = __webpack_require__(105),
      logger = __webpack_require__(103),
      staticPath = path.resolve(config['static']);
  
  module.exports = function (app) {
    app.use(views(config.template.path));
    app.use(serve(staticPath));
    app.use(logger());
  };

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var router = __webpack_require__(104),
      IndexController = __webpack_require__(100);
  
  module.exports = function (app) {
    app.use(router(app));
    app.get('/', IndexController.view).get('/api/thing', __webpack_require__(114));
  
    // app.get('/api/thing', require('./thing'));;
  };

/***/ },

/***/ 100:
/***/ function(module, exports) {

  "use strict";
  
  module.exports = {
    view: regeneratorRuntime.mark(function index(next) {
      return regeneratorRuntime.wrap(function index$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.next = 2;
            return this.render("index", {
              title: "Victors new project"
            });
  
          case 2:
            context$1$0.next = 4;
            return next;
  
          case 4:
          case "end":
            return context$1$0.stop();
        }
      }, index, this);
    })
  };

/***/ },

/***/ 103:
/***/ function(module, exports) {

  module.exports = require("koa-logger");

/***/ },

/***/ 104:
/***/ function(module, exports) {

  module.exports = require("koa-router");

/***/ },

/***/ 105:
/***/ function(module, exports) {

  module.exports = require("koa-static");

/***/ },

/***/ 106:
/***/ function(module, exports) {

  module.exports = require("koa-views");

/***/ },

/***/ 107:
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var fs = __webpack_require__(110),
      path = __webpack_require__(41),
      config = __webpack_require__(39),
      Sequelize = __webpack_require__(107),
      sequelize = new Sequelize(config.db.name);
  
  var db = {};
  
  var modelsPath = path.resolve('./server/api/models');
  
  console.log('Dir = ' + modelsPath);
  
  fs.readdirSync(modelsPath).filter(function (file) {
    return file.indexOf('.') !== 0 && file.indexOf('.spec.') === -1 && file !== 'index.js';
  }).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
  
  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  module.exports = db;

/***/ },

/***/ 110:
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {'use strict';
  
  var Router = __webpack_require__(104),
      thingRouter = new Router({
    prefix: '/things'
  }),
      controller = __webpack_require__(115);
  
  module['export'] = function (app) {
  
    thingRouter.get('/', controller.index);
    app.use(thingRouter.routes());
  };
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)(module)))

/***/ },

/***/ 115:
/***/ function(module, exports) {

  "use strict";

/***/ }

/******/ });
//# sourceMappingURL=server.js.map