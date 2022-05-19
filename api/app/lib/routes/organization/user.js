'use strict';

const user = require('../../controllers/organization/user');

module.exports = function (app, router, opts) {

    app.fs.api.logAttr['GET/organization/department'] = { content: '获取部门信息', visible: false };
    router.get('/organization/department', user.getDepMessage);

    app.fs.api.logAttr['GET/organization/department/:depId/user'] = { content: '获取部门下用户信息', visible: false };
    router.get('/organization/department/:depId/user', user.getUser);

    app.fs.api.logAttr['POST/organization/department/user'] = { content: '创建部门下用户信息', visible: false };
    router.post('/organization/department/user', user.creatUser);

    app.fs.api.logAttr['PUT/organization/department/user/:id'] = { content: '修改部门下用户信息', visible: false };
    router.put('/organization/department/user/:id', user.updateUser);

    app.fs.api.logAttr['DEL/organization/department/user/:ids'] = { content: '删除部门下用户信息', visible: false };
    router.del('/organization/department/user/:ids', user.deleteUser);

    app.fs.api.logAttr['PUT/organization/department/user/resetPwd/:id'] = { content: '重置用户密码', visible: false };
    router.put('/organization/department/user/resetPwd/:id', user.resetPwd);

    /**
     * @api {PUT} user/password/:id 修改用户密码
     * @apiVersion 1.0.0
     * @apiGroup Organization
     */
    app.fs.api.logAttr['PUT/user/password/:userId'] = { content: '修改用户密码', visible: false };
    router.put('/user/password/:userId', user.updateUserPassword);
};