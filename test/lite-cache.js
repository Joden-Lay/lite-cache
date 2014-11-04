'use strict';

let liteCache = require('../index.js');
let assert = require('assert');

describe('liteCache', function () {

    beforeEach(function () {
        liteCache.clear();
        liteCache.set('one', 1);
        liteCache.set('two', 2);
        liteCache.set('three', 3);
        liteCache.set('four', 4);
        liteCache.set('five', 5);
        liteCache.set('six', 6);
        liteCache.set('seven', 7);
        liteCache.set('eight', 8);
        liteCache.set('nine', 9);
        liteCache.set('ten', 10);
    });

    describe('set', function () {
        it('Should has value of 11', function () {
            liteCache.set('eleven', 11);
            assert(liteCache.get('eleven'), '11 is not exist');
            assert(liteCache.get('eleven') === 11, 'key ten does not contain right data');
        });

    });

    describe('get', function () {
        it('Should has value of 5', function () {
            assert(liteCache.get('five'), '5 is not exist');
            assert(liteCache.get('five') === 5, 'key ten does not contain right data');
        });

        it('Should not has value of 11', function () {
            assert(!liteCache.get('eleven'), '11 is exist');
        });
    });

    describe('remove', function () {
        it('Should not has value of 5', function () {
            liteCache.remove('five', 5);
            assert(!liteCache.get('five'), '5 is exist');
        });
    });

    describe('update key', function () {
        it('Should update value of 5 to 55', function () {
            liteCache.set('five', 55);
            assert(liteCache.get('five'), '5 is not exist');
            assert(liteCache.get('five') === 55, 'key ten does not contain right data');
        });
    });

    describe('count', function () {
        it('Should equal 10', function () {
            assert(liteCache.count() === 10, 'count is not 10');
        });

        it('Should equal 9', function () {
            liteCache.remove('six');
            assert(liteCache.count() === 9, 'count is not 9');
        });
    });

    describe('keys', function () {
        it('Should equal 10', function () {
            assert(liteCache.keys().length === 10, 'length is not 10');
        });

        it('Should equal 9', function () {
            liteCache.remove('six');
            liteCache.remove('five');
            assert(liteCache.keys().length === 8, 'length is not 8');
        });
    });

    describe('ttl', function () {

        it('Should has value of 20', function () {
            let called = false;
            liteCache.set('twenty', 20, 20, function () {
                called = true;
            });
            assert(liteCache.get('twenty'), '20 is not exist');
            assert(liteCache.get('twenty') === 20, 'key ten does not contain right data');
        });

        it('Timeout callback is triggered', function (done) {
            let called = false;
            liteCache.set('twenty', 20, 20, function () {
                called = true;
            });
            setTimeout(function () {
                assert(called, 'not called back');
                done();
            }, 30);
        });

        it('Timeout value should no longer exist', function (done) {
            let called = false;
            liteCache.set('twenty', 20, 20, function () {
                called = true;
            });
            setTimeout(function () {
                assert(!liteCache.get('twenty'), '20 is still exist');
                done();
            }, 30);
        });
    });

});
