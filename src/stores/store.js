var assign = require('object-assign');
var EventEmitterProto = require('events').EventEmitter.prototype;
var dispatcher = require('../dispatcher.js');
var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
    init: function() {},
    // set method will accepts array of objects
    // i.e the data or models.
    set: function(arr) {
        // first we dont want duplicate objects
        var currIds = this._data.map(function(m) {
            return m.cid; // will return array of ids
        });

        // return the ids which are not currently in _data
        arr.filter(function(item) {
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));
    },

    add: function(item) {
        this._data.push(item);
    },

    all: function() {
        return this._data;
    },

    get: function(id) {
        return this._data.filter(function(item) {
            return item.cid === id;
        })[0];
    },

    addChangeListener: function(fn) {
        this.on(CHANGE_EVENT, fn);
    },

    removeChangeListener: function(fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    // for binding and action to store
    // so when an action is triggred the server
    // gets notified, Here the actionFn runs
    // when an action ouccurs.
    bind: function (actionType, actionFn) {
        // if the current action type is already there
        // then append new action.
        if (this.actions[actionType]) {
            this.actions[actionType].push(actionFn);
        } else {
            this.actions[actionType] = [actionFn];
        }
    }
};

exports.extend = function(methods) {
    var store = {
        _data: [],
        actions: {}
    };

    // assiging EventEmitterProto, storeMethods, methods to store prototype
    assign(store, EventEmitterProto, storeMethods, methods);

    // If the stores custom method doesn't have init then it will pick it from
    // the storeMethods
    store.init();

    // After initializing actions we need to register the actions to dispatcher
    dispatcher.register(function(action) {
        if (store.actions[action.actionType]) {
            store.actions[action.actionType].forEach(function (fn) {
                fn.call(store, action.data);
                store.emitChange();
            });
        }
    });

    return store;
};
