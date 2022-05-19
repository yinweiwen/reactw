const moment = require('moment');
async function getReportList (ctx, next) {
    try {
        const { fs: { api: { userInfo } } } = ctx
        const models = ctx.fs.dc.models;
        const { creatTime, reportName, regionName, limit, offset } = ctx.query;

        let where = {};
        if (creatTime) {
            where.creatTime = {
                $gte: moment(creatTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                $lte: moment(creatTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
        }

        if (reportName) {
            where.reportName = {
                $iLike: `%${reportName}%`
            }
        }

        if (regionName && regionName != -1) {
            where.regionId = regionName
        } else {
            let userDepRes = await models.Department.findOne({
                order: [['id', 'asc']],
                where: {
                    id: userInfo.departmentId
                },
            })

            let userDep = []
            if (userDepRes) {
                if (userDepRes.dataValues.type == 1) {
                    userDep = await models.Department.findAll({
                        order: [['id', 'asc']],
                        where: {
                            type: 2
                        }
                    })
                } else if (userDepRes.dataValues.type == 2) {
                    userDep = [userDepRes]
                }
            }
            where.regionId = { $in: userDep.map(u => u.dataValues.id) }
        }

        let findObj = {
            include: [{
                model: models.ReportType,
                attributes: ['name']
            }, {
                model: models.Department,
                attributes: ['name']
            }],
            where: where,
            order: [['creatTime', 'desc']],
        };

        if (Number(limit) > 0 && Number(offset) >= 0) {
            findObj.limit = Number(limit);
            findObj.offset = Number(offset);
        }

        const res = await models.ReportDownManage.findAndCountAll(findObj)

        ctx.body = res;
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询报表数据失败"
        }
    }
}



module.exports = {
    getReportList,
};