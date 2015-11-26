'use strict';
let expect = require('chai').expect;
let Middleware = require('../index.js');
let mocks = require('./mocks/index');
let middleware = new Middleware();

describe('Middleware', () => {

  describe('Middleware Success...', () => {

    describe('registerMiddleware', () => {
      it('Should return array of middlewares with length 1', () => {
        expect(middleware.registerMiddleware(mocks.simpleMiddleware))
        .to.have.length(1);
      });
      it('Should return array of middlewares with length 2', () => {
        expect(middleware.registerMiddleware(mocks.secondSimpleMiddleware))
        .to.have.length(2);
      });
    });

    describe('onRequest', () => {
      it('Should return 200', () => {
        expect(
          middleware.onRequest(
            {},
            {},
            mocks.simpleRoute.getMultipleRecords,
            mocks.simpleRoute
          )
        ).to.equal(200);
      });
    });

    describe('onRequest using async middleware', () => {
      it('Should return 200', (done) => {
        let async = {
          priority: 3,
          middleware: function(req, res, next) {
            setTimeout(() => {
              let result = next();
              expect(result).to.equal(200);
              done();
            }, 100);
          }
        };
        expect(middleware.registerMiddleware(async)).to.have.length(3);
        middleware.onRequest(
          {},
          {},
          mocks.simpleRoute.getMultipleRecords,
          mocks.simpleRoute
        );
      });
    });

  });

  describe('Middleware Fail...', () => {
    let should = 'Throw an error';

    describe('registerMiddleware with non function as first param', () => {
      it(should, () => {
        expect(() => { middleware.registerMiddleware({}, 2); }).to.throw(Error);
      });
    });

    describe('registerMiddleware with only one param', () => {
      it(should, () => {
        expect(() => {
          middleware.registerMiddleware({priority: 2});
        }).to.throw(Error);
      });
    });

    describe('registerMiddleware with non integer as priority param', () => {
      it(should, () => {
        expect(() => {
          middleware.registerMiddleware({}, '2');
        }).to.throw(Error);
      });
    });

    describe('registerMiddleware without params', () => {
      it(should, () => {
        expect(() => {
          middleware.registerMiddleware();
        }).to.throw(Error);
      });
    });

    describe('registerMiddleware when middleware accept only 2 params', () => {
      it(should, () => {
        expect(() => {
          middleware.registerMiddleware(function(req, res) {}, 2);
        }).to.throw(Error);
      });
    });

    describe('onRequest when next() is not called', () => {
      it('Should return undefined', (done) => {
        let async = {
          priority: 1,
          middleware: function(req, res, next) {
            done();
          }
        };
        expect(middleware.registerMiddleware(async, 4)).to.have.length(4);
        middleware.onRequest(
          {},
          {},
          mocks.simpleRoute.getMultipleRecords,
          mocks.simpleRoute
        );
      });
    });

  });

});