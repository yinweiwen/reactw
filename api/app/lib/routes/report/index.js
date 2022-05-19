'use strict';

const report = require('../../controllers/report');
const reportConfig = require('../../controllers/report/config')
const reportRectify = require('../../controllers/report/compile')

module.exports = function (app, router, opts) {
    /**
     * @api {GET} report 报表.
     * @apiVersion 1.0.0
     * @apiGroup report
     */
    app.fs.api.logAttr['GET/report/list'] = { content: '报表下载列表', visible: true };
    router.get('/report/list', report.getReportList);

    // 报表配置
    app.fs.api.logAttr['GET/allAreas'] = { content: '获取全部区域', visible: true };
    router.get('/allAreas', reportConfig.getAreas);

    app.fs.api.logAttr['POST/report/config'] = { content: '添加报表配置', visible: true };
    router.post('/report/config', reportConfig.addReportConfig);

    app.fs.api.logAttr['GET/report/config'] = { content: '获取报表配置', visible: true };
    router.get('/report/config', reportConfig.getReportConfig);

    app.fs.api.logAttr['PUT/report/:reportId/config'] = { content: '编辑报表配置', visible: true };
    router.put('/report/:reportId/config', reportConfig.editReportConfig);

    app.fs.api.logAttr['DEL/report/:reportId/config'] = { content: '删除报表配置', visible: true };
    router.del('/report/:reportId/config', reportConfig.delReportConfig);

    // 报表编辑
    app.fs.api.logAttr['GET/report/rectify'] = { content: '获取合用场所安全隐患排查整治汇总表', visible: true };
    router.get('/report/rectify', reportRectify.getReportRectify);

    app.fs.api.logAttr['GET/report/rectify/detail'] = { content: '获取合用场所安全隐患排查整治汇总表详情', visible: true };
    router.get('/report/rectify/detail', reportRectify.getReportRectifyDetail);

    app.fs.api.logAttr['POST/report/rectify/detail'] = { content: '保存合用场所安全隐患排查整治汇总表编辑信息', visible: true };
    router.post('/report/rectify/detail', reportRectify.compileReportRectifyDetail);
};