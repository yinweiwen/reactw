/**
 * User: liuxinyi/liu.xinyi@free-sun.com.cn
 * Date: 2016/2/22
 * Time: 15:29
 *
 */
'use strict';

const views = require('koa-view');
const path = require('path');
module.exports = {
    entry: function (app, router, opt) {
        app.use(views(__dirname));

        router.get('(.*)', async function (ctx){
            await ctx.render(path.join(__dirname, './index'));
        });
    }
};