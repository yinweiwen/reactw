
async function addTask(ctx, next) {
    try {
        const { userInfo } = ctx.fs.api;
        if (!userInfo) {
            throw '未定义用户信息'
        }
        const data = ctx.request.body
        const models = ctx.fs.dc.models;
        if (userInfo) {
            data.user = userInfo.id
        }

        ctx.body = await models.Tasks.create(data)
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            "message": "任务创建失败"
        }
    }
}

async function editTask(ctx) {
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body;
        const { taskId } = ctx.params;

        await models.Tasks.update(data, {
            where: {
                id: parseInt(taskId)
            }
        })
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            "message": "任务编辑失败"
        }
    }
}

async function delTask(ctx) {
    try {
        const models = ctx.fs.dc.models;
        const { taskId } = ctx.params;

        await models.Tasks.destroy({
            where: {
                id: parseInt(taskId)
            }
        })
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            "message": "任务删除失败"
        }
    }
}

module.exports = {
    addTask,
    editTask,
    delTask,
};