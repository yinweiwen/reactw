/**
 * Created by PengPeng on 2017/4/26.
 */
'use strict';

const moment = require('moment');
const pathToRegexp = require('path-to-regexp');

function factory(app, opts) {
    async function sendToEsAsync(producer, payloads) {
        return new Promise((resolve, reject) => {
            producer.send(payloads, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }

    async function logger(ctx, next) {
        const { path, method } = ctx;
        const start = Date.now();

        // 等待路由处理
        await next();

        try {
            let logAttr = null;
            for (let prop in app.fs.api.logAttr) {
                let keys = [];
                let re = pathToRegexp(prop.replace(/\:[A-Za-z_\-]+\b/g, '(\\d+)'), keys);
                if (re.test(`${method}${path}`)) {
                    logAttr = app.fs.api.logAttr[prop];
                    break;
                }
            }
            let parameter = null, parameterShow = null, user_id, _token, app_key;
            if (ctx.fs.api) {
                const { actionParameter, actionParameterShow, userId, token, appKey } = ctx.fs.api;
                parameter = actionParameter;
                parameterShow = actionParameterShow;
                user_id = userId;
                _token = token;
                app_key = appKey;
            }
            const producer = ctx.fs.kafka.producer;

            const message = {
                log_time: moment().toISOString(),
                method: method,
                content: logAttr ? logAttr.content : '',
                parameter: JSON.stringify(parameter) || JSON.stringify(ctx.request.body),
                parameter_show: parameterShow,
                visible: logAttr ? logAttr.visible : true,
                cost: Date.now() - start,
                status_code: ctx.status,
                url: ctx.request.url,
                user_agent: ctx.request.headers["user-agent"],
                user_id: user_id,
                session: _token,
                app_key: app_key,
                header: JSON.stringify(ctx.request.headers),
                ip: ctx.request.headers["x-real-ip"] || ctx.ip
            };

            const payloads = [{
                topic: `${opts.kafka.topicPrefix}`,
                messages: [JSON.stringify(message)],
                partition: 0
            }];

            await sendToEsAsync(producer, payloads);

        } catch (e) {
            ctx.fs.logger.error(`日志记录失败: ${e}`);
        }
    }
    return logger;
}

module.exports = factory;
