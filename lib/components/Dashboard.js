"use strict";

var React = require("react");
var sessionStore = require("../stores/sessionStore");

var Header = require("./Header");

var _ref = require("react-bootstrap");

var Button = _ref.Button;
var Input = _ref.Input;
var Navbar = _ref.Navbar;
var Nav = _ref.Nav;
var NavItem = _ref.NavItem;
var DropdownButton = _ref.DropdownButton;
var MenuItem = _ref.MenuItem;
var PageHeader = _ref.PageHeader;


// Routes
var ReactRouter = require("react-router");
var Navigation = ReactRouter.Navigation;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;


module.exports = React.createClass({
  displayName: "Dashboard",

  mixins: [Navigation],

  statics: {
    willTransitionTo: function (transition, params) {
      console.log("Transitioning...", transition);
      // Redirect to login if we are not authenticated and not already going to login.
      var redirectedToLogin = transition.path.indexOf("/login") === 0;
      if (!sessionStore.isAuthenticated && !redirectedToLogin) {
        var query = transition.path === "/" ? null : { redirect: transition.path };
        return transition.redirect("login", params, query);
      }
    }
  },

  componentDidMount: function () {
    sessionStore.addChangeListener(this._authChanged);
  },

  componentWillUnmount: function () {
    sessionStore.removeChangeListener(this._authChanged);
  },

  getState: function () {
    return {
      isAuthenticated: sessionStore.isAuthenticated
    };
  },

  getInitialState: function () {
    return this.getState();
  },

  _authChanged: function () {
    if (!sessionStore.isAuthenticated) {
      this.transitionTo("login", this.props.params, this.props.query);
    }
  },

  render: function () {
    this.props.params.isAuthenticated = sessionStore.isAuthenticated;
    this.props.params.username = sessionStore.username;

    var containerClassName = "no-auth", sidebarContent;

    if (this.state.isAuthenticated) {
      containerClassName = "auth";
      sidebarContent = (React.createElement(Nav, null, React.createElement(NavItem, {
        href: "#"
      }, "Link"), React.createElement(NavItem, {
        href: "#"
      }, "Link")));
    }

    var brand = (React.createElement("a", {
      href: "#"
    }, "myODC"));
    return (React.createElement("div", {
      className: containerClassName
    }, React.createElement(Header, null, React.createElement(Nav, {
      right: true,
      eventKey: 0
    }, React.createElement("li", null, React.createElement("form", {
      className: "navbar-form navbar-right"
    }, React.createElement(Input, {
      type: "text",
      placeholder: "Search..."
    }))), React.createElement(NavItem, {
      eventKey: 1,
      href: "#"
    }, "Link"), React.createElement(NavItem, {
      eventKey: 2,
      href: "#"
    }, "Link"))), React.createElement(RouteHandler, {
      params: this.props.params,
      query: this.props.query
    })));
  }
});