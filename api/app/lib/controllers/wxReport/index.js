'use strict';
const moment = require('moment');
//获取每日汇总
async function getDayReport(ctx) {
    try {
        const { date, areaId } = ctx.query;
        const models = ctx.fs.dc.models;
        let range = [moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss")]
        let rslt = await models.ReportCollection.findAll({
            where: {
                dateTime: {
                    $between: range
                },
                regionId: areaId
            },
            include: [{
                required: true,
                model: models.User,
                attributes: ['name', 'username', 'phone']
            }, {
                required: false,
                model: models.Department,
                attributes: ['name']
            }]
        });
        ctx.status = 200;
        ctx.body = rslt;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取全市每日汇总表失败"
        }
    }
}

//获取排查整治汇总表
async function getGovern(ctx) {
    try {
        const { date, areaId } = ctx.query;
        const models = ctx.fs.dc.models;
        let range = [moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss")]
        let rslt = await models.ReportRectify.findAndCountAll({
            where: {
                dateTime: {
                    $between: range
                },
                regionId: areaId
            },
            include: [{
                required: true,
                model: models.User,
                attributes: ['id', 'name', 'username', 'phone']
            }, {
                required: false,
                model: models.Department,
                attributes: ['id', 'name']
            }],
            limit: 1
        });
        ctx.status = 200;
        let obj = { count: 0 }
        if (rslt.count > 0) {
            obj.area = rslt.rows[0].department;
            obj.dateTime = rslt.rows[0].dateTime;
            obj.count = rslt.count;
            obj.user = rslt.rows[0].user;
            obj.isAudit = rslt.rows[0].isAudit
        }
        ctx.body = obj;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取排查整治汇总表失败"
        }
    }
}

//获取排查整治汇总详情
async function getGovernDetail(ctx) {
    try {
        const { name, date, areaId, pageSize, pageIndex } = ctx.query;
        const models = ctx.fs.dc.models;
        let range = [moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss")]
        let whereObj = {
            dateTime: {
                $between: range
            },
            regionId: areaId
        };
        if (name) {
            whereObj.name = { $like: `%${name}%` }
        }
        let findObj = {
            where: whereObj,
            include: [{
                required: true,
                model: models.User,
                attributes: ['id', 'name', 'username', 'phone']
            }, {
                required: false,
                model: models.Department,
                attributes: ['id', 'name']
            }],
            order: [['dateTime', 'desc']]
        };
        if (Number(pageSize) > 0 && Number(pageIndex) >= 0) {
            findObj.limit = Number(pageSize);
            findObj.offset = Number(pageIndex) * Number(pageSize);
        }
        let rslt = await models.ReportRectify.findAndCountAll(findObj);
        ctx.status = 200;
        ctx.body = rslt;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取排查整治汇总详情失败"
        }
    }
}

/**
 * 确认整治汇总场所数据
 * body {
 * governDetailIds:'1,2'
 * } 
 */
async function operateGovern(ctx, next) {
    try {
        const data = ctx.request.body;
        const models = ctx.fs.dc.models;
        if (data.governDetailIds && data.governDetailIds.length > 0) {
            await models.ReportRectify.update({
                isAudit: true
            }, { where: { id: { $in: data.governDetailIds.split(',') } } });

            ctx.body = { "message": "确认整治汇总下场所数据成功" };
            ctx.status = 200;
        } else {
            ctx.body = { "message": "确认参数有误" };
            ctx.status = 400;
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "确认整治汇总下场所数据失败" }
    }
}

//获取安全隐患排查详细数据列表
async function getSecurityRiskList(ctx) {
    try {
        const { name, date, areaId, pageSize, pageIndex } = ctx.query;
        const models = ctx.fs.dc.models;
        let range = [moment(date).startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment(date).endOf('day').format("YYYY-MM-DD HH:mm:ss")]
        let whereObj = {};
        if (name)
            whereObj = { name: { $like: `%${name}%` } }
        let findObj = {
            attributes: ['id', 'time', 'placeId', 'userId'],
            where: {
                time: {
                    $between: range
                },
                regionId: areaId,
                audit1ManId: { $not: null },
                audit2ManId: { $not: null }
            },
            include: [{
                required: true,
                model: models.Places,
                attributes: ['id', 'name'],
                where: whereObj
            }, {
                required: true,
                model: models.User,
                as: 'user',
                attributes: ['id', 'name', 'username', 'phone']
            }],
            order: [['time', 'desc']]
        };
        if (Number(pageSize) > 0 && Number(pageIndex) >= 0) {
            findObj.limit = Number(pageSize);
            findObj.offset = Number(pageIndex) * Number(pageSize);
        }
        let rslt = await models.UserPlaceSecurityRecord.findAndCountAll(findObj);
        ctx.status = 200;
        ctx.body = rslt;
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取安全隐患排查详细数据列表失败"
        }
    }
}


//获取待处理数量
async function getHomeCount(ctx) {
    try {
        let { userId, departmentId, userRegionType } = ctx.params;
        const models = ctx.fs.dc.models;
        const departmentRes = await models.Department.findOne({ where: { id: departmentId } });
        if (userRegionType != 2 && userRegionType != 3 && !departmentRes) {
            ctx.body = { "message": "请求参数有误" };
            ctx.status = 400;
        } else {
            //获取当前用户数据范围管辖区域内所有用户ID
            let attentionRegionIds = [departmentRes.id];
            let regionType = departmentRes.type;
            while (attentionRegionIds.length && regionType && regionType < 4) {
                const departmentChilds = await models.Department.findAll({ where: { dependence: { $in: attentionRegionIds } } });
                regionType = departmentChilds.length ? departmentChilds[0].type : null;
                attentionRegionIds = departmentChilds.map(d => d.id);
            }
            let users = await models.User.findAll({ where: { departmentId: { $in: attentionRegionIds } }, attributes: ['id'] });
            let userIds = users.map(u => u.id);

            let rslt = { recordCount: 0, reportCount: null }
            if (userIds.length) {
                let whereObj = {
                    userId: { $in: userIds },
                    rejectManId: null,
                    isDraft: false
                }
                if (userRegionType == 3) {
                    whereObj.audit1ManId = null;
                } else {
                    whereObj.audit1ManId = { $not: null };
                    whereObj.audit2ManId = null;
                }
                let recordCount = await models.UserPlaceSecurityRecord.count({
                    where: whereObj
                });
                rslt.recordCount = recordCount;
                if (userRegionType == 2) {
                    let reportCount = await models.ReportCollection.count({
                        where: {
                            userId: null,
                            regionId: departmentId
                        }
                    });
                    let reportRectify = await models.ReportRectify.findAll({
                        where: {
                            userId: null,
                            regionId: departmentId
                        }
                    });
                    let dateArr = [];
                    reportRectify.map(r => {
                        let date = moment(r.dateTime).format("YYYY-MM-DD");
                        if (!dateArr.includes(date)) {
                            dateArr.push(date)
                        }
                    })
                    rslt.reportCount = reportCount + dateArr.length;
                }
            }
            ctx.status = 200;
            ctx.body = rslt;
        }
    } catch (error) {
        console.log(error)
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取待处理数量失败"
        }
    }
}

//每日汇总表上报
async function operateReport(ctx, next) {
    try {
        let { id, userId } = ctx.params;
        const models = ctx.fs.dc.models;
        await models.ReportCollection.update({
            userId: userId
        }, { where: { id: id } });

        ctx.body = { "message": "每日汇总表上报成功" };
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "每日汇总表上报失败" }
    }
}

/**
 * 根据筛选条件获取用户审核报表信息
 * @query {
 *  approveUserId-审批人ID
 *  reportType-报表类型(1-整治汇总表,2-每日汇总表,null-整治汇总表+每日汇总表)
 *  timeRange-时间范围
 *  regionId-区域ID
 *  state-审批状态
 *  pageIndex-页码
 *  pageSize-页宽
 * } ctx
 */
async function getApproveReportCollections(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { approveUserId, reportType, timeRange, regionId, state, pageIndex, pageSize } = ctx.query;
        let whereCondition = {};
        if (approveUserId) {
            let approveUser = await models.User.findOne({ where: { id: approveUserId } });
            if (approveUser) {
                //市级用户可以看到所有报表数据
                const departmentRes = await models.Department.findOne({ where: { id: approveUser.departmentId } });
                if (departmentRes.dependence) {
                    if (departmentRes.type = 2) {
                        //区县人员只能看见自己区县下的报表信息
                        whereCondition.regionId = departmentRes.id;
                    } else {
                        //其它层级无报表信息
                        ctx.status = 200;
                        ctx.body = {
                            "count": 0,
                            "rows": []
                        };
                        return;
                    }
                }
                if (regionId) {
                    let region = await models.Department.findOne({ where: { id: regionId } });
                    if (region) {
                        if (whereCondition.regionId && whereCondition.regionId != regionId) {
                            //区县人员只能看见自己区县下的报表信息
                            ctx.status = 200;
                            ctx.body = {
                                "count": 0,
                                "rows": []
                            };
                            return;
                        } else {
                            whereCondition.regionId = regionId;
                        }
                    } else {
                        ctx.status = 400;
                        ctx.body = { "message": "区域不存在！" }
                        return;
                    }
                }
                let times = timeRange;
                if (timeRange && timeRange.indexOf(',')) { times = timeRange.split(',') }
                if (times && times.length > 0) {
                    const len = times.length;
                    whereCondition.dateTime = {
                        $between: [
                            moment(times[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                            moment(times[len - 1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                        ]
                    };
                }
                switch (Number(state)) {
                    case 1: //待审批：无审核人员
                        whereCondition.userId = null;
                        break;
                    case 2://已审批：有审核人员
                        whereCondition.userId = { $not: null };
                        break;
                    default: break;
                }
                let findObj = {
                    where: whereCondition,
                    order: [["id", "desc"]],
                    include: [{
                        model: models.User,
                        attributes: ['name', 'username', 'phone']
                    }, {
                        model: models.Department,
                        attributes: ['id', 'name']
                    }]
                };
                if (Number(pageSize) > 0 && Number(pageIndex) >= 0) {
                    findObj.limit = Number(pageSize);
                    findObj.offset = Number(pageIndex) * Number(pageSize);
                }
                switch (Number(reportType)) {
                    case 1: //整治汇总表
                        ctx.body = await models.ReportRectify.findAndCountAll(findObj);
                        break;
                    case 2://每日汇总表
                        ctx.body = await models.ReportCollection.findAndCountAll(findObj);
                        break;
                    default: //整治汇总表+每日汇总表
                        const rectifies = await models.ReportRectify.findAndCountAll(findObj);
                        const collections = await models.ReportCollection.findAndCountAll(findObj);
                        ctx.body = {
                            "totalCount": rectifies.count + collections.count,
                            "totalRows": {
                                "rectify": rectifies,
                                "collection": collections
                            }
                        };
                        break;
                }
                ctx.status = 200;
            } else {
                ctx.status = 400;
                ctx.body = { "message": "用户不存在！" }
            }
        } else {
            ctx.status = 400;
            ctx.body = { "message": "请传用户参数！" }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "获取审批报表信息失败" }
    }
}

/**
 * 上报排查整治汇总表
 * query{
 * userId:1,//上报用户
 * }
 * body {
 * governDetailIds:'1,2' //排查整治汇总返回数据id字符串
 * } 
 */
async function operateGovernReport(ctx, next) {
    try {
        let { userId } = ctx.params;
        const data = ctx.request.body;
        const models = ctx.fs.dc.models;
        if (data.governDetailIds && data.governDetailIds.length > 0) {
            await models.ReportRectify.update({
                userId: userId
            }, { where: { id: { $in: data.governDetailIds.split(',') } } });

            ctx.body = { "message": "上报排查整治汇总表成功" };
            ctx.status = 200;
        } else {
            ctx.body = { "message": "上报排查整治汇总表参数有误" };
            ctx.status = 400;
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "上报排查整治汇总表失败" }
    }
}
module.exports = {
    getDayReport,
    getGovern,
    getGovernDetail,
    operateGovern,
    getSecurityRiskList,
    getHomeCount,
    operateReport,
    getApproveReportCollections,
    operateGovernReport
};