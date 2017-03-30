module.exports = function({fetchSymbols, fetchPrices, prepareReport}) {
    return function(fileName) {
        return fetchSymbols(fileName).then(fetchPrices).then(prepareReport);
    };
};