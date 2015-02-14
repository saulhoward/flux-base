"use strict";

var debug = require("debug")("flux:util:cookie");
var cookie = require("cookie");

if (window && document && "cookie" in document) {
  module.exports = {
    all: function () {
      return cookie.parse(document.cookie);
    },
    get: function (key) {
      return this.all()[key];
    },
    set: function (key, value, options) {
      document.cookie = cookie.serialize(key, value, options);
    }
  };
} else {
  debug("warning: cookie is not supported");
  module.exports = {
    _data: {},
    all: function () {
      return _data;
    },
    get: function (key) {
      return this.all()[key];
    },
    set: function (key, value, opts) {
      this._data[key] = value;
    }
  };
};