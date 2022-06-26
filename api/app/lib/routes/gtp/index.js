'use strict';

const gtp = require('../../controllers/gtp');

module.exports = function (app, router, opts) {

    // gtps
    // getGtps: 'gtp/list',
    // addGtp: 'gtp',
    // editGtp: 'gtp/{gtpid}',
    // delGtp: 'gtp/{gtpid}',

    app.fs.api.logAttr['GET/gtp/list'] = { content: '吉他谱列表', visible: true };
    router.get('/gtp/list', gtp.getList);

    router.post('/gtp', gtp.addGtp)
    router.put('/gtp/:gtpid', gtp.editGtp);
    router.get('/gtp/:gtpid', gtp.getGtp);
    router.get('/gtpname',gtp.repeatName);

    router.get('/qiniu/token', gtp.getQiniuToken);
};