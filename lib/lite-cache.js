'use strict';

let liteCache = module.exports = {};

let storage = {};

let defer = function (fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    process.nextTick(function () {
        fn.apply(fn, args);
    });
};

liteCache.get = function (key) {
    let data = storage[key];
    if (data) {
        return data.value;
    }
    return null;
};

liteCache.set = function (key, value, time, callback) {
    let previous = storage[key];
    if (previous && previous.timeout) {
        clearTimeout(previous.timeout);
    }

    let expire = false;
    if (time) {
        expire = time + (new Date()).getTime();
    }
    let item = {
        value: value,
        expire: expire
    };

    if (expire) {
        let timeout = setTimeout(function () {
            liteCache.remove(key);
            if (callback && (typeof callback === 'function')) {
                defer(callback, key, value);
            }
        }, time);
        item.timeout = timeout;
    }
    storage[key] = item;
};

liteCache.remove = function (key) {
    delete storage[key];
};

liteCache.clear = function () {
    for (let k in storage) {
        if (storage[k].timeout) {
            clearTimeout(storage[k].timeout);
        }
    }
    storage = {};
};

liteCache.count = function () {
    return Object.keys(storage).length;
};

liteCache.keys = function () {
    return Object.keys(storage);
};
