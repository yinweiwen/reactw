const moment = require('moment');

async function getTaskList(ctx, next) {
    try {
        const { userInfo } = ctx.fs.api;
        console.log(userInfo);
        const models = ctx.fs.dc.models;
        const { createdAt, taskName, catalog, type, state, limit, offset } = ctx.query;

        let where = {};
        if (createdAt) {
            where.createdAt = {
                $gte: moment(createdAt[0]).format('YYYY-MM-DD HH:mm:ss'),
                $lte: moment(createdAt[1]).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        if (taskName) {
            where.name = {
                $iLike: `%${taskName}%`
            }
        }

        if (state && state != 'all') {
            where.state = state;
        }

        if (catalog && catalog > 0) {
            where.catalog = catalog;
        }

        if (type && type > 0) {
            where.type = type;
        }

        let findObj = {
            include: [{
                model: models.TaskCatalog,
                attributes: ['name']
            }, {
                model: models.TaskType,
                attributes: ['name']
            }],
            where: where,
            order: [['createdAt', 'desc']],
        };

        if (Number(limit) > 0 && Number(offset) >= 0) {
            findObj.limit = Number(limit);
            findObj.offset = Number(offset);
        }
        const res = await models.Tasks.findAndCountAll(findObj)

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path:${ctx.path},error:${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询任务列表失败"
        };
    }
}
async function getTaskCatalogs(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const res = await models.TaskCatalog.findAll()

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path:${ctx.path},error:${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询任务分组失败"
        };
    }
}

async function editTaskCatalog(ctx) {
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body
        const { taskCatalogId } = ctx.params

        const repeatName = await models.TaskCatalog.find({
            where: {
                name: data.name
            }
        })

        if (repeatName) {
            throw '重名配置';
        }

        await models.TaskCatalog.update(data, {
            where: {
                id: parseInt(taskCatalogId)
            }
        })
        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "编辑失败"
        }
    }
}

async function addTaskCatalog(ctx) {
    try {
        const data = ctx.request.body
        const models = ctx.fs.dc.models;

        const repeatName =await models.TaskCatalog.find({
            where: {
                name: data.name
            }
        })
        if (repeatName) {
            throw '重名配置';
        }

        ctx.body = await models.TaskCatalog.create(data);
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "新增失败"
        }
    }
}

async function delTaskCatalog(ctx) {
    try {
        const models = ctx.fs.dc.models;
        const { taskCatalogId } = ctx.params
        await models.TaskCatalog.destroy({
            where: {
                id: parseInt(taskCatalogId)
            }
        })

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "删除失败"
        }
    }
}

async function getTaskTypes(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const res = await models.TaskType.findAll()

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path:${ctx.path},error:${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询任务类型失败"
        };
    }
}

module.exports = {
    getTaskList,
    getTaskCatalogs,
    getTaskTypes,
    addTaskCatalog,
    editTaskCatalog,
    delTaskCatalog
};