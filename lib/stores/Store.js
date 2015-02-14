"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var ChangeEmitter = require("../util/ChangeEmitter");
var clone = require("lodash-node/modern/objects/clone");

var Store = (function (ChangeEmitter) {
  var Store = function Store(data) {
    ChangeEmitter.call(this);
    this.reset(data);
  };

  _extends(Store, ChangeEmitter);

  Store.prototype.get = function (key) {
    return clone(this._data[key]);
  };

  Store.prototype.set = function (key, value) {
    this._data[key] = clone(value);
  };

  Store.prototype.reset = function (data) {
    this._data = data ? clone(data) : {};
  };

  _classProps(Store, null, {
    data: {
      get: function () {
        return clone(this._data);
      }
    }
  });

  return Store;
})(ChangeEmitter);

module.exports = Store;