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

var defaults = require("lodash-node/modern/objects/defaults");
var Service = require("./Service");

var LoginService = (function (Service) {
  var LoginService = function LoginService() {
    Service.call(this, "com.hailocab.service.login");
  };

  _extends(LoginService, Service);

  LoginService.prototype.auth = function (params) {
    console.log("we here in auth", params);
    return this.call("Login.AuthUser", params);
  };

  LoginService.prototype.login = function (username, password) {
    var _this = this;
    console.log("login here", username);
    return this.auth({ username: username, password: password }).then(function (resp) {
      return _this.setSession(resp);
    });
  };

  LoginService.prototype.logout = function () {
    return this.call("Login.Logout", this.sessionId);
  };

  LoginService.prototype.setSession = function (response) {
    var data = {
      id: response.session
    };
    return data;
  };

  _classProps(LoginService, null, {
    sessionId: {
      get: function () {
        return {
          id: this.store.id
        };
      }
    }
  });

  return LoginService;
})(Service);

var l = new LoginService();
module.exports = l;