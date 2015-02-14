var defaults = require('lodash-node/modern/objects/defaults');
var Service = require('./Service');

class LoginService extends Service {
    constructor() {
        super('com.hailocab.service.login');
    }

    auth(params) {
        console.log('we here in auth', params);
        return this.call('Login.AuthUser', params);
    }

    login(username, password) {
        console.log('login here', username);
        return this.auth({ username: username, password: password})
            .then(resp => this.setSession(resp));
    }

    logout() {
        return this.call('Login.Logout', this.sessionId);
    }

    get sessionId() {
        return {
            id: this.store.id
        }
    }

    setSession(response) {
        var data = {
            id: response.session
        };
        return data;
    }
}

var l = new LoginService();
module.exports = l;
