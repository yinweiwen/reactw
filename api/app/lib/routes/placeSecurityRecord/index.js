'use strict';

const placeSecurityRecord = require('../../controllers/placeSecurityRecord');

module.exports = function (app, router, opts) {
    /**
     * @api {POST} /add/placeSecurityRecord 提交填报信息/保存填报草稿.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
     */
    app.fs.api.logAttr['POST/add/placeSecurityRecord'] = { content: '提交填报信息/保存填报草稿', visible: true };
    router.post('/add/placeSecurityRecord', placeSecurityRecord.addPlaceSecurityRecord);

    /**
     * @api {PUT} /placeSecurityRecord/:id 编辑填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
     */
    app.fs.api.logAttr['PUT/placeSecurityRecord/:id'] = { content: '编辑填报信息', visible: true };
    router.put('/placeSecurityRecord/:id', placeSecurityRecord.editPlaceSecurityRecord);

     /**
     * @api {PUT} /placeSecurityRecord/:id 修改type字段
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
     */
      app.fs.api.logAttr['PUT/updateType/:id'] = { content: '修改type字段', visible: true };
      router.put('/updateType/:id', placeSecurityRecord.updateType);
    
    /**
     * @api {DELETE} /placeSecurityRecord/:id 删除填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
     */
    app.fs.api.logAttr['DELETE/placeSecurityRecord/:id'] = { content: '删除填报信息', visible: true };
    router.del('/placeSecurityRecord/:id', placeSecurityRecord.deletePlaceSecurityRecord);

    /**
     * @api {GET} /placeSecurityRecord/:id 根据填报信息ID查询填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
     */
    app.fs.api.logAttr['GET/placeSecurityRecord/:id'] = { content: '根据填报信息ID查询填报信息', visible: true };
    router.get('/placeSecurityRecord/:id', placeSecurityRecord.getPlaceSecurityRecordById);

    /**
     * @api {GET} /recently/placeSecurityRecord/:placeId 根据场所ID获取该场所最近用户填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
    */
    app.fs.api.logAttr['GET/recently/placeSecurityRecord/:placeId'] = { content: '根据场所ID获取该场所最近用户填报信息', visible: true };
    router.get('/recently/placeSecurityRecord/:placeId', placeSecurityRecord.getRecentlyPlaceSecurityRecordByPlaceId);

    /**
     * @api {GET} /placeSecurityRecords 根据筛选条件获取用户填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
    */
    app.fs.api.logAttr['GET/placeSecurityRecords'] = { content: '根据筛选条件获取用户填报信息', visible: true };
    router.get('/placeSecurityRecords', placeSecurityRecord.getPlaceSecurityRecords);

    /**
     * @api {GET} /approve/placeSecurityRecords 根据筛选条件获取用户审批填报信息.
     * @apiVersion 1.0.0
     * @apiGroup placeSecurityRecord
    */
    app.fs.api.logAttr['GET/approve/placeSecurityRecords'] = { content: '根据筛选条件获取用户审批填报信息', visible: true };
    router.get('/approve/placeSecurityRecords', placeSecurityRecord.getApprovePlaceSecurityRecords);

};