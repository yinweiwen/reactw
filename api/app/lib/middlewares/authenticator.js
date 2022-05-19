/**
 * Created by PengLing on 2017/3/27.
 */
'use strict';

const pathToRegexp = require('path-to-regexp');
const util = require('util');
const moment = require('moment');

class ExcludesUrls {
    constructor(opts) {
        this.allUrls = undefined;
        this.reload(opts);
    }

    sanitizePath(path) {
        if (!path) return '/';
        const p = '/' + path.replace(/^\/+/i, '').replace(/\/+$/, '').replace(/\/{2,}/, '/');
        return p;
    }

    reload(opts) {
        // load all url
        if (!this.allUrls) {
            this.allUrls = opts;
            let that = this;
            this.allUrls.forEach(function (url, i, arr) {
                if (typeof url === "string") {
                    url = { p: url, o: '*' };
                    arr[i] = url;
                }
                const keys = [];
                let eachPath = url.p;
                url.p = (!eachPath || eachPath === '(.*)' || util.isRegExp(eachPath)) ? eachPath : that.sanitizePath(eachPath);
                url.pregexp = pathToRegexp(eachPath, keys);
            });
        }
    }

    isExcluded(path, method) {
        return this.allUrls.some(function (url) {
            return !url.auth
                && url.pregexp.test(path)
                && (url.o === '*' || url.o.indexOf(method) !== -1);
        });
    }
}

/**
 * 判断Url是否不鉴权
 * @param {*} opts {exclude: [*] or []}，'*'或['*']:跳过所有路由; []:所有路由都要验证
 * @param {*} path 当前request的path
 * @param {*} method 当前request的method
 */
let isPathExcluded = function (opts, path, method) {
    let excludeAll = Boolean(opts.exclude && opts.exclude.length && opts.exclude[0] == '*');
    let excludes = null;
    if (!excludeAll) {
        let excludeOpts = opts.exclude || [];
        excludeOpts.push({ p: '/login', o: 'POST' });
        excludeOpts.push({ p: '/wxLogin', o: 'POST' });
        excludeOpts.push({ p: '/logout', o: 'PUT' });
        excludeOpts.push({ p: '/wxLogout', o: 'PUT' });
        excludes = new ExcludesUrls(excludeOpts);
    }
    let excluded = excludeAll || excludes.isExcluded(path, method);
    return excluded;
};

let authorizeToken = async function (ctx, token) {
    let rslt = null;
    const tokenFormatRegexp = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/g;
    if (token && tokenFormatRegexp.test(token)) {
        try {
            const axyRes = await ctx.fs.dc.models.UserToken.findOne({
                where: {
                    token: token,
                    expired: { $gte: moment().format('YYYY-MM-DD HH:mm:ss') }
                }
            });
            const { userInfo, expired } = axyRes;
            if (!expired || moment().valueOf() <= moment(expired).valueOf()) {
                rslt = {
                    'authorized': userInfo.authorized,
                    'resources': (userInfo || {}).resources || [],
                };
                ctx.fs.api.userId = userInfo.id;
                ctx.fs.api.userInfo = userInfo;
                ctx.fs.api.token = token;
            }
        } catch (err) {
            const { error } = err.response || {};
            ctx.fs.logger.log('[anxinyun]', '[AUTH] failed', (error || {}).message || `cannot GET /users/${token}`);
        }
    }
    return rslt;
};

let isResourceAvailable = function (resources, options) {
    let authCode = null;
    // authorize user by authorization attribute
    const { authAttr, method, path } = options;
    console.log(resources, options)
    for (let prop in authAttr) {
        let keys = [];
        let re = pathToRegexp(prop.replace(/\:[A-Za-z_\-]+\b/g, '(\\d+)'), keys);
        if (re.test(`${method}${path}`)) {
            authCode = authAttr[prop];
            break;
        }
    }
    return !authCode || (resources || []).some(code => code === authCode);
};

function factory(app, opts) {
    return async function auth(ctx, next) {
        const { path, method, header, query } = ctx;
        ctx.fs.logger.log('[AUTH] start', path, method);
        ctx.fs.api = ctx.fs.api || {};
        ctx.fs.port = opts.port;
        ctx.redis = app.redis;
        let error = null;
        if (path) {
            if (!isPathExcluded(opts, path, method)) {
                const user = await authorizeToken(ctx, header.token || query.token);
                if (user && user.authorized) {
                    // if (!isResourceAvailable(user.resources, { authAttr: app.fs.auth.authAttr, path, method })) {
                    //     error = { status: 403, name: 'Forbidden' }
                    // } else {
                    //     error = { status: 401, name: 'Unauthorized' }
                    // }
                } else {
                    error = { status: 401, name: 'Unauthorized' }
                }
            }
        } else {
            error = { status: 401, name: 'Unauthorized' };
        }
        if (error) {
            ctx.fs.logger.log('[AUTH] failed', path, method);
            ctx.status = error.status;
            ctx.body = error.name;
        } else {
            ctx.fs.logger.log('[AUTH] passed', path, method);
            await next();
        }
    }
}

module.exports = factory;
