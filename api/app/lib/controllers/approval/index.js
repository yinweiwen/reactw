'use strict';

/**
 * 提交审批、驳回修改
 * body {
 * action:1驳回修改 2审批通过
 * userRegionType:提交用户所属区域级别：3乡镇级，2区县级
 * userId:提交用户id
 * rejectReasons:驳回意见
 * correctiveAction:采取措施。区县复核时提交内容
 * punishment:实施处罚，强制措施情况。区县复核时提交内容
 * } 
 */
async function submitApproval(ctx) {
    try {
        const data = ctx.request.body;
        const models = ctx.fs.dc.models;
        let oldData = await models.UserPlaceSecurityRecord.findOne({ where: { id: data.id } })
        if (oldData == null) {
            ctx.status = 400;
            ctx.body = { name: `message`, message: `该条填报数据不存在` };
        } else {
            if ((data.action == 1 || data.action == 2) && (data.userRegionType == 3 || data.userRegionType == 2)) {
                let dataSave = {}
                if (data.action == 1) {//驳回
                    dataSave = {
                        rejectManId: data.userId,
                        rejectReasons: data.rejectReasons,
                        type: false,//是否重新发起true默认false可以重新发起
                    }
                    if (data.userRegionType == 2) {//区县复核，14、15项可修改
                        dataSave.correctiveAction = data.correctiveAction;
                        dataSave.punishment = data.punishment;
                    }
                } else {//通过
                    if (data.userRegionType == 3) {
                        dataSave = {
                            audit1ManId: data.userId
                        }
                    } else {
                        dataSave = {//区县复核，14、15项可修改
                            correctiveAction: data.correctiveAction,
                            punishment: data.punishment,
                            audit2ManId: data.userId
                        }
                    }
                }
                await models.UserPlaceSecurityRecord.update(dataSave, { where: { id: data.id } });
                ctx.status = 200;
                ctx.body = { name: `message`, message: `提交成功` };
            } else {
                ctx.status = 400;
                ctx.body = { name: `message`, message: `提交数据有误` };
            }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": { name: `message`, message: `提交审批、驳回修改数据失败` }
        }
    }
}

module.exports = {
    submitApproval
};