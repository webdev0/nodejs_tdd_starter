module.exports = function ({readFile, parseSymbols}) {
    return function (name) {
        return readFile(name).then(parseSymbols);
    };
};