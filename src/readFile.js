module.exports = function({fs}) {
    return function(name) {
        return new Promise(function(resolve, reject) {
            fs.readFile(name, 'UTF-8', (err, data) => {
                resolve(data);
            });
        });
    };
};