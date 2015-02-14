var React = require('react');
var sessionStore = require('../stores/sessionStore');

var Header = require('./Header');

// Generic components
var {
    Button, Input, Navbar, Nav, NavItem, DropdownButton, MenuItem, PageHeader
} = require('react-bootstrap');

// Routes
var ReactRouter = require('react-router');
var { Navigation, RouteHandler, Link } = ReactRouter;

module.exports = React.createClass({
    displayName: 'Dashboard',

    mixins: [Navigation],

    statics: {
        willTransitionTo(transition, params) {
            console.log('Transitioning...', transition);
            // Redirect to login if we are not authenticated and not already going to login.
            var redirectedToLogin = transition.path.indexOf('/login') === 0;
            if (!sessionStore.isAuthenticated && !redirectedToLogin) {
                var query = transition.path === '/' ? null : {redirect: transition.path};
                return transition.redirect('login', params, query);
            }
        }
    },

    componentDidMount() {
        sessionStore.addChangeListener(this._authChanged);
    },

    componentWillUnmount() {
        sessionStore.removeChangeListener(this._authChanged);
    },

    getState() {
        return {
            isAuthenticated: sessionStore.isAuthenticated
        };
    },

    getInitialState() {
        return this.getState();
    },

    _authChanged() {
        if(!sessionStore.isAuthenticated) {
            this.transitionTo('login', this.props.params, this.props.query);
        }
    },

    render: function() {
        this.props.params.isAuthenticated = sessionStore.isAuthenticated;
        this.props.params.username = sessionStore.username;

        var containerClassName = 'no-auth',
            sidebarContent;

        if (this.state.isAuthenticated) {
            containerClassName = 'auth';
            sidebarContent = (
                <Nav>
                    <NavItem href="#">Link</NavItem>
                    <NavItem href="#">Link</NavItem>
                </Nav>
            );
        }

        var brand = (
            <a href="#">myODC</a>
        );
        return (
            <div className={containerClassName}>
                <Header>
                    <Nav right eventKey={0}>
                        <li>
                            <form className="navbar-form navbar-right">
                                <Input type="text" placeholder="Search..." />
                            </form>
                        </li>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>
                    </Nav>
                </Header>
                <RouteHandler params={this.props.params} query={this.props.query} />
            </div>
        );
    }
});
