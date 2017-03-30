const fs = require('fs');
const request = require('good-guy-http')();

// read file
fs.readFile('./symbols', 'UTF-8', (err, data) => {
    // extract symbols
    const symbols = data.split('\n');

    symbols.forEach(symbol => price(symbol).then(console.log));
});

function price(symbol) {
    // fetch price
    return request(`http://ichart.finance.yahoo.com/table.csv?s=${symbol}`)
        .then(function (response) {
            // process response
            return symbol + ' ' + response.body.split('\n')[1].split(',')[1];
        });
}