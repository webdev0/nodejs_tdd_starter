const assert = require('assert');
const fetchSymbols = require('../src/fetchSymbols');

describe('fetch symbols', function () {
    it('reads file and parses symbols', function *() {
        let expectedInvocationsCount = 0;

        const readFile = function (name) {
            expectedInvocationsCount++;
            assert.equal(name, 'someFile');
            return Promise.resolve('file content');
        };
        const parseSymbols = function (fileContent) {
            expectedInvocationsCount++;
            assert.equal(fileContent, 'file content');
            return ['A', 'B', 'C'];
        };

        const fetch = fetchSymbols({readFile, parseSymbols});

        const symbols = yield fetch('someFile');

        assert.deepEqual(symbols, ['A', 'B', 'C']);
        assert.equal(expectedInvocationsCount, 2, 'expected number of invocations');
    });
});