const assert = require('assert');
const readFile = require('../src/readFile');
const coMocha = require('co-mocha');

describe('read file', function () {
    it('[integration test] should get file content', function *() {
        const fs = require('fs');
        const read = readFile({fs});

        const result = yield read('./src/symbols');

        assert.equal(result, 'GOOG\nAAPL\nORCL\nMSFT');
    });

    it('[unit test] should get file content', function* () {
        const fs = {
            readFile(file, encoding, callback) {
                assert.equal(file, 'file');
                assert.equal(encoding, 'UTF-8');
                callback(null, 'content');
            }
        };
        const read = readFile({fs});

        const result = yield read('file');

        assert.equal(result, 'content');
    });

});