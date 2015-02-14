"use strict";

var React = require("react");
var _ref = require("react-router");

var RouteHandler = _ref.RouteHandler;
var Header = require("./Header");

module.exports = React.createClass({
  displayName: "SimpleApp",

  render: function () {
    var header;
    if (this.props.header) {
      header = React.createElement(Header, null);
    }
    return (React.createElement("div", {
      className: "app-container"
    }, header, React.createElement(RouteHandler, {
      params: this.props.params,
      query: this.props.query
    })));
  }
});