'use strict';

const Department = require('../../controllers/department/index');

module.exports = function (app, router, opts) {
    /**
     * @api {GET} counties/list 获取南昌市下所有区县.
     * @apiVersion 1.0.0
     * @apiGroup Department
     */
    app.fs.api.logAttr['GET/counties/list'] = { content: '获取南昌市下所有区县', visible: true };
    router.get('/counties/list', Department.getCountiesList);
};
