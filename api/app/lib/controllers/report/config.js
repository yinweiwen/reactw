async function getAreas (ctx, next) {
    try {
        const { fs: { api: { userInfo } } } = ctx
        const models = ctx.fs.dc.models;

        let userDepRes = await models.Department.findOne({
            order: [['id', 'asc']],
            where: {
                id: userInfo.departmentId
            },
        })

        let rslt = []
        if (userDepRes) {
            if (userDepRes.dataValues.type == 1) {
                rslt = await models.Department.findAll({
                    order: [['id', 'asc']],
                    where: {
                        type: 2
                    }
                })
            } else if (userDepRes.dataValues.type == 2) {
                rslt = [userDepRes.dataValues]
            }
        }

        ctx.body = rslt;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询区域数据失败"
        }
    }
}

async function addReportConfig (ctx) {
    let errMsg = "添加报表配置失败"
    try {
        const data = ctx.request.body
        const models = ctx.fs.dc.models;

        const repeatRes = await models.ReportConfigition.find({
            where: {
                regionId: data.regionId,
                reportTypeId: data.reportTypeId,
                excuteTime: data.excuteTime,
            }
        })

        if (repeatRes) {
            errMsg = '已有相同配置信息';
            throw errMsg
        }

        const res = await models.ReportConfigition.create(data)

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": errMsg
        }
    }
}

async function getReportConfig (ctx) {
    try {
        const { fs: { api: { userInfo } } } = ctx
        const models = ctx.fs.dc.models;

        // 查找自己所属的区县数据 type == 2

        let userDepRes = await models.Department.findOne({
            order: [['id', 'asc']],
            where: {
                id: userInfo.departmentId
            },
        })
        let depRes = []
        if (userDepRes.dataValues.type == 1) {
            depRes = await models.Department.findAll({
                where: {
                    type: 2,
                }
            })
        } else if (userDepRes.dataValues.type == 2) {
            depRes = [userDepRes]
        }

        const res = await models.ReportConfigition.findAll({
            where: {
                regionId: { $in: depRes.map(d => d.dataValues.id) }
            }
        })

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取报表配置失败"
        }
    }
}

async function editReportConfig (ctx) {
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body
        const { reportId } = ctx.params

        const repeatRes = await models.ReportConfigition.find({
            where: {
                id: { $ne: parseInt(reportId) },
                regionId: data.regionId,
                reportTypeId: data.reportTypeId,
                excuteTime: data.excuteTime,
            }
        })

        if (repeatRes) {
            errMsg = '已有相同配置信息';
            throw errMsg
        }

        await models.ReportConfigition.update(data, {
            where: {
                id: parseInt(reportId)
            }
        })

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "编辑报表配置失败"
        }
    }
}

async function delReportConfig (ctx) {
    try {
        const models = ctx.fs.dc.models;
        const { reportId } = ctx.params
        await models.ReportConfigition.destroy({
            where: {
                id: parseInt(reportId)
            }
        })

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "删除报表配置失败"
        }
    }
}

module.exports = {
    getAreas,
    addReportConfig,
    getReportConfig,
    editReportConfig,
    delReportConfig,
};