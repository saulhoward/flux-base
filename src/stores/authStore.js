var debug = require('debug')('app:store:auth');
var Store = require('./Store');
var dispatcher = require('../dispatcher');
var { LoadingStatus } = require('../constants');

class AuthStore extends Store {
    constructor() {
        super({
            status: LoadingStatus.PENDING
        });
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(value) {
        this.set('status', value);
    }
}

var store = new AuthStore();

store.dispatchToken = dispatcher.register(payload => {

    switch (payload.action) {

        case dispatcher.ActionTypes.AUTH_LOGIN:
            store.setStatus(LoadingStatus.LOADING);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.AUTH_LOGIN_ERROR:
            store.setStatus(LoadingStatus.ERROR);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.AUTH_LOGIN_SUCCESS:
            store.setStatus(LoadingStatus.LOADED);
            store.emitChange();
            break;

        case dispatcher.ActionTypes.AUTH_LOGOUT_SUCCESS:
            store.setStatus(LoadingStatus.PENDING);
            store.emitChange();
            break;
    }
});

module.exports = store;
