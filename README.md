lite-cache
================

A simple memory caching library written in ES6 for node.js 

### Installation

    npm install lite-cache

### Usage

* Simple Usage
```javascript
let liteCache = require('lite-cache');
// store string into cache
liteCache.set('foo', 'bar');
```

* TTL
```javascript
let liteCache = require('lite-cache');

// callback handle when value is expired
let cb = function (key, value) {
    console.log(key, value);
}

// store the value 'is fun' with key 'coding'
// and set expire time to 1000ms
liteCache.set('coding', 'is fun', 1000, cb);
```

### Methods  

* **set(key, value [, time, callback])**: store value with key into collection. If time is not provided then the value will persisted.
* **get(key)**: get item by key
* **remove(key)**: remove item by key
* **count()**: get total item count in collection
* **keys()**: return an array of keys
* **clear()**: clear all keys in collection

### Tests

  To run the test suite, first install the dependencies, then run `npm test`:
```bash
$ npm install
$ npm test
```

### License (MIT)

Copyright (c) 2014 Joden Lay <eanglay@hotmail.com>
