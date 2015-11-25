[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]
> A ES6 Middleware Class for esrol-server-app.
Provide a convenient mechanism for filtering web requests
entering your application.
Register and iterate through the registered middlewares
on request. When the last registered middleware is resolved, the passed route
as argument is called

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
    console.log (req.iterator);
  }
};
let req = {
  iterator: 0
};
let res = {};

middlewares.onRequest(req, res, router.route, router);


```

## Classes
<dl>
<dt><a href="#Middleware">Middleware</a></dt>
<dd></dd>
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

**Kind**: global function  
**Returns**: <code>mixed</code> - value - the returned value from the last middleware  
**Access:** public  
**Scope**: <code>object</code> scope - set scope for route param  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | http(s) request |
| res | <code>object</code> | http(s) request |
| route | <code>function</code> | the function which will be called when all middlewares are resolved |

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2015 Ivaylo Ivanov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-image]: https://badge.fury.io/js/esrol-middlewares.svg
[npm-url]: https://npmjs.org/package/esrol-middlewares
[travis-image]: https://travis-ci.org/esrol/esrol-middlewares.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-middlewares
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-middlewares/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-middlewares
