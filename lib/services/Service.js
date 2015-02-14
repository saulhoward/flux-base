"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var debug = require("debug")("web-flux:service");

var map = require("lodash-node/modern/collections/map");
var merge = require("lodash-node/modern/objects/merge");
var defaults = require("lodash-node/modern/objects/defaults");
var clone = require("lodash-node/modern/objects/clone");

var Promise = require("bluebird");
var URIjs = require("URIjs");

var _ref = require("querystring");

var stringify = _ref.stringify;


var request = require("../util/request");

var sessionStore = require("../stores/sessionStore");

// Setup config
var myodcConfig = defaults(window.myodcConfig || {}, {
  apiBaseURL: "https://localhost"
});

var Service = (function () {
  var Service = function Service(name) {
    this.apiURL = new URIjs(myodcConfig.apiBaseURL).normalize().toString();

    if (name) {
      this.name = name;
    } else {
      throw new Error("Service name not set");
    }

    Function.call(this);
  };

  Service.prototype.getParams = function (endpoint, req) {
    var url = new URIjs(this.apiURL);
    url.path(endpoint);

    return {
      url: url.toString(),
      body: stringify(req)
    };

    // var id = this.store.session.id;
    // if (id) {
    //     url += '&session_id=' + encodeURIComponent(id);
    // }
    // return {
    //     url: url.toString(),
    //     body: stringify({
    //         service: this.name,
    //         endpoint: endpoint,
    //         request: JSON.stringify(req)
    //     })
    // };
  };

  Service.prototype.call = function (endpoint, req, options) {
    if (req === undefined) req = {};
    if (options === undefined) options = {};
    if (this.store == null) throw new Error("Missing Service store");
    if (!endpoint) throw new Error("Missing endpoint");

    return request(merge({}, this.defaultParams, this.getParams(endpoint, req), options // overrides
    )).spread(function (res, body) {
      return body;
    }).then(JSON.parse);
  };

  _classProps(Service, null, {
    store: {
      get: function () {
        return Service.store;
      },
      set: function (store) {
        Service.store = store;
      }
    },
    defaultParams: {
      get: function () {
        return {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          method: "POST",
          timeout: 10000
        };
      }
    }
  });

  return Service;
})();

Service.prototype.store = sessionStore;

module.exports = Service;