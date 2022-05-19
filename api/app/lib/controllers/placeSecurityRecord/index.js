'use strict';
const moment = require('moment');

/**
 * 提交填报信息/保存填报草稿
 * @requires.body {
 * isDraft-是否草稿
 * userId-用户id，填报人
 * placeName-场所id
 * placeType-场所性质
 * regionId-所属县/区
 * address-场所地址
 * placeOwner-场所负责人
 * phone-负责人手机号
 * dimension-面积
 * floors-多少层
 * numberOfPeople-常住人数
 * location-经纬度
 * isEnable-是否为合用场所
 * localtionDescribe-经纬度定位描述
 * hiddenDangerItem12-12项隐患信息,格式：[{
 *      itemIndex-隐患项序号,
 *      value-是否存在隐患,
 *      description-隐患具体信息描述,
 *      photos-隐患图片(多张图片以 , 隔开)"
 *  }],
 * description-存在具体问题描述
 * correctiveAction-采取整改措施
 * punishment-实施处罚，强制措施情况
 * } ctx 
 */
async function addPlaceSecurityRecord(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const body = ctx.request.body;
        let ifRightRegion = true;
        if (body.regionId) {
            //判断填报信息所属乡镇/区县是否存在
            let region = await models.Department.findOne({ where: { id: body.regionId } });
            if (!region) {
                ifRightRegion = false;
            }
        }
        if (ifRightRegion) {
            let placeId = null;
            if (body.placeName) {
                //判断“场所名称”是否存在，不存在则“新建场所”
                let place = await models.Places.findOne({ where: { name: body.placeName, userId: ctx.fs.api.userId } });
                if (place) {
                    placeId = place.id
                } else {
                    const newPlace = await models.Places.create({
                        name: body.placeName,
                        userId: ctx.fs.api.userId
                    }, { transaction: transaction });
                    placeId = newPlace.id;
                }
            }
            //创建填报信息/填报草稿
            const userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.create({
                isDraft: body.isDraft,//是否草稿
                userId: ctx.fs.api.userId,//用户id，填报人
                time: moment(),//录入时间
                placeId: placeId,//场所id
                placeType: body.placeType,//场所性质
                regionId: body.regionId,//所属县/区
                address: body.address,//场所地址
                placeOwner: body.placeOwner,//场所负责人
                phone: body.phone,//负责人手机号
                dimension: body.dimension,//面积
                floors: body.floors,//多少层
                numberOfPeople: body.numberOfPeople,//常住人数
                location: body.location,//经纬度
                isEnable: body.isEnable,//是否为合用场所
                localtionDescribe: body.localtionDescribe,//经纬度定位描述
                hiddenDangerItem12: body.hiddenDangerItem12,//12项隐患信息
                description: body.description,//存在具体问题描述
                correctiveAction: body.correctiveAction,//采取措施
                type: true,//是否重新发起true默认false可以重新发起
                punishment: body.punishment//实施处罚，强制措施情况
            }, { transaction: transaction });
            ctx.body = {
                id: userPlaceSecurityRecord.id,
                "message": "新增填报信息成功"
            };
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = {
                "message": "所选地址不存在！"
            }
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "新增填报信息失败"
        }
    }
}

/**
 * 编辑填报信息
 * @param {id-填报信息ID} ctx
 * @requires.body {
 * isDraft-是否草稿
 * userId-用户id，填报人
 * placeName-场所id
 * placeType-场所性质
 * regionId-所属县/区
 * address-场所地址
 * placeOwner-场所负责人
 * phone-负责人手机号
 * dimension-面积
 * floors-多少层
 * numberOfPeople-常住人数
 * location-经纬度
 * isEnable-是否为合用场所
 * localtionDescribe-经纬度定位描述
 * hiddenDangerItem12-12项隐患信息,格式：[{
 *      itemIndex-隐患项序号,
 *      value-是否存在隐患,
 *      description-隐患具体信息描述,
 *      photos-隐患图片(多张图片以 , 隔开)"
 *  }],
 * description-存在具体问题描述
 * correctiveAction-采取整改措施
 * punishment-实施处罚，强制措施情况
 * } ctx 
 */
async function editPlaceSecurityRecord(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const { id } = ctx.params;
        //判断该填报信息是否存在
        let userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.findOne({ where: { id: id } });
        if (userPlaceSecurityRecord) {
            const body = ctx.request.body;
            let ifRightRegion = true;
            if (body.regionId) {
                //判断填报信息所属乡镇/区县是否存在
                let region = await models.Department.findOne({ where: { id: body.regionId } });
                if (!region) {
                    ifRightRegion = false;
                }
            }
            if (ifRightRegion) {
                let placeId = null;
                if (body.placeName) {
                    //判断“场所名称”是否存在，不存在则“新建场所”
                    let place = await models.Places.findOne({ where: { name: body.placeName, userId: ctx.fs.api.userId } });
                    if (place) {
                        placeId = place.id
                    } else {
                        const newPlace = await models.Places.create({
                            name: body.placeName,
                            userId: ctx.fs.api.userId
                        }, { transaction: transaction });
                        placeId = newPlace.id;
                    }
                }
                //修改填报信息
                await models.UserPlaceSecurityRecord.update({
                    isDraft: body.isDraft,//是否草稿
                    userId: ctx.fs.api.userId,//用户id，填报人
                    time: moment(),//录入时间
                    placeId: placeId,//场所id
                    placeType: body.placeType,//场所性质
                    regionId: body.regionId,//所属县/区
                    address: body.address,//场所地址
                    placeOwner: body.placeOwner,//场所负责人
                    phone: body.phone,//负责人手机号
                    dimension: body.dimension,//面积
                    floors: body.floors,//多少层
                    numberOfPeople: body.numberOfPeople,//常住人数
                    location: body.location,//经纬度
                    isEnable: body.isEnable,//是否为合用场所
                    localtionDescribe: body.localtionDescribe,//经纬度定位描述
                    hiddenDangerItem12: body.hiddenDangerItem12,//12项隐患信息
                    description: body.description,//存在具体问题描述
                    correctiveAction: body.correctiveAction,//采取措施
                    punishment: body.punishment//实施处罚，强制措施情况
                }, { where: { id: id, }, transaction: transaction });
                ctx.body = { "message": "修改填报信息成功" };
                ctx.status = 200;
            } else {
                ctx.status = 400;
                ctx.body = { "message": "所选地址不存在！" }
            }
        } else {
            ctx.status = 400;
            ctx.body = { "message": "该填报信息不存在！" }
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "修改填报信息失败" }
    }
}

/**
 * 修改type字段
 * @param {*} ctx 
 * @param {*} next 
 */
async function updateType(ctx, next) {
    const models = ctx.fs.dc.models;
    const { id } = ctx.params;
    try {
        await models.UserPlaceSecurityRecord.update({
            type: true,//是否重新发起true默认false可以重新发起
        }, { where: { id: id, }})
        ctx.body = { "message": "修改信息成功" };
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "修改信息失败" }
    }
}

/**
 * 删除填报信息
 * @param {id-填报信息ID} ctx
 */
async function deletePlaceSecurityRecord(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const { id } = ctx.params;
        //判断该填报信息是否存在
        let userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.findOne({ where: { id: id } });
        if (userPlaceSecurityRecord) {
            await models.UserPlaceSecurityRecord.destroy({ where: { id: id }, transaction: transaction });
            ctx.body = { "message": "删除填报信息成功" };
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = { "message": "该填报信息不存在！" }
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "删除填报信息失败" }
    }
}

/**
 * 根据填报信息ID查询填报信息
 * @param {id-填报信息ID} ctx
 */
async function getPlaceSecurityRecordById(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { id } = ctx.params;
        //判断该填报信息是否存在
        let userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.findOne({ where: { id: id } });
        if (userPlaceSecurityRecord) {
            let userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.findOne({
                where: { id: id },
                include: [{
                    model: models.Places,
                }, {
                    model: models.User,
                    as: 'user',
                    attributes: ['id', 'name', 'username', 'phone']
                }, {
                    model: models.User,
                    as: 'audit1ManUser',
                    attributes: ['id', 'name', 'username', 'phone']
                }, {
                    model: models.User,
                    as: 'audit2ManUser',
                    attributes: ['id', 'name', 'username', 'phone']
                }, {
                    model: models.User,
                    as: 'rejectManUser',
                    attributes: ['id', 'name', 'username', 'phone']
                }]
            });
            ctx.body = userPlaceSecurityRecord;
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = { "message": "该填报信息不存在！" }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "查询填报信息失败" }
    }
}

/**
 * 根据场所ID获取该场所最近用户填报信息
 * @param {placeId-场所信息ID} ctx
 */
async function getRecentlyPlaceSecurityRecordByPlaceId(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { placeId } = ctx.params;
        //判断该场所信息是否存在
        let place = await models.Places.findOne({ where: { id: placeId } });
        if (place) {
            let userPlaceSecurityRecord = await models.UserPlaceSecurityRecord.findAll({
                where: { placeId: placeId, userId: place.userId },
                include: [{
                    model: models.Places,
                }],
                limit: 1,
                order: [["id", "desc"]],
            });
            ctx.status = 200;
            ctx.body = userPlaceSecurityRecord.length ? userPlaceSecurityRecord[0] : null;
        } else {
            ctx.status = 400;
            ctx.body = { "message": "该场所不存在！" }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "获取场所最近用户填报信息失败" }
    }
}

/**
 * 根据筛选条件获取用户填报信息
 * @query {
 *  isDraft-是否草稿
 *  userId-用户ID
 *  timeRange-录入时间范围
 *  regionId-区域ID
 *  placeId-场所ID
 *  state-审批状态
 *  pageIndex-页码
 *  pageSize-页宽
 * } ctx
 */
async function getPlaceSecurityRecords(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { isDraft, userId, timeRange, regionId, placeId, state, pageIndex, pageSize } = ctx.query;
        let whereCondition = {};
        if (userId) {
            let user = await models.User.findOne({ where: { id: userId } });
            if (user) {
                whereCondition.userId = userId;
            } else {
                ctx.status = 400;
                ctx.body = { "message": "用户不存在！" }
                return;
            }
        }
        if (regionId) {
            let region = await models.Department.findOne({ where: { id: regionId } });
            if (region) {
                whereCondition.regionId = regionId;
            } else {
                ctx.status = 400;
                ctx.body = { "message": "区域不存在！" }
                return;
            }
        }
        if (placeId) {
            let place = await models.Places.findOne({ where: { id: placeId } });
            if (place) {
                whereCondition.placeId = placeId;
            } else {
                ctx.status = 400;
                ctx.body = { "message": "场所不存在！" };
                return;
            }
        }
        if (isDraft) { whereCondition.isDraft = isDraft; }
        let times = timeRange;
        if (timeRange && timeRange.indexOf(',')) { times = timeRange.split(',') }
        if (times && times.length > 0) {
            const len = times.length;
            whereCondition.time = {
                $between: [
                    moment(times[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                    moment(times[len - 1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                ]
            };
        }
        switch (Number(state)) {
            case 1: //待审批：未审核 或者 已审核+未复核
                whereCondition.$or = [
                    { '$audit1ManId$': null },
                    { '$audit2ManId$': null }
                ];
                whereCondition.rejectManId = null;
                break;
            case 2://已审批：已审批+已复核
                whereCondition.audit1ManId = { $not: null };
                whereCondition.audit2ManId = { $not: null };
                break;
            case 3: //驳回
                whereCondition.rejectManId = { $not: null };
                break;
            default: break;
        }
        let findObj = {
            where: whereCondition,
            order: [["id", "desc"]],
            include: [{
                model: models.Places,
            }, {
                model: models.User,
                as: 'user',
                attributes: ['id', 'name', 'username', 'phone']
            }, {
                model: models.User,
                as: 'audit1ManUser',
                attributes: ['id', 'name', 'username', 'phone']
            }, {
                model: models.User,
                as: 'audit2ManUser',
                attributes: ['id', 'name', 'username', 'phone']
            }, {
                model: models.User,
                as: 'rejectManUser',
                attributes: ['id', 'name', 'username', 'phone']
            }]
        };
        if (Number(pageSize) > 0 && Number(pageIndex) >= 0) {
            findObj.limit = Number(pageSize);
            findObj.offset = Number(pageIndex) * Number(pageSize);
        }
        let userPlaceSecurityRecords = await models.UserPlaceSecurityRecord.findAndCountAll(findObj);
        ctx.status = 200;
        ctx.body = userPlaceSecurityRecords;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = { "message": "获取用户填报信息失败" }
    }
}

/**
 * 根据筛选条件获取用户审批填报信息
 * @query {
 *  approveUserId-审批人ID
 *  timeRange-录入时间范围
 *  regionId-区域ID
 *  placeId-场所ID
 *  state-审批状态
 *  pageIndex-页码
 *  pageSize-页宽
 * } ctx
 */
async function getApprovePlaceSecurityRecords(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { approveUserId, timeRange, regionId, placeId, state, pageIndex, pageSize } = ctx.query;
        let whereCondition = { isDraft: false };
        if (approveUserId) {
            let approveUser = await models.User.findOne({ where: { id: approveUserId } });
            if (approveUser) {
                //获取审批人管辖区域内所有用户ID（注：市级人员查看所有用户数据）
                const departmentRes = await models.Department.findOne({ where: { id: approveUser.departmentId } });
                if (departmentRes.dependence) {
                    let attentionRegionIds = [departmentRes.id];
                    let regionType = departmentRes.type;
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
                        ctx.body = {
                            "count": 0,
                            "rows": []
                        }
                        return;
                    }
                }
                if (regionId) {
                    let region = await models.Department.findOne({ where: { id: regionId } });
                    if (region) {
                        whereCondition.regionId = regionId;
                    } else {
                        ctx.status = 400;
                        ctx.body = { "message": "区域不存在！" }
                        return;
                    }
                }
                if (placeId) {
                    let place = await models.Places.findOne({ where: { id: placeId } });
                    if (place) {
                        whereCondition.placeId = placeId;
                    } else {
                        ctx.status = 400;
                        ctx.body = { "message": "场所不存在！" };
                        return;
                    }
                }
                let times = timeRange;
                if (timeRange && timeRange.indexOf(',')) { times = timeRange.split(',') }
                if (times && times.length > 0) {
                    const len = times.length;
                    whereCondition.time = {
                        $between: [
                            moment(times[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                            moment(times[len - 1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                        ]
                    };
                }
                switch (Number(state)) {
                    case 1: //待审批
                        if (departmentRes.type == 2) {
                            //区县待审：已审核+未复核
                            whereCondition.audit1ManId = { $not: null };
                            whereCondition.audit2ManId = null;
                        } else {
                            //乡镇待审：未审核+未复核
                            whereCondition.audit1ManId = null;
                            whereCondition.audit2ManId = null;
                        }
                        whereCondition.rejectManId = null;
                        break;
                    case 2://已审批：
                        if (departmentRes.type == 3) {
                            //乡镇已审：已审核
                            whereCondition.audit1ManId = { $not: null };
                        } else {
                            //区域已审：已审批+已复核
                            whereCondition.audit1ManId = { $not: null };
                            whereCondition.audit2ManId = { $not: null };
                        }
                        whereCondition.rejectManId = null;
                        break;
                    case 3: //驳回
                        whereCondition.rejectManId = { $not: null };
                        break;
                    default:
                        if (departmentRes.type == 2) {
                            //区县查看数据：去除未审核
                            whereCondition.audit1ManId = { $not: null };
                        }
                        break;
                }
                let findObj = {
                    where: whereCondition,
                    include: [{
                        model: models.Places,
                    }, {
                        model: models.User,
                        as: 'user',
                        attributes: ['id', 'name', 'username', 'phone']
                    }, {
                        model: models.User,
                        as: 'audit1ManUser',
                        attributes: ['id', 'name', 'username', 'phone']
                    }, {
                        model: models.User,
                        as: 'audit2ManUser',
                        attributes: ['id', 'name', 'username', 'phone']
                    }, {
                        model: models.User,
                        as: 'rejectManUser',
                        attributes: ['id', 'name', 'username', 'phone']
                    }],
                    order: [["id", "desc"]]
                };
                if (Number(pageSize) > 0 && Number(pageIndex) >= 0) {
                    findObj.limit = Number(pageSize);
                    findObj.offset = Number(pageIndex) * Number(pageSize);
                }
                let userPlaceSecurityRecords = await models.UserPlaceSecurityRecord.findAndCountAll(findObj);
                ctx.status = 200;
                ctx.body = userPlaceSecurityRecords;
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
        ctx.body = { "message": "获取用户填报信息失败" }
    }
}

module.exports = {
    addPlaceSecurityRecord,
    editPlaceSecurityRecord,
    deletePlaceSecurityRecord,
    getPlaceSecurityRecordById,
    getRecentlyPlaceSecurityRecordByPlaceId,
    getPlaceSecurityRecords,
    getApprovePlaceSecurityRecords,
    updateType
};