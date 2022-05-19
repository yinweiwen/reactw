'use strict';

const common = require('../../controllers/common');

module.exports = function (app, router, opts) {

    router.get('/data-dictionary/:model', common.getDataDictionary);
    router.put('/data-dictionary/:model', common.putDataDictionary);
};