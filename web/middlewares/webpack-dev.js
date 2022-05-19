'use strict';
const express = require('express')
const webpack = require('webpack');
const devConfig = require('../webpack.config');
const middleware = require('webpack-dev-middleware');
const proxy = require('koa-better-http-proxy');
const url = require('url');

const compiler = webpack(devConfig);

module.exports = {
    entry: function (app, router, opts) {
        app.use(proxy('http://localhost:5001', {
            filter: function (ctx) {
                return /\/build/.test(url.parse(ctx.url).path);
            },
            proxyReqPathResolver: function (ctx) {
                return 'client' + url.parse(ctx.url).path;
            }
        }));

        app.use(proxy('http://localhost:5001', {
            filter: function (ctx) {
                return /\/$/.test(url.parse(ctx.url).path);
            },
            proxyReqPathResolver: function (ctx) {
                return 'client/build/index.html';
            }
        }));

        const server = express();
        server.use(middleware(compiler));
        //server.use(require("webpack-hot-middleware")(compiler));
        server.listen('5001', function (err) {
            if (err) {
                console.log(err);
            }
        })
    }
};
