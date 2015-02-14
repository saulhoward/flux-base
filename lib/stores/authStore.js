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

var debug = require("debug")("app:store:auth");
var Store = require("./Store");
var dispatcher = require("../dispatcher");
var _ref = require("../constants");

var LoadingStatus = _ref.LoadingStatus;
var AuthStore = (function (Store) {
  var AuthStore = function AuthStore() {
    Store.call(this, {
      status: LoadingStatus.PENDING
    });
  };

  _extends(AuthStore, Store);

  AuthStore.prototype.getStatus = function () {
    return this.get("status");
  };

  AuthStore.prototype.setStatus = function (value) {
    this.set("status", value);
  };

  return AuthStore;
})(Store);

var store = new AuthStore();

store.dispatchToken = dispatcher.register(function (payload) {
  switch (payload.action) {
    case dispatcher.ActionTypes.AUTH_LOGIN:
      store.setStatus(LoadingStatus.LOADING);
      store.emitChange();
      break;

    case dispatcher.ActionTypes.AUTH_LOGIN_ERROR:
      store.setStatus(LoadingStatus.ERROR);
      store.emitChange();
      break;

    case dispatcher.ActionTypes.AUTH_LOGIN_SUCCESS:
      store.setStatus(LoadingStatus.LOADED);
      store.emitChange();
      break;

    case dispatcher.ActionTypes.AUTH_LOGOUT_SUCCESS:
      store.setStatus(LoadingStatus.PENDING);
      store.emitChange();
      break;
  }
});

module.exports = store;