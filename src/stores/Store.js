var ChangeEmitter = require('../util/ChangeEmitter');
var clone = require('lodash-node/modern/objects/clone');

class Store extends ChangeEmitter {
    constructor(data) {
        super();
        this.reset(data);
    }

    get(key) {
        return clone(this._data[ key ]);
    }

    set(key, value) {
        this._data[ key ] = clone(value);
    }

    reset(data) {
        this._data = data ? clone(data) : {};
    }

    get data() {
        return clone(this._data);
    }
}

module.exports = Store;
