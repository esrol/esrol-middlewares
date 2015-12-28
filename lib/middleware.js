/**
 * @author Ivaylo Ivanov
 * @public
 * @class Middleware
 * @description A Middleware Class for esrol-server-app.
 * Provide a convenient mechanism for filtering web requests
 * entering your application.
 * Register and iterate through the registered middlewares
 * on request. When the last registered middleware is resolved, the passed route
 * as argument is called
 * @requires esrol-errors
 * @requires debug
 */
'use strict';
let Errors = require('esrol-errors');
let debug = require('debug')('esrol-middlewares');

module.exports = class Middleware {

  /**
  * @public
  * @method constructor
  * @description Initialize properties and register error module
  */
  constructor() {
    this._initializeProperties();
    this._registerErrors();
  }

  /**
  * @public
  * @method registerMiddleware
  * @description Register middleware
  * @param {object} middleware - {priority: 1, onRequest: function(req, res, next)}
  * @throws {error} catchAndConsoleLogThisErrorForMoreInfo - throws error when
  * incorrect arguments are passed
  * @returns {array} this._queue - registered middlewares
  */
  registerMiddleware(obj) {
    if (!obj) {
      this._Errors.error(`${typeof obj} given`, 1);
    }
    if (typeof obj.middleware !== 'function') {
      this._Errors.error(`${typeof obj.middleware} given for function`, 1);
    }
    if (obj.middleware.length !== 3) {
      this._Errors.error(`${obj.length} params given for function`, 1);
    }
    if (!Number.isInteger(obj.priority)) {
      this._Errors.error(`${typeof priority} given for middleware priority`, 1);
    }
    debug(
      'Registering middleware %s with priority %s',
      obj.middleware.name,
      obj.priority
    );
    return this._pushMiddlewareToQueue(obj.middleware, obj.priority);
  }

  /**
  * @public
  * @method onRequest
  * @description Call this method when you need to pass the request
  * through the middleware
  * @param {object} req - http(s) request
  * @param {object} res - http(s) response
  * @param {function} route - the function which will be called when all
  * middlewares are resolved
  * @scope {object} scope - set scope for route param
  * @returns {mixed} value - the returned value from the last middleware
  */
  onRequest(req, res, route, scope) {
    return this._runQueue(req, res, route, scope, this._queue);
  }

  /**
  * @private
  * @method _pushMiddlewareToQueue
  * @description Push middleware into the middlewares queue
  * @param {function} middleware - middleware function: someFn(req, res, next)
  * @param {int} priority - determine the execution order
  * @returns {array} this._queue - registered middlewares
  */
  _pushMiddlewareToQueue(middleware, priority) {
    this._queue.push({
      fn: middleware,
      priority: priority
    });
    return this._sortQueueByPriority();
  }
  /**
  * @private
  * @method _sortQueueByPriority
  * @description Sort the current queue by priority property
  * @returns {array} this._queue - registered middlewares
  */
  _sortQueueByPriority() {
    this._queue.sort((a, b) => {
      return b.priority < a.priority;
    });
    return this._queue;
  }

  /**
  * @private
  * @method _runQueue
  * @description Walk through all registered middlewares
  * @param {object} req - http(s) request
  * @param {object} res - http(s) response
  * @param {function} route - the function which will be called when all
  * middlewares are resolved
  * @scope {object} scope - set scope for route param
  * @scope {array} queue - all registered middlewares
  * @returns {mixed} value - the returned value from the last middleware
  */
  _runQueue(req, res, route, routeScope, queue) {
    var nextFnNumber = 0;
    debug('Moving through middlewares, length: %s', queue.length);
    var next = function() {
      // check the queue
      debug('Middlewares loop, index %s', nextFnNumber);
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

  /**
  * @private
  * @method _initializeProperties
  * @description Initialize properties
  */
  _initializeProperties() {
    this._queue = [];
    this._Errors = new Errors();
  }

  /**
  * @private
  * @method _registerErrors
  * @description Register the errors used by this class
  */
  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      'registerMiddleware expects object as argument. This object must have'
      + ' two keys: priority with value {integer} - determining the execution '
      + ' order, middleware: middleware - {function} which accept 3 arguments -'
      + ' the function that will be called on request'
      + ' Caused in esrol-middlewares module, class Middleware.',
      1
    );
  }

};
