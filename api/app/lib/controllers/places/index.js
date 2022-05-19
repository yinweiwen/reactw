'use strict';

/**
 * 根据用户ID获取该用户创建的所有场所信息
 * @param {userId-用户ID} ctx
 */
async function getPlacesByUserId(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { userId } = ctx.params;
        let places = await models.Places.findAll({ where: { userId: userId }, attributes: ['id', 'name'] });
        ctx.status = 200;
        ctx.body = places;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "查询用户场所信息失败" }
    }
}

/**
 * 根据审批用户ID获取该审批用户范围内填报人创建的场所信息
 * @param {approveUserId-审批用户ID} ctx
 */
async function getPlacesByApproveUserId(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { approveUserId } = ctx.params;
        let approveUser = await models.User.findOne({ where: { id: approveUserId } });
        if (approveUser) {
            let whereCondition = {};
            //获取审批人管辖区域内所有用户ID
            const departmentRes = await models.Department.findOne({ where: { id: approveUser.departmentId } });
            if (departmentRes.dependence) {
                let regionType = departmentRes.type;
                if (regionType == 4) {
                    whereCondition.userId = approveUserId;
                } else {
                    let attentionRegionIds = [departmentRes.id];
                    while (attentionRegionIds.length && regionType && regionType < 4) {
                        const departmentChilds = await models.Department.findAll({ where: { dependence: { $in: attentionRegionIds } } });
                        regionType = departmentChilds.length ? departmentChilds[0].type : null;
                        attentionRegionIds = departmentChilds.map(d => d.id);
                    }
                    let users = await models.User.findAll({ where: { departmentId: { $in: attentionRegionIds } }, attributes: ['id'] });
                    if (users.length) {
                        let userIds = users.map(u => u.id);
                        whereCondition.userId = { $in: userIds };
                    } else {
                        ctx.status = 200;
                        ctx.body = [];
                        return;
                    }
                }
            }
            let places = await models.Places.findAll({ where: whereCondition, attributes: ['id', 'name'] });
            ctx.status = 200;
            ctx.body = places;
        } else {
            ctx.status = 400;
            ctx.body = { "message": "用户不存在！" }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "查询用户区域内场所信息失败" }
    }
}

/**
 * 获取所有场所信息
 */
async function getAllPlaces(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        let places = await models.Places.findAll();
        ctx.status = 200;
        ctx.body = places;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "获取场所信息失败" }
    }
}


module.exports = {
    getPlacesByUserId,
    getPlacesByApproveUserId,
    getAllPlaces
};