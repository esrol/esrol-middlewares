'use strict';
var Errors = require('xena-errors');

module.exports = class Middleware {

  constructor() {
    this._initializeProperties();  
    this._factory();  
    this._registerErrors();
  }

  registerMiddleware(middleware, priority) {
    if (typeof middleware !== 'function') {
      this._Errors.error(`${typeof middleware} given`, 1);
    }
    if (middleware.length !== 3) {
      this._Errors.error(`${middleware.length} given`, 2);
    }   
    if (!Number.isInteger(priority)) {
      this._Errors.error(`${typeof priority} given`, 3);
    }
    return this._pushMiddlewareToQueue(middleware, priority);
  } 

  onRequest(req, res, route, scope) {
    return this._runQueue(req, res, route, scope, this._queue);
  }

  _pushMiddlewareToQueue(middleware, priority) {
    this._queue.push({
      fn: middleware,
      priority: priority
    });    
    return this._sortQueueByPriority();
  } 

  _sortQueueByPriority() {
    this._queue.sort((a, b) => { 
      return b.priority < a.priority; 
    });
    return this._queue;     
  } 

  _runQueue(req, res, route, routeScope, queue) {
    var nextFnNumber = 0;
    // this.debug('Moving through http middlewares, current fn index is: %s, queue length: %s', nextFnNumber, queue.length);
    var next = function() {
      // check the queue
      if (queue[nextFnNumber]) {
        var fn = queue[nextFnNumber].fn;
        nextFnNumber++;
        return fn(req, res, next);   
      } else {
        // empty queue, go to the route
        return route.call(routeScope, req, res);
      }
    };
    // call the queue loop
    return next();    
  } 

  _initializeProperties() {
    this._Errors = {};
    this._queue = [];
  } 

  _factory() {    
    this._Errors = new Errors();
  } 

  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      1,
      'registerMiddleware expects function as first param, which will be called'
      + ' on successful request. Successful request is a request which can be '
      + 'handled by a router. '
      + 'Caused in xena-middlewares module, class Middleware.'
    );
    this._Errors.registerErrorWithNumber(
      2,
      'The function passed to registerMiddleware must expect excatly 3 params: '
      + ' req, res, next.'
      + 'Caused in xena-middlewares module, class Middleware.'
    );
    this._Errors.registerErrorWithNumber(
      3,
      'registerMiddleware expect second param to be integer representing the '
      + 'priority(order) of this middleware. The order is from higher to lower '
      + 'So, for example, if you register two middlewares with priority 1 and 2'
      + ' the one with priority 1 will be called first.'
      + 'Caused in xena-middlewares module, class Middleware.'
    );    
  }  

};