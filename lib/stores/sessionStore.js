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

var debug = require("debug")("app:store:session");

var Store = require("./Store");
var dispatcher = require("../dispatcher");
var _ref = require("../constants");

var LoadingStatus = _ref.LoadingStatus;


var cookie = require("../util/cookie");

var URI = require("URIjs");

var domain = new URI().domain();

var COOKIE_NAME = "myodc-session";

var SessionStore = (function (Store) {
  var SessionStore = function SessionStore(data) {
    var _this = this;


    // var data = {
    //     status: LoadingStatus.PENDING
    // };

    // If data is set, use it (overwrite existing)
    if (data) {
      Store.call(this, data);
      this._setStorage();
    } else {
      // Try to get existing data
      data = this._getStorage();
      if (data) {
        Store.call(this, data);
      } else {
        // Use default data
        data = defaultData;
        Store.call(this, data);
        this._setStorage();
      }
    }

    // Persist data when change event is emitted
    this.addChangeListener(function () {
      return _this._setStorage();
    });
  };

  _extends(SessionStore, Store);

  SessionStore.prototype.getCookieOptions = function () {
    return {
      domain: domain,
      encode: function (input) {
        return input;
      },
      expires: this.expiryDate && new Date(this.expiryDate),
      path: "/",
      secure: true
    };
  };

  SessionStore.prototype._getCookieContent = function () {
    try {
      var value = cookie.get("session"), data = value && JSON.parse(value);
    } catch (err) {
      debug("error getting session data", err);
    }
    return data && data.content || {};
  };

  SessionStore.prototype._getStorage = function () {
    var content = this._getCookieContent();
    return content[COOKIE_NAME] || {};
  };

  SessionStore.prototype._setStorage = function () {
    var content = this._getCookieContent();
    content[COOKIE_NAME] = this.data;

    cookie.set("session", JSON.stringify({
      schemaVersion: "4",
      content: content
    }), this.getCookieOptions());
  };

  SessionStore.prototype.getStatus = function () {
    return this.get("status");
  };

  SessionStore.prototype.setStatus = function (value) {
    this.set("status", value);
  };

  SessionStore.prototype.update = function (value) {
    this.reset(value);
    this.emitChange();
  };

  _classProps(SessionStore, null, {
    id: {
      // getters

      get: function () {
        return this.get("id");
      }
    },
    username: {
      get: function () {
        return this.get("username");
      }
    },
    isAuthenticated: {
      get: function () {
        return !!this.id;
      }
    }
  });

  return SessionStore;
})(Store);

var store = new SessionStore();

store.dispatchToken = dispatcher.register(function (payload) {
  switch (payload.action) {
    case dispatcher.ActionTypes.AUTH_LOGIN_SUCCESS:
      store.update(payload.session);
      break;

    case dispatcher.ActionTypes.AUTH_LOGOUT_SUCCESS:
      store.reset();
      store.emitChange();
      break;

    case dispatcher.ActionTypes.AUTH_ERROR:
      store.reset();
      store.emitChange();
      break;
  }
});

module.exports = store;