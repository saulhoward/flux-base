var debug = require('debug')('flux:util:cookie');
var cookie = require('cookie');

if (window && document && 'cookie' in document) {
    module.exports = {
        all() {
            return cookie.parse(document.cookie);
        },
        get(key) {
            return this.all()[ key ];
        },
        set(key, value, options) {
            document.cookie = cookie.serialize(key, value, options);
        }
    };
}
else {
    debug('warning: cookie is not supported');
    module.exports = {
        _data: {},
        all() {
            return _data;
        },
        get(key) {
            return this.all()[ key ];
        },
        set(key, value, opts) {
            this._data[ key ] = value;
        }
    };
};
