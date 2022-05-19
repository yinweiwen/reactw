'use strict';

const places = require('../../controllers/places');

module.exports = function (app, router, opts) {
    /**
     * @api {GET} /user/places/:userId 根据用户ID获取该用户创建的所有场所信息.
     * @apiVersion 1.0.0
     * @apiGroup places
     */
    app.fs.api.logAttr['GET/user/places/:userId'] = { content: '根据用户ID获取该用户创建的所有场所信息', visible: true };
    router.get('/user/places/:userId', places.getPlacesByUserId);

    /**
     * @api {GET} /approveUser/places/:approveUserId 根据审批用户ID获取该审批用户范围内填报人创建的场所信息.
     * @apiVersion 1.0.0
     * @apiGroup places
     */
    app.fs.api.logAttr['GET/approveUser/places/:approveUserId'] = { content: '根据审批用户ID获取该审批用户范围内填报人创建的场所信息', visible: true };
    router.get('/approveUser/places/:approveUserId', places.getPlacesByApproveUserId);

    /**
     * @api {GET} /all/places 获取所有场所信息.
     * @apiVersion 1.0.0
     * @apiGroup places
     */
    app.fs.api.logAttr['GET/all/places'] = { content: '获取所有场所信息', visible: true };
    router.get('/all/places', places.getAllPlaces);

};