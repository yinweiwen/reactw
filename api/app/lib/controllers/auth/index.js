'use strict';
const Hex = require('crypto-js/enc-hex');
const MD5 = require('crypto-js/md5');
const moment = require('moment');
const uuid = require('uuid');

async function login(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const params = ctx.request.body;
        let password = Hex.stringify(MD5(params.password));

        const userRes = await models.User.findOne({
            where: {
                username: params.username,
                password: password,
                delete: false,
            },
            attributes: { exclude: ['password'] },
            include: [{
                attributes: ["resourceId"],
                model: models.UserResource
            }]
        });

        if (!userRes) {
            ctx.status = 400;
            ctx.body = {
                "message": "账号或密码错误"
            }
        } else if (!userRes.enable) {
            ctx.status = 400;
            ctx.body = { message: "该用户已被禁用" }
        } else {
            const token = uuid.v4();

            let userRslt = Object.assign(userRes.dataValues, {
                authorized: true,
                token: token,
                userResources: userRes.userResources.map(r => r.resourceId),
            });

            await models.UserToken.create({
                token: token,
                userInfo: userRslt,
                expired: moment().add(30, 'days').format()
            });

            ctx.status = 200;
            ctx.body = userRslt;
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "登录失败"
        }
    }
}

/**
 * 微信小程序登录
 * @@requires.body {phone-手机号, password-密码} ctx 
 */
async function wxLogin(ctx, next) {
    const transaction = await ctx.fs.dc.orm.transaction();
    try {
        const models = ctx.fs.dc.models;
        const params = ctx.request.body;
        let password = Hex.stringify(MD5(params.password));
        const userRes = await models.User.findOne({
            where: {
                phone: params.phone,
                password: password,
                delete: false,
            },
            attributes: { exclude: ['password'] }
        });
        if (!userRes) {
            ctx.status = 400;
            ctx.body = { message: "手机号或密码错误" }
        } else if (!userRes.enable) {
            ctx.status = 400;
            ctx.body = { message: "该用户已被禁用" }
        } else {
            const token = uuid.v4();
            //获取用户关注区域信息
            const departmentRes = await models.Department.findOne({ where: { id: userRes.departmentId } });
            let attentionRegion = departmentRes;
            while (attentionRegion.dependence && attentionRegion.type != 1) {
                const departmentParent = await models.Department.findOne({ where: { id: attentionRegion.dependence } });
                attentionRegion = {
                    ...departmentParent.dataValues,
                    nextRegin: attentionRegion
                }
            }
            //获取用户权限信息
            const resourceRes = await models.UserResource.findAll({
                where: {
                    userId: userRes.id
                },
                include: [{
                    model: models.Resource,
                    attributes: ['code', 'name'],
                }],
                attributes: []
            });
            let userRslt = Object.assign({
                authorized: true,
                token: token,
                ...userRes.dataValues
            });
            await models.UserToken.create({
                token: token,
                userInfo: userRslt,
                expired: moment().add(30, 'day').format('YYYY-MM-DD HH:mm:ss')
            }, { transaction: transaction });
            ctx.status = 200;
            ctx.body = Object.assign({
                ...userRslt,
                userRegionType: departmentRes.type,//1-市级，2-区县级，3-乡镇级，4-村级
                attentionRegion: attentionRegion,
                resources: resourceRes.map(r => r.resource)
            });
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "登录失败"
        }
    }
}

async function logout(ctx) {
    try {
        const { token, code } = ctx.request.body;
        const models = ctx.fs.dc.models;

        await models.UserToken.destroy({
            where: {
                token: token,
            },
        });

        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "登出失败"
        }
    }
}

/**
 * 微信小程序登出
 * @request.body {token-用户登录Token} ctx 
 */
async function wxLogout(ctx) {
    try {
        const { token } = ctx.request.body;
        const models = ctx.fs.dc.models;
        await models.UserToken.destroy({
            where: {
                token: token,
            },
        });
        ctx.status = 204;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "登出失败"
        }
    }
}

module.exports = {
    login,
    wxLogin,
    logout,
    wxLogout
};