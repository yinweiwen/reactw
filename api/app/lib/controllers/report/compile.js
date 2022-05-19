const moment = require('moment')

async function getReportRectify(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { fs: { api: { userInfo } } } = ctx
        const { startTime, endTime } = ctx.query
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

        let rectifyReportList = []

        let calDay = moment(startTime).startOf('day')
        let endDay = moment(endTime).endOf('day')
        let today = moment().endOf('day')
        while (calDay.isBefore(endDay) && calDay.isBefore(today)) {
            let curDay_ = calDay.clone();
            for (let d of depRes) {
                let reportCount = await models.ReportRectify.count({
                    where: {
                        regionId: d.dataValues.id,
                        userId:{$not:null},
                        dateTime: {
                            $between: [
                                curDay_.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                                curDay_.endOf('day').format('YYYY-MM-DD HH:mm:ss')
                            ]
                        }
                    }
                })
                let detailCount = await models.ReportRectify.count({
                    where: {
                        regionId: d.dataValues.id,
                        dateTime: {
                            $between: [
                                curDay_.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                                curDay_.endOf('day').format('YYYY-MM-DD HH:mm:ss')
                            ]
                        }
                    }
                })
                if (detailCount > 0)
                    rectifyReportList.push({
                        day: calDay.format('YYYY-MM-DD'),
                        region: d.dataValues.name,
                        name: d.dataValues.name + '合用场所安全隐患排查整治汇总表',
                        reportBool: reportCount > 0,
                        depId: d.id,
                    })
            }

            calDay.add(1, 'day')
        }

        ctx.body = rectifyReportList;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取合用场所安全隐患排查整治汇总表列表失败"
        }
    }
}

async function getReportRectifyDetail(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { day, depId } = ctx.query

        let searchDay = moment(day)
        let reportRes = await models.ReportRectify.findAll({
            where: {
                regionId: depId,
                dateTime: {
                    $between: [
                        searchDay.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                        searchDay.endOf('day').format('YYYY-MM-DD HH:mm:ss')
                    ]
                }
            }
        })

        ctx.body = reportRes;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取合用场所安全隐患排查整治汇总表详情失败"
        }
    }
}

async function compileReportRectifyDetail(ctx, next) {
    const t = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body
        for (let d of data) {
            await models.ReportRectify.update(d, {
                transaction: t,
                where: {
                    id: d.id
                }
            })
        }
        await t.commit();
        ctx.status = 204;
    } catch (error) {
        await t.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "保存合用场所安全隐患排查整治汇总表详情失败"
        }
    }
}

module.exports = {
    getReportRectify,
    getReportRectifyDetail,
    compileReportRectifyDetail,
};