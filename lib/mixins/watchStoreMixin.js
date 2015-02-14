"use strict";

var _slice = Array.prototype.slice;
module.exports = function (store) {
  var stores = _slice.call(arguments, 1);

  stores.unshift(store);

  return {
    updateState: function () {
      this.setState(this.getState());
    },

    componentWillMount: function () {
      var _this = this;
      stores.forEach(function (store) {
        return store.addChangeListener(_this.updateState);
      });
    },

    componentWillUnmount: function () {
      var _this2 = this;
      stores.forEach(function (store) {
        return store.removeChangeListener(_this2.updateState);
      });
    }
  };
};