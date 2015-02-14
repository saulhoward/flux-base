var debug = require('debug')('app:component:LoginPage');
var React = require('react');

var { Navigation } = require('react-router');
var { LoadingStatus } = require('../constants');

var { Panel, Alert, Button, Input } = require('react-bootstrap');

var authStore = require('../stores/authStore');
var sessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
    displayName: 'LoginPage',

    mixins: [Navigation],

    statics: {
        willTransitionTo(transition, params, query) {
            if (sessionStore.isAuthenticated) {
                transition.redirect(query.redirect || '/', params);
            }
        }
    },

    getState() {
        return {
            invalid: this.state && this.state.invalid,
            status: authStore.getStatus()
        };
    },

    getInitialState() {
        return this.getState();
    },

    onSubmit(e) {
        e.preventDefault();

        this.setState({ invalid: false });
        var username = this.refs.username.getValue(),
            password = this.refs.password.getValue();

        if (username.length && password.length) {
            authActions.login(username, password)
                .then(function() {
                    this.onSuccess();
                });
        } else {
            this.setState({ invalid: true });
        }
    },

    render() {
        var alert = null,
            form = null;

        if (this.state.invalid) {
            alert = (
                <Alert bsStyle="warning">Please enter your username and password.</Alert>
            );
        } else if (this.state.status === LoadingStatus.ERROR) {
            alert = (
                <Alert bsStyle="warning">Invalid credentials</Alert>
            );
        }

        if (this.state.status === LoadingStatus.LOADING) {
            form = <p>Logging in...</p>;
        } else {
            form = (
                <form onSubmit={this.onSubmit} className="form-login">
                    <h2 className="form-login__heading">Please sign in</h2>
                    {alert}
                    <Input label="Username" labelClassName="sr-only" ref="username" type="text" placeholder="Username" />
                    <Input label="Password" labelClassName="sr-only" ref="password" type="password" placeholder="Password" />
                    <Button type="submit" bsStyle="primary" bsSize="large" block>Login</Button>
                </form>
            );
        }

        return (
            <Panel>
                { form }
            </Panel>
        );
    },

    onSuccess() {
        var path = this.props.query.redirect || '/';
        this.transitionTo(path, this.props.params, this.props.query);
    }
});
