var debug = require('debug')('app:store:session');

var Store = require('./Store');
var dispatcher = require('../dispatcher');
var { LoadingStatus } = require('../constants');

var cookie = require('../util/cookie');

var URI = require('URIjs');

var domain = new URI().domain();

const COOKIE_NAME = 'myodc-session';

class SessionStore extends Store {

    constructor(data) {

        // var data = {
        //     status: LoadingStatus.PENDING
        // };

        // If data is set, use it (overwrite existing)
        if (data) {
            super(data);
            this._setStorage();
        } else {
            // Try to get existing data
            data = this._getStorage();
            if (data) {
                super(data);
            } else {
                // Use default data
                data = defaultData;
                super(data);
                this._setStorage();
            }
        }

        // Persist data when change event is emitted
        this.addChangeListener(() => this._setStorage());
    }

    getCookieOptions() {
        return {
            domain: domain,
            encode: function(input) { return input; },
            expires: this.expiryDate && new Date(this.expiryDate),
            path: '/',
            secure: true
        };
    }

    _getCookieContent() {
        try {
            var value = cookie.get('session'),
                data = value && JSON.parse(value);
        }
        catch (err) {
            debug('error getting session data', err);
        }
        return data && data.content || {};
    }

    _getStorage() {
        var content = this._getCookieContent();
        return content[ COOKIE_NAME ] || {};
    }

    _setStorage() {
        var content = this._getCookieContent();
        content[ COOKIE_NAME ] = this.data;

        cookie.set('session', JSON.stringify({
            schemaVersion: '4',
            content: content
        }), this.getCookieOptions());
    }

    getStatus() {
        return this.get('status');
    }

    setStatus(value) {
        this.set('status', value);
    }

    // getters

    get id() {
        return this.get('id');
    }

    get username() {
        return this.get('username');
    }

    get isAuthenticated() {
        return !!this.id;
    }

    update(value) {
        this.reset(value);
        this.emitChange();
    }
}

var store = new SessionStore();

store.dispatchToken = dispatcher.register(payload => {
    switch (payload.action) {

        case dispatcher.ActionTypes.AUTH_LOGIN_SUCCESS:
            store.update(payload.session);
            break;

        case dispatcher.ActionTypes.AUTH_LOGOUT_SUCCESS:
            store.reset();
            store.emitChange();
            break;

        case dispatcher.ActionTypes.AUTH_ERROR:
            store.reset();
            store.emitChange();
            break;
    }
});

module.exports = store;
