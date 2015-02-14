var debug = require('debug')('app:startApp');
var React = require('react');

var dispatcher = require('./dispatcher');

function startApp(router, actionTypes) {
    if (process.env.NODE_ENV === 'development') {
        var dbg = 'app:*';
        require('debug').enable(dbg);
        debug('starting with debug', dbg);
    }

    dispatcher.addActionTypes(actionTypes);

    router.run(function(Handler, state) {
        // RouterActions.routeChange({routerState: state});
        React.render(
            <Handler params={state.params} query={state.query} />,
            document.getElementById('app')
        );
    });
}

module.exports = startApp;
