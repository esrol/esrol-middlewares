'use strict';
module.exports = function(req, res, next) {
  setTimeout(() => {
    next();
  }, 100);
};
