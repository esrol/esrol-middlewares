'use strict';
const http = require('http');
const Middlewares = require ('esrol-middlewares');
const middlewares = new Middlewares();

middlewares.registerMiddleware({
  priority: 1,
  middleware: function(req, res, next){
    // some code
    req.iterator++;
    console.log ('step 1');
    next();
  }
});

middlewares.registerMiddleware({
  priority: 2,
  middleware: function(req, res, next) {
    // some code
    setTimeout(() => {
      // some code
      req.iterator++;
      console.log ('step 2');
      next();
    }, 1000);
  }
});

middlewares.registerMiddleware({
  priority: 3,
  middleware: function(req, res, next) {
    // some code
    req.iterator++;
    console.log ('step 3');
    next();
  }
});

const router = {
  route: function(req, res) {
    console.log ('Request passed through %s middlewares', req.iterator);
    res.end();
  }
};

http.createServer((req, res) => {
  req.iterator = 0;
  middlewares.onRequest(req, res, router.route, router);
}).listen(3333);
console.log('Server is listening on port: 3333');
