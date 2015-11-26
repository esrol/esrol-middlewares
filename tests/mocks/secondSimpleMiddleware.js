'use strict';
module.exports = {
  priority: 2,
  middleware: function(req, res, next) {
    return next();
  }
};
