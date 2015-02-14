"use strict";

var debug = require("debug")("app:component:LoginPage");
var React = require("react");

var _ref = require("react-router");

var Navigation = _ref.Navigation;
var _ref2 = require("../constants");

var LoadingStatus = _ref2.LoadingStatus;
var _ref3 = require("react-bootstrap");

var Panel = _ref3.Panel;
var Alert = _ref3.Alert;
var Button = _ref3.Button;
var Input = _ref3.Input;


var authStore = require("../stores/authStore");
var sessionStore = require("../stores/sessionStore");

module.exports = React.createClass({
  displayName: "LoginPage",

  mixins: [Navigation],

  statics: {
    willTransitionTo: function (transition, params, query) {
      if (sessionStore.isAuthenticated) {
        transition.redirect(query.redirect || "/", params);
      }
    }
  },

  getState: function () {
    return {
      invalid: this.state && this.state.invalid,
      status: authStore.getStatus()
    };
  },

  getInitialState: function () {
    return this.getState();
  },

  onSubmit: function (e) {
    e.preventDefault();

    this.setState({ invalid: false });
    var username = this.refs.username.getValue(), password = this.refs.password.getValue();

    if (username.length && password.length) {
      authActions.login(username, password).then(function () {
        this.onSuccess();
      });
    } else {
      this.setState({ invalid: true });
    }
  },

  render: function () {
    var alert = null, form = null;

    if (this.state.invalid) {
      alert = (React.createElement(Alert, {
        bsStyle: "warning"
      }, "Please enter your username and password."));
    } else if (this.state.status === LoadingStatus.ERROR) {
      alert = (React.createElement(Alert, {
        bsStyle: "warning"
      }, "Invalid credentials"));
    }

    if (this.state.status === LoadingStatus.LOADING) {
      form = React.createElement("p", null, "Logging in...");
    } else {
      form = (React.createElement("form", {
        onSubmit: this.onSubmit,
        className: "form-login"
      }, React.createElement("h2", {
        className: "form-login__heading"
      }, "Please sign in"), alert, React.createElement(Input, {
        label: "Username",
        labelClassName: "sr-only",
        ref: "username",
        type: "text",
        placeholder: "Username"
      }), React.createElement(Input, {
        label: "Password",
        labelClassName: "sr-only",
        ref: "password",
        type: "password",
        placeholder: "Password"
      }), React.createElement(Button, {
        type: "submit",
        bsStyle: "primary",
        bsSize: "large",
        block: true
      }, "Login")));
    }

    return (React.createElement(Panel, null, form));
  },

  onSuccess: function () {
    var path = this.props.query.redirect || "/";
    this.transitionTo(path, this.props.params, this.props.query);
  }
});