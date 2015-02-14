"use strict";

var React = require("react");
var _ref = require("react-router");

var Navigation = _ref.Navigation;
var RouteHandler = _ref.RouteHandler;


var watchStoreMixin = require("../mixins/watchStoreMixin");
var sessionStore = require("../stores/sessionStore");

module.exports = React.createClass({
  displayName: "AuthenticatedContainer",

  mixins: [Navigation, watchStoreMixin(sessionStore)],

  statics: {
    willTransitionTo: function (transition, params) {
      if (!sessionStore.isAuthenticated) {
        return transition.redirect("login", params, {
          redirect: transition.path
        });
      }
    }
  },

  getState: function () {
    return {
      isAuthenticated: sessionStore.isAuthenticated
    };
  },

  getInitialState: function () {
    return this.getState();
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (!sessionStore.isAuthenticated) {
      this.transitionTo("login", this.props.params);
    }
  },

  render: function () {
    return React.createElement(RouteHandler, {
      params: this.props.params,
      query: this.props.query
    });
  }
});