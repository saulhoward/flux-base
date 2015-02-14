var debug = require('debug')('app:dispatcher');
var flux = require('flux');
var assign = require('lodash-node/modern/objects/assign');

var constants = require('./constants');

class Dispatcher extends flux.Dispatcher {

    dispatchAction(source, payload) {
        payload = payload || {};
        payload.source = source;
        debug('dispatch', payload);
        this.dispatch(payload);
    }

    handleServerAction(payload) {
        return this.dispatchAction(constants.PayloadSources.SERVER_ACTION, payload);
    }

    handleViewAction(payload) {
        return this.dispatchAction(constants.PayloadSources.VIEW_ACTION, payload);
    }

    addActionTypes(actionTypes) {
        if (!this.ActionTypes) {
            this.ActionTypes = actionTypes;
        } else {
            assign(this.ActionTypes, actionTypes);
        }
    }
}

var dispatcher = new Dispatcher();
dispatcher.addActionTypes(constants.ActionTypes);

module.exports = dispatcher;
