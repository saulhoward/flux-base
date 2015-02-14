var { EventEmitter } = require('events');
const EVENT = 'change';

class ChangeEmitter extends EventEmitter {
    addChangeListener(callback) {
        this.addListener(EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(EVENT, callback);
    }

    emitChange() {
        this.emit(EVENT);
    }
}

module.exports = ChangeEmitter;
