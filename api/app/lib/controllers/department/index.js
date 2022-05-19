'use strict';

//获取南昌市下所有区县
async function getCountiesList(ctx) {
    try {
        const models = ctx.fs.dc.models;
        let rslt = await models.Department.findAll({
            where: { type: 2 },
            order: [['id', 'asc']],
        });
        ctx.status = 200;
        ctx.body = rslt;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取南昌市下所有区县失败"
        }
    }
}

module.exports = {
    getCountiesList,
};