"use strict";

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

var _ref = require("events");

var EventEmitter = _ref.EventEmitter;
var EVENT = "change";

var ChangeEmitter = (function (EventEmitter) {
  var ChangeEmitter = function ChangeEmitter() {
    EventEmitter.apply(this, arguments);
  };

  _extends(ChangeEmitter, EventEmitter);

  ChangeEmitter.prototype.addChangeListener = function (callback) {
    this.addListener(EVENT, callback);
  };

  ChangeEmitter.prototype.removeChangeListener = function (callback) {
    this.removeListener(EVENT, callback);
  };

  ChangeEmitter.prototype.emitChange = function () {
    this.emit(EVENT);
  };

  return ChangeEmitter;
})(EventEmitter);

module.exports = ChangeEmitter;