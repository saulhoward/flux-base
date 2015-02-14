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

var debug = require("debug")("app:dispatcher");
var flux = require("flux");
var assign = require("lodash-node/modern/objects/assign");

var constants = require("./constants");

var Dispatcher = (function (flux) {
  var Dispatcher = function Dispatcher() {
    flux.Dispatcher.apply(this, arguments);
  };

  _extends(Dispatcher, flux.Dispatcher);

  Dispatcher.prototype.dispatchAction = function (source, payload) {
    payload = payload || {};
    payload.source = source;
    debug("dispatch", payload);
    this.dispatch(payload);
  };

  Dispatcher.prototype.handleServerAction = function (payload) {
    return this.dispatchAction(constants.PayloadSources.SERVER_ACTION, payload);
  };

  Dispatcher.prototype.handleViewAction = function (payload) {
    return this.dispatchAction(constants.PayloadSources.VIEW_ACTION, payload);
  };

  Dispatcher.prototype.addActionTypes = function (actionTypes) {
    if (!this.ActionTypes) {
      this.ActionTypes = actionTypes;
    } else {
      assign(this.ActionTypes, actionTypes);
    }
  };

  return Dispatcher;
})(flux);

var dispatcher = new Dispatcher();
dispatcher.addActionTypes(constants.ActionTypes);

module.exports = dispatcher;