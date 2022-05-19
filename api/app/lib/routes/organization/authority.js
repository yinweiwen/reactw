'use strict';

const Authority = require('../../controllers/organization/authority');

module.exports = function (app, router, opts) {
    /**
    * @api {GET} resource 查询所有权限码.
    * @apiVersion 1.0.0
    * @apiGroup Org
    */
    app.fs.api.logAttr['GET/resource'] = { content: '查询所有权限码', visible: true };
    router.get('resource', Authority.getResource);
    /**
     * @api {GET} user/resource 查询用户权限.
     * @apiVersion 1.0.0
     * @apiGroup Org
     */
    app.fs.api.logAttr['GET/user/resource'] = { content: '查询用户权限', visible: true };
    router.get('user/resource', Authority.getUserResource);

    /**
     * @api {POST} user/resource 更新用户权限.
     * @apiVersion 1.0.0
     * @apiGroup Org
     */
    app.fs.api.logAttr['POST/user/resource'] = { content: '更新用户权限', visible: true };
    router.post('user/resource', Authority.updateUserRes);
};