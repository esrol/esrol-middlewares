'use strict';
module.exports = {
  priority: 3,
  middleware: function(req, res, next) {
    setTimeout(() => {
      next();
    }, 100);
  }
};
