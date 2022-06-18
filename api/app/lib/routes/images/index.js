'use strict';

const images = require('../../controllers/images');

module.exports = function (app, router, opts) {
    /**
     * @api {GET} images get.
     * @apiVersion 1.0.0
     * @apiGroup images
     */
    app.fs.api.logAttr['GET/images/list'] = { content: '查询图库列表', visible: true };
    router.get('/images/list', images.getList);
    router.post('/image/del', images.delQiniuPic);
};