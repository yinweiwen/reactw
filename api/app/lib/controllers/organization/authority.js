async function getResource(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        
        const res = await models.Resource.findAll({
            where: { parentResource: null },
            include: [{
                model: models.Resource,
            }]
        })

        ctx.body = res;
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询所有权限数据失败"
        }
    }
}
async function getUserResource(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { userId } = ctx.query;

        const res = await models.UserResource.findAll({
            where: { userId: userId },
            include: [{
                model: models.Resource,
            }]
        })

        ctx.body = res;
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询用户权限数据失败"
        }
    }
}

async function updateUserRes(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const { userId, resCode } = ctx.request.body;

        const res = await models.UserResource.findAll({
            attributes: ["resourceId"],
            raw: true,
            where: { userId: userId }
        })

        const addRes = resCode.filter(r => !res.some(rr => rr.resourceId == r)).map(r => { return { userId: userId, resourceId: r } });
        const delRes = res.filter(r => !resCode.includes(r.resourceId)).map(r => r.resourceId);
        addRes.length && await models.UserResource.bulkCreate(addRes, { transaction: transaction });
        delRes.length && await models.UserResource.destroy({
            where: {
                resourceId: { $in: delRes },
                userId: userId
            },
            transaction: transaction
        })

        ctx.status = 204;
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "更新用户权限数据失败"
        }
    }
}

module.exports = {
    getResource,
    getUserResource,
    updateUserRes
};