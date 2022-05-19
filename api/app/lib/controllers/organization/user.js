'use strict';
const Hex = require('crypto-js/enc-hex');
const MD5 = require('crypto-js/md5');

async function getDepMessage (ctx, next) {
    try {
        const { fs: { api: { userInfo } } } = ctx
        const models = ctx.fs.dc.models;

        let depType1 = await models.Department.findAll({
            order: [['id', 'asc']],
            // include: [{
            //     model: models.User,
            //     required: false,
            //     where: { delete: false },
            //     attributes: { exclude: ['password'] },
            // }],
            where: {
                // type: 1,
                id: userInfo.departmentId
            },
        })

        let depRslt = []
        const getDep = async (d) => {
            let subordinate = []
            let depRes = await models.Department.findAll({
                order: [['id', 'asc']],
                // include: [{
                //     model: models.User,
                //     required: false,
                //     where: { delete: false },
                //     attributes: { exclude: ['password'] },
                // }],
                where: {
                    dependence: d.id
                },
            })
            if (depRes.length)
                for (let d of depRes) {
                    let dep = d.dataValues
                    dep.subordinate = await getDep(d.dataValues)
                    subordinate.push(dep)
                }
            return subordinate
        }
        for (let d of depType1) {
            let dep_1 = d.dataValues
            dep_1.subordinate = await getDep(d.dataValues)
            depRslt.push(dep_1)
        }

        ctx.status = 200;
        ctx.body = depRslt
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取部门信息失败"
        }
    }
}

async function getUser (ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { depId } = ctx.params
        const userRes = await models.User.findAll({
            where: {
                departmentId: parseInt(depId),
                delete: false
            },
            attributes: { exclude: ['password'] },
            order: [['id', 'asc']],
        })

        ctx.status = 200;
        ctx.body = userRes
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "获取用户信息失败"
        }
    }
}

async function creatUser (ctx, next) {
    let errMsg = "新建用户失败"
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body;

        let repeatUserNameCount = await models.User.count({
            where: {
                username: data.phone,
                delete: false
            }
        })

        if (repeatUserNameCount) {
            errMsg = '已有当前用户名'
            throw errMsg
        }

        await models.User.create({
            name: data.name,
            username: data.phone,
            password: Hex.stringify(MD5(data.password)),
            departmentId: data.departmentId,
            email: data.email,
            enable: data.enable,
            delete: false,
            phone: data.phone,
            post: data.post,
        })

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": errMsg
        }
    }
}


async function updateUser (ctx, next) {
    let errMsg = "修改用户失败"
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body;
        const { id } = ctx.params;

        let repeatUserNameCount = await models.User.count({
            where: {
                username: data.username
            }
        })

        if (repeatUserNameCount) {
            errMsg = '已有当前用户名'
            throw errMsg
        }

        await models.User.update({
            name: data.name,
            username: data.phone,
            departmentId: data.departmentId,
            email: data.email,
            enable: data.enable,
            delete: false,
            phone: data.phone,
            post: data.post,
        }, {
            where: {
                id: id
            }
        });

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": errMsg
        }
    }
}

async function deleteUser (ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { ids } = ctx.params;
        const userIds = ids.split(',');
        await models.User.update({
            delete: true,
        }, {
            where: {
                id: { $in: userIds },
            }
        });
        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "删除用户失败"
        }
    }
}

async function resetPwd (ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { id } = ctx.params;
        const data = ctx.request.body;
        await models.User.update({
            password: Hex.stringify(MD5(data.password)),
        }, {
            where: {
                id: id,
            }
        });
        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "重置用户密码失败"
        }
    }
}

/**
 * 修改用户密码
 * @params {userId-用户Id} ctx 
 * @request.body {password-用户新密码} ctx 
 */
async function updateUserPassword (ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { userId } = ctx.params;
        const { password } = ctx.request.body;
        if (!password) {
            ctx.status = 400;
            ctx.body = { "message": "请输入修改密码" };
            return;
        }
        const userRes = await models.User.findOne({
            where: {
                id: userId
            },
            attributes: ['id']
        });
        if (userRes) {
            await models.User.update({ password: Hex.stringify(MD5(password)) }, { where: { id: userId, } });
            ctx.status = 204;
        } else {
            ctx.status = 400;
            ctx.body = {
                "message": "用户不存在"
            }
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "修改用户密码失败"
        }
    }
}


module.exports = {
    getDepMessage,
    getUser,
    creatUser,
    updateUser,
    deleteUser,
    resetPwd,
    updateUserPassword
}