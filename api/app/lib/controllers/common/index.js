//获取固化数据接口
async function getDataDictionary(ctx) {
    try {
        const models = ctx.fs.dc.models;
        const { model } = ctx.params;
        const { where, attributes, order } = ctx.query;
        let findObj = {};
        if (where) {
            let whereJson = JSON.parse(where);
            findObj.where = whereJson;
        }
        if (order) {
            findObj.order = [JSON.parse(order)];
        }
        if (attributes) {
            attributes = attributes.split(',');
        }
        let rslt = await models[model].findAll(findObj);
        ctx.status = 200;
        ctx.body = rslt;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取数据字典失败"
        }
    }
}
//基础修改接口
async function putDataDictionary(ctx) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        let errMsg = "修改失败";

        const { model } = ctx.params;
        const { where, dataToSave } = ctx.request.body;

        const oldData = await models[model].findOne({ where: where });
        if (oldData) {
            await models[model].update(dataToSave, { where: where, transaction });
        } else {
            errMsg = "未找到需要修改的数据";
            ctx.throw(400)
        }
        ctx.status = 204;
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": errMsg
        }
    }
}

module.exports = {
    getDataDictionary,
    putDataDictionary
};