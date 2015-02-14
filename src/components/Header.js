var React = require('react');
var { Navbar } = require('react-bootstrap');

module.exports = React.createClass({
    displayName: 'Header',

    render: function() {
        var brand = (
            <a href="#">myODC</a>
        );

        return (
            <Navbar inverse fixedTop fluid brand={brand} toggleNavKey={0}>
                { this.props.children }
            </Navbar>
        );
    }
});
