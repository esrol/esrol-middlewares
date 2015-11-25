'use strict';
let http = require('http');
let Middlewares = require ('esrol-middlewares');
let middlewares = new Middlewares();

middlewares.registerMiddleware((req, res, next) => {
  // some code
  req.iterator++;
  console.log ('step 1');
  next();
}, 1);

middlewares.registerMiddleware((req, res, next) => {
  // some code
  setTimeout(() => {
    // some code
    req.iterator++;
    console.log ('step 2');
    next();
  }, 1000);
}, 2);

middlewares.registerMiddleware((req, res, next) => {
  // some code
  req.iterator++;
  console.log ('step 3');
  next();
}, 3);

let router = {
  route: function(req, res) {
    console.log ('Request passed through %s middlewares', req.iterator);
  }
};

http.createServer((req, res) => {
  req.iterator = 0;
  middlewares.onRequest(req, res, router.route, router);
}).listen(3333);
console.log('Server is listening on port: 3333');
