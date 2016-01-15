
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Provide a convenient mechanism for accessing requests and response. Register and iterate through the registered middlewares on request. When the last registered middleware is resolved, the passed route as argument is called.

*Part of [Esrol](https://github.com/esrol/esrol)*

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

```
_Please see the <a href="https://github.com/esrol/esrol-server-app/wiki/Middlewares" target="_blank">docs</a> here, for information how to use middlewares_

## Methods
<dt><a href="#registerMiddleware">registerMiddleware(middleware, priority)</a> ⇒ <code>array</code></dt>
<dd><p>Register middleware</p>
</dd>
<dt><a href="#onRequest">onRequest(req, res, route)</a> ⇒ <code>mixed</code></dt>
<dd><p>Call this method when you need to pass the request
through the middleware</p>
</dd>
</dl>

<a name="registerMiddleware"></a>
## registerMiddleware(middleware) ⇒ <code>array</code>
Register middleware

**Returns**: <code>array</code> - <code>this._queue</code> - registered middlewares  
**Throws**:

- <code>error</code> catchAndConsoleLogThisErrorForMoreInfo - throws error when
incorrect arguments are passed


| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>object</code> | {priority: 1, onRequest: function(req, res, next)} |

<a name="onRequest"></a>
## onRequest(req, res, route) ⇒ <code>mixed</code>
Call this method when you need to pass the request
through the middleware

**Returns**: <code>mixed</code> - value - the returned value from the last middleware  
**Scope**: <code>object</code> scope - set scope for route param  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | http(s) request |
| res | <code>object</code> | http(s) response |
| route | <code>function</code> | the function which will be called when all middlewares are resolved |

## Contriubtion

Any contribution will be highly appreciated. Just make sure that:

1. Your code works.  
2. You have 100% successful tests coverage.  
3. You have comments in your code.  
4. Follows eslint config. Exceptions are possible where that make sense.  


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
