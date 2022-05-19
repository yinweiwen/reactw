'use strict';

const task = require('../../controllers/tasks');
const taskConfig = require('../../controllers/tasks/config');

module.exports = function (app, router, opts) {
    /**
     * @api {GET} task get.
     * @apiVersion 1.0.0
     * @apiGroup task
     */
    app.fs.api.logAttr['GET/task/list'] = { content: '查询任务列表', visible: true };
    router.get('/task/list', task.getTaskList);
    router.get('/task/catalogs', task.getTaskCatalogs);
    router.get('/task/types', task.getTaskTypes);

    app.fs.api.logAttr['POST/task/config'] = { content: 'new task', visible: true };
    router.post('task/config', taskConfig.addTask);

    app.fs.api.logAttr['PUT/task/:taskId/config'] = { content: '编辑任务', visible: true };
    router.put('/task/:taskId/config', taskConfig.editTask);

    app.fs.api.logAttr['DEL/task/:taskId/config'] = { content: '删除任务', visible: true };
    router.del('/task/:taskId/config', taskConfig.delTask);

    router.post('task/catalog', task.addTaskCatalog);
    router.put('/task/:taskCatalogId/catalog', task.editTaskCatalog);
    router.del('/task/:taskCatalogId/catalog', task.delTaskCatalog);
};