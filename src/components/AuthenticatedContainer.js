var React = require('react');
var { Navigation, RouteHandler } = require('react-router');

var watchStoreMixin = require('../mixins/watchStoreMixin');
var sessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
    displayName: 'AuthenticatedContainer',

    mixins: [
        Navigation,
        watchStoreMixin(sessionStore)
    ],

    statics: {
        willTransitionTo(transition, params) {
            if (!sessionStore.isAuthenticated) {
                return transition.redirect('login', params, {
                    redirect: transition.path
                });
            }
        }
    },

    getState() {
        return {
            isAuthenticated: sessionStore.isAuthenticated
        };
    },

    getInitialState() {
        return this.getState();
    },

    componentWillUpdate(nextProps, nextState) {
        if (!sessionStore.isAuthenticated) {
            this.transitionTo('login', this.props.params);
        }
    },

    render() {
        return <RouteHandler params={this.props.params} query={this.props.query} />;
    }
});
