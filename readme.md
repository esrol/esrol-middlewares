A ES6 Middleware Class for esrol-server-app. Provide a convenient mechanism for filtering web requests entering your application. Register and iterate through the registered middlewares on request. When the last registered middleware is resolved, the passed route as argument is called

[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]

## Installation

```sh
$ npm install --save esrol-middlewares
```
## Node Version Compatibility

| Node Version |
| ---- |
| >= 4.x |

## Usage

```js
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

```

## Classes
<dl>
<dt><a href="#Middleware">Middleware</a></dt>
<dd><p></p></dd>
</dl>

## Functions
<dt><a href="#registerMiddleware">registerMiddleware(middleware, priority)</a> ⇒ <code>array</code></dt>
<dd><p>Register middleware</p>
</dd>
<dt><a href="#onRequest">onRequest(req, res, route)</a> ⇒ <code>mixed</code></dt>
<dd><p>Call this method when you need to pass the request
through the middleware</p>
</dd>
</dl>

**Access:** public  
<a name="registerMiddleware"></a>
## registerMiddleware(middleware, priority) ⇒ <code>array</code>
Register middleware

**Returns**: <code>array</code> - <code>this._queue</code> - registered middlewares  
**Throws**:

- <code>error</code> catchAndConsoleLogThisErrorForMoreInfo - throws error when
incorrect arguments are passed

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | middleware function: someFn(req, res, next) |
| priority | <code>int</code> | determine the execution order |

<a name="onRequest"></a>
## onRequest(req, res, route) ⇒ <code>mixed</code>
Call this method when you need to pass the request
through the middleware

**Returns**: <code>mixed</code> - value - the returned value from the last middleware  
**Access:** public  
**Scope**: <code>object</code> scope - set scope for route param  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | http(s) request |
| res | <code>object</code> | http(s) response |
| route | <code>function</code> | the function which will be called when all middlewares are resolved |

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)


[npm-image]: https://badge.fury.io/js/esrol-middlewares.svg
[npm-url]: https://npmjs.org/package/esrol-middlewares
[travis-image]: https://travis-ci.org/esrol/esrol-middlewares.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-middlewares
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-middlewares/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-middlewares
