'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function (app, router, opts) {
    fs.readdirSync(__dirname).forEach((filename) => {
        if (filename.indexOf('.') !== 0 &&fs.lstatSync(path.join(__dirname, filename)).isDirectory()) { 
            fs.readdirSync(path.join(__dirname, filename)).forEach((api) => {
                if (api.indexOf('.') == 0 || api.indexOf('.js') == -1) return;
                require(`./${filename}/${api}`)(app, router, opts);
            });
        }
    });

    return router;
};
