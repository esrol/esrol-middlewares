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
 */
'use strict';
let Errors = require('esrol-errors');

module.exports = class Middleware {

  /**
  * @public
  * @method constructor
  * @description Initialize properties, run factory and register error module
  */
  constructor() {
    this._initializeProperties();
    this._factory();
    this._registerErrors();
  }

  /**
  * @public
  * @method registerMiddleware
  * @description Register middleware
  * @param {function} middleware - middleware function: someFn(req, res, next)
  * @param {int} priority - determine the execution order
  * @throws {error} catchAndConsoleLogThisErrorForMoreInfo - throws error when
  * incorrect arguments are passed
  * @returns {array} this._queue - registered middlewares
  */
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

  /**
  * @private
  * @method _initializeProperties
  * @description Initialize properties
  */
  _initializeProperties() {
    this._Errors = {};
    this._queue = [];
  }

  /**
  * @private
  * @method _factory
  * @description Factory - Create new Errors object
  */
  _factory() {
    this._Errors = new Errors();
  }

  /**
  * @private
  * @method _registerErrors
  * @description Register the errors used by this class
  */
  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      'registerMiddleware expects function as first param, which will be called'
      + ' on successful request. Successful request is a request which can be '
      + 'handled by a router.'
      + ' Caused in esrol-middlewares module, class Middleware.',
      1
    );
    this._Errors.registerErrorWithNumber(
      'The function passed to registerMiddleware must expect excatly 3 params: '
      + ' req, res, next.'
      + ' Caused in esrol-middlewares module, class Middleware.',
      2
    );
    this._Errors.registerErrorWithNumber(
      'registerMiddleware expect second param to be integer representing the '
      + 'priority(order) of this middleware. The order is from higher to lower.'
      + ' So, for example, if you register two middlewares with priority 1 and 2'
      + ' the one with priority 1 will be called first.'
      + ' Caused in esrol-middlewares module, class Middleware.',
      3
    );
  }

};
