'use strict';

const auth = require('../../controllers/auth');

module.exports = function (app, router, opts) {
    /**
     * @api {Post} login 登录.
     * @apiVersion 1.0.0
     * @apiGroup Auth
     */
    app.fs.api.logAttr['POST/login'] = { content: '登录', visible: true };
    router.post('/login', auth.login);

    /**
     * @api {POST} wxLogin 微信小程序登录.（使用手机号、密码登录）
     * @apiVersion 1.0.0
     * @apiGroup Auth
     */
    app.fs.api.logAttr['POST/wxLogin'] = { content: '微信小程序登录', visible: true };
    router.post('/wxLogin', auth.wxLogin);

    app.fs.api.logAttr['PUT/logout'] = { content: '登出', visible: false };
    router.put('/logout', auth.logout);

    /**
     * @api {PUT} wxLogout 微信小程序登出
     * @apiVersion 1.0.0
     * @apiGroup Auth
     */
    app.fs.api.logAttr['PUT/wxLogout'] = { content: '登出', visible: false };
    router.put('/wxLogout', auth.wxLogout);
};
