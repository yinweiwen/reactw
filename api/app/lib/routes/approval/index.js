'use strict';

const Approval = require('../../controllers/approval/index');

module.exports = function (app, router, opts) {
    /**
     * @api {POST} approval/submit 提交审批、驳回修改.
     * @apiVersion 1.0.0
     * @apiGroup Approval
     */
    app.fs.api.logAttr['GET/approval/submit'] = { content: '提交审批、驳回修改', visible: true };
    router.post('/approval/submit', Approval.submitApproval);
};