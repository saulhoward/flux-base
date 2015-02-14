var React = require('react');
var { RouteHandler } = require('react-router');
var Header = require('./Header');

module.exports = React.createClass({
    displayName: 'SimpleApp',

    render: function() {
        var header;
        if (this.props.header) {
            header = <Header />;
        }
        return (
            <div className="app-container">
                { header }
                <RouteHandler params={this.props.params} query={this.props.query} />
            </div>
        );
    }
});
