'use strict';

const proxy = require('koa-proxy');
const convert = require('koa-convert');

module.exports = {
    entry: function (app, router, opts) {
        app.use(convert(proxy({
            host: opts.host,
            match: opts.match,
            map: function (path) {
                return path.replace(opts.match, '');
            }
        })));
    }
};