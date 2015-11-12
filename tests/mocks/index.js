'use strict';
let simpleMiddleware = require('./simpleMiddleware');
let secondSimpleMiddleware = require('./secondSimpleMiddleware');
let simpleRoute = require('./simpleRoute');
let asyncMiddleware = require('./asyncMiddleware');

module.exports = {
  simpleRoute: simpleRoute,
  simpleMiddleware: simpleMiddleware,
  secondSimpleMiddleware: secondSimpleMiddleware,
  asyncMiddleware: asyncMiddleware
};
