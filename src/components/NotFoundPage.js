var debug = require('debug')('app:components:NotFoundPage');
var React = require('react');

module.exports = React.createClass({
    displayName: 'NotFoundPage',

    render() {
        return (
            <div>
                <p>404 not found</p>
            </div>
        );
    }
});
