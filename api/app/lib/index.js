'use strict';

const routes = require('./routes');
const authenticator = require('./middlewares/authenticator');
// const apiLog = require('./middlewares/api-log');
const businessRest = require('./middlewares/business-rest');

module.exports.entry = function (app, router, opts) {
    app.fs.logger.log('info', '[FS-AUTH]', 'Inject auth and api mv into router.');

    app.fs.api = app.fs.api || {};
    app.fs.api.authAttr = app.fs.api.authAttr || {};
    app.fs.api.logAttr = app.fs.api.logAttr || {};

    router.use(authenticator(app, opts));
    router.use(businessRest(app, router, opts));
    // router.use(apiLog(app, opts));

    router = routes(app, router, opts);
};

module.exports.models = function (dc) { // dc = { orm: Sequelize对象, ORM: Sequelize, models: {} }
    require('./models/user')(dc);
    require('./models/user_token')(dc);
    require('./models/department')(dc);
    require('./models/resource')(dc);
    require('./models/user_resource')(dc);
    require('./models/places')(dc);
    require('./models/user_placeSecurityRecord')(dc);
    require('./models/report_type')(dc);
    require('./models/report_downManage')(dc);
    require('./models/department')(dc);
    require('./models/report_configition')(dc);
    require('./models/report_collection')(dc);
    require('./models/report_rectify')(dc);
    require('./models/task_catalog')(dc);
    require('./models/task_type')(dc);
    require('./models/tasks')(dc);
};
