'use strict';

const wxReport = require('../../controllers/wxReport/index');
module.exports = function (app, router, opts) {
    /*******************首页-市级***************************/
    /**
     * @api {GET} getDayReport 获取每日汇总.
     * @apiVersion 1.0.0
     * @apiGroup wxReport
     */
    app.fs.api.logAttr['GET/getDayReport'] = { content: '获取每日汇总', visible: true };
    router.get('/getDayReport', wxReport.getDayReport);

    /**
    * @api {GET} getGovern 获取排查整治汇总.
    * @apiVersion 1.0.0
    * @apiGroup wxReport
    */
    app.fs.api.logAttr['GET/getGovern'] = { content: '获取排查整治汇总', visible: true };
    router.get('/getGovern', wxReport.getGovern);

    /**
    * @api {GET} getGovernDetail 获取排查整治汇总详情.
    * @apiVersion 1.0.0
    * @apiGroup wxReport
    */
    app.fs.api.logAttr['GET/getGovernDetail'] = { content: '获取排查整治汇总详情', visible: true };
    router.get('/getGovernDetail', wxReport.getGovernDetail);

    /**
   * @api {PUT} /operateGovern 确认整治汇总场所数据.
   * @apiVersion 1.0.0
   * @apiGroup wxReport
   */
    app.fs.api.logAttr['PUT/operateGovern'] = { content: '确认整治汇总场所数据', visible: true };
    router.put('/operateGovern', wxReport.operateGovern);

    /**
    * @api {GET} getSecurityRiskList 获取安全隐患排查详细数据列表.
    * @apiVersion 1.0.0
    * @apiGroup wxReport
    */
    app.fs.api.logAttr['GET/getSecurityRiskList'] = { content: '获取安全隐患排查详细数据列表', visible: true };
    router.get('/getSecurityRiskList', wxReport.getSecurityRiskList);

    /**
   * @api {GET} /getHomeCount/:userId/:departmentId/:userRegionType 获取待处理数量.
   * @apiVersion 1.0.0
   * @apiGroup wxReport
   */
    app.fs.api.logAttr['GET/getHomeCount/:userId/:departmentId/:userRegionType'] = { content: '获取待处理数量', visible: true };
    router.get('/getHomeCount/:userId/:departmentId/:userRegionType', wxReport.getHomeCount);


    /**
   * @api {PUT} /operateReport/:id/:userId 每日汇总表上报.
   * @apiVersion 1.0.0
   * @apiGroup wxReport
   */
    app.fs.api.logAttr['PUT/operateReport/:id/:userId'] = { content: '每日汇总表上报', visible: true };
    router.put('/operateReport/:id/:userId', wxReport.operateReport);

    /**
     * @api {GET} /approve/reportCollections 根据筛选条件获取用户审核报表信息.
     * @apiVersion 1.0.0
     * @apiGroup wxReport
    */
    app.fs.api.logAttr['GET/approve/reportCollections'] = { content: '根据筛选条件获取用户审核报表信息', visible: true };
    router.get('/approve/reportCollections', wxReport.getApproveReportCollections);

    /**
   * @api {PUT} /operateGovernReport/:userId 上报排查整治汇总表.
   * @apiVersion 1.0.0
   * @apiGroup wxReport
   */
    app.fs.api.logAttr['PUT/operateGovernReport/:userId'] = { content: '上报排查整治汇总表', visible: true };
    router.put('/operateGovernReport/:userId', wxReport.operateGovernReport);
}