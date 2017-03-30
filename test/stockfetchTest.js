const assert = require('assert');
const stockfetch = require('../src/stockfetch');
const coMocha = require('co-mocha');

describe('stockfetch', function () {
    it('happypath',  function *() {
        let expectedInvocationCount = 0;

        const fetchSymbols = function (file) {
            expectedInvocationCount++;
            assert.equal(file, 'someFile');
            return Promise.resolve(['A', 'B', 'C']);
        };

        const fetchPrices = function (symbols) {
            expectedInvocationCount++;
            assert.deepEqual(symbols, ['A', 'B', 'C'])
            return Promise.resolve([['A', 10], ['B', 20], ['C', 30]]);
        };

        const prepareReport = function (symbolsAndPrices) {
            expectedInvocationCount++;
            assert.deepEqual(symbolsAndPrices, [['A', 10], ['B', 20], ['C', 30]]);
            return 'report';
        };

        const fetch = stockfetch({fetchSymbols, fetchPrices, prepareReport});
        const report = yield fetch('someFile');
        assert.equal(report, 'report');
        assert.equal(expectedInvocationCount, 3);
    });
});