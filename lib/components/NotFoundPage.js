"use strict";

var debug = require("debug")("app:components:NotFoundPage");
var React = require("react");

module.exports = React.createClass({
  displayName: "NotFoundPage",

  render: function () {
    return (React.createElement("div", null, React.createElement("p", null, "404 not found")));
  }
});