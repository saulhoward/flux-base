"use strict";

var keyMirror = require("react/lib/keyMirror");

module.exports = {
  ActionTypes: keyMirror({
    AUTH_LOGIN: null,
    AUTH_LOGIN_ERROR: null,
    AUTH_LOGIN_SUCCESS: null,
    AUTH_LOGOUT: null,
    AUTH_LOGOUT_ERROR: null,
    AUTH_LOGOUT_SUCCESS: null,
    AUTH_ERROR: null
  }),

  LoadingStatus: keyMirror({
    PENDING: null,
    LOADING: null,
    LOADED: null,
    ERROR: null,
    UPDATING: null,
    UPDATED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};