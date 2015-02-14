module.exports = (store, ...stores) => {

    stores.unshift(store);

    return {

        updateState() {
            this.setState(this.getState());
        },

        componentWillMount() {
            stores.forEach(store => store.addChangeListener(this.updateState));
        },

        componentWillUnmount() {
            stores.forEach(store => store.removeChangeListener(this.updateState));
        }
    };
};
