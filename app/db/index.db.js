if (!window.indexedDB) {
    window.indexedDB = window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
}

if (!window.IDBTransaction) {
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction ||
        window.msIDBTransaction;
}

if (!window.IDBKeyRange) {
    window.IDBKeyRange = window.IDBKeyRange ||
        window.webkitIDBKeyRange ||
        window.msIDBKeyRange;
}

(function (window) {
    'use strict';

    var db = {
        version: 1,
        objectStoreName: 'cashFlow',
        instance: {},
        upgrade: function (e) {
            var _db = e.target.result,
                names = _db.objectStoreNames,
                name = db.objectStoreName;

            if (!names.contains(name)) {
                _db.createObjectStore(
                    name,
                    {
                        keyPath: 'id',
                        autoIncrement: true
                    }
                );
            }
        },

        errorHandler: function (error) {
            window.console.error(error);
            debugger;
        },

        open: function (callback) {
            var request = window.indexedDB.open(db.objectStoreName, db.version);

            request.onerror = db.errorHandler();

            request.onupgradeneeded = db.upgrade;

            request.onsuccess = function (e) {
                db.instance = request.result;
                db.instance.onerror = db.errorHandler;

                callback();
            };
        },

        getObjectStore: function (mode) {
            var txn, store;
            mode = mode || 'readonly';

            txn = db.instance.transaction([db.objectStoreName], mode);

            store = txn.objectStore(db.objectStoreName);

            return store;
        },

        save: function (data, callback) {
            db.open(function () {
                var store, mode = 'readwrite';

                store = db.getObjectStore(mode);

                var request = data.id ? store.put(data) : store.add(data);

                request.onsuccess = callback;
            });
        },

        getAll: function (callback) {
            db.open(function () {
                var store = db.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {
                    var result = e.target.result;

                    if (result && result != null) {
                        data.push(result.value);
                        result.continue();
                    } else {
                        callback(data);
                    }
                };
            });
        },

        get: function (id, callback) {
            id = parseInt(id);

            db.open(function () {
                var store = db.getObjectStore(),
                    request = store.get(id);

                request.onsuccess = function (e) {
                    callback(e.target.result);
                };
            });
        },

        'delete': function (id, callback) {
            id = parseInt(id);
            db.open(function () {
                var mode = 'readwrite';
                var store = db.getObjectStore(mode);
                var request = store.delete(id);
                request.onsuccess = callback;
            });
        },

        deleteAll: function (callback) {
            db.open(function () {
                var mode = 'readwrite';
                var store = db.getObjectStore(mode);
                var request = store.clear();

                request.onsuccess = callback;
            });
        }
    };

    window.app = window.app || {};
    window.app.db = db;
})(window);

export class IndexedDB {
    constructor(name) {
        this.version = 1;
        this.objectStoreName = name;
        this.instance = {};
    }

    upgrade(e) {
        var _db = e.target.result,
            names = _db.objectStoreNames,
            name = this.objectStoreName;

        if (!names.contains(name)) {
            _db.createObjectStore(
                name,
                {
                    keyPath: 'id',
                    autoIncrement: true
                }
            );
        }
    }

    errorHandler(error) {
        if (error) {
            window.console.error(error);
            debugger;
        }
    }

    open(callback) {
        var db = this;

        var request = window.indexedDB.open(db.objectStoreName, db.version);

        request.onerror = db.errorHandler();

        request.onupgradeneeded = db.upgrade;

        request.onsuccess = function (e) {
            db.instance = request.result;
            db.instance.onerror = db.errorHandler;

            callback();
        };
    }

    getObjectStore(mode) {
        var db = this;

        var txn, store;
        mode = mode || 'readonly';

        txn = db.instance.transaction([db.objectStoreName], mode);

        store = txn.objectStore(db.objectStoreName);

        return store;
    }

    save(data, callback) {
        var db = this;

        db.open(function () {
            var store, mode = 'readwrite';

            store = db.getObjectStore(mode);

            var request = data.id ? store.put(data) : store.add(data);

            request.onsuccess = callback;
        });
    }

    getAll(callback) {
        var db = this;

        db.open(function () {
            var store = db.getObjectStore(),
                cursor = store.openCursor(),
                data = [];

            cursor.onsuccess = function (e) {
                var result = e.target.result;

                if (result && result != null) {
                    data.push(result.value);
                    result.continue();
                } else {
                    callback(data);
                }
            };
        });
    }

    get(callback) {
        var db = this;

        db.open(function () {
            var store = db.getObjectStore(),
                cursor = store.openCursor(),
                data = [];

            cursor.onsuccess = function (e) {
                var result = e.target.result;

                if (result && result != null) {
                    data.push(result.value);
                    result.continue();
                } else {
                    callback(data);
                }
            };
        });
    }

    delete(id, callback) {
        id = parseInt(id);
        var db = this;

        db.open(function () {
            var mode = 'readwrite';
            var store = db.getObjectStore(mode);
            var request = store.delete(id);
            request.onsuccess = callback;
        });
    }

    deleteAll(callback) {
        var db = this;
        db.open(function () {
            var mode = 'readwrite';
            var store = db.getObjectStore(mode);
            var request = store.clear();

            request.onsuccess = callback;
        });
    }
}