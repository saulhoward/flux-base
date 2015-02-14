"use strict";

var React = require("react");
var _ref = require("react-bootstrap");

var Navbar = _ref.Navbar;


module.exports = React.createClass({
  displayName: "Header",

  render: function () {
    var brand = (React.createElement("a", {
      href: "#"
    }, "myODC"));

    return (React.createElement(Navbar, {
      inverse: true,
      fixedTop: true,
      fluid: true,
      brand: brand,
      toggleNavKey: 0
    }, this.props.children));
  }
});