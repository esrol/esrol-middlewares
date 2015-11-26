'use strict';
module.exports = {
  priority: 1,
  middleware: function(req, res, next) {
    return next();
  }
};
