var dispatcher = require('../dispatcher');
var loginService = require('../services/loginService');

module.exports = {
    login:function(username, password) {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.AUTH_LOGIN,
            username: username
        });

        return loginService.login(username, password)
            .then(function(session) {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.AUTH_LOGIN_SUCCESS,
                    session: session,
                    username: username
                });
            })
            .catch(function(err) {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.AUTH_LOGIN_ERROR,
                    error: err,
                    username: username
                });
            });
    },

    logout: function() {
        dispatcher.handleViewAction({
            action: dispatcher.ActionTypes.AUTH_LOGOUT
        });

        loginService.logout()
            .then(function() {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.AUTH_LOGOUT_SUCCESS
                });
            })
            .catch(function(err) {
                dispatcher.handleServerAction({
                    action: dispatcher.ActionTypes.AUTH_LOGOUT_ERROR,
                    error: err
                });
            });
    }
};
