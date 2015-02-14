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

var Promise = require("bluebird");
var request = require("xhr");
var status = require("statuses");

var HttpError = (function (Error) {
  var HttpError = function HttpError(code, message) {
    this.name = "HttpError";
    this.code = code || status(message);
    this.message = message || status[code] || "Error " + code;
    Error.captureStackTrace && Error.captureStackTrace(this, HttpError);
  };

  _extends(HttpError, Error);

  return HttpError;
})(Error);

;

var ClientError = (function (HttpError) {
  var ClientError = function ClientError(code, message) {
    code = code || 400;
    HttpError.call(this, code, message);
    this.name = "ClientError";
    Error.captureStackTrace && Error.captureStackTrace(this, ClientError);
  };

  _extends(ClientError, HttpError);

  return ClientError;
})(HttpError);

;

var ServerError = (function (HttpError) {
  var ServerError = function ServerError(code, message) {
    code = code || 500;
    HttpError.call(this, code, message);
    this.name = "ServerError";
    Error.captureStackTrace && Error.captureStackTrace(this, ServerError);
  };

  _extends(ServerError, HttpError);

  return ServerError;
})(HttpError);

;

var RequestError = (function (Error) {
  var RequestError = function RequestError(message) {
    this.name = "RequestError";
    this.message = message;
    Error.captureStackTrace && Error.captureStackTrace(this, RequestError);
  };

  _extends(RequestError, Error);

  return RequestError;
})(Error);

;

module.exports = function (options) {
  return new Promise(function (resolve, reject) {
    request(options, function (err, xhr, body) {
      if (xhr.statusCode === 0) {
        return reject(new RequestError("Internal XHR Error"));
      }
      if (xhr.statusCode >= 400 && xhr.statusCode < 500) {
        return reject(new ClientError(xhr.statusCode, body));
      }
      if (xhr.statusCode >= 500 && xhr.statusCode < 600) {
        return reject(new ServerError(xhr.statusCode, body));
      }
      resolve([xhr, body]);
    });
  });
};