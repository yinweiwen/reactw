/**
 * Created by rain on 2016/1/25.
 */

'use strict';
/*jslint node:true*/
const path = require('path');
/*这种以CommonJS的同步形式去引入其它模块的方式代码更加简洁:获取组件*/
const os = require('os');
const moment = require('moment');
const args = require('args');
const dev = process.env.NODE_ENV == 'development';

dev && console.log('\x1B[33m%s\x1b[0m', '请遵循并及时更新 readme.md，维护良好的开发环境，媛猿有责');
// // 启动参数
args.option(['p', 'port'], '启动端口');
args.option(['u', 'api-url'], 'webapi的URL');

const flags = args.parse(process.argv);

const FS_UNIAPP_API = process.env.FS_UNIAPP_API || flags.apiUrl;

if (!FS_UNIAPP_API) {
    console.log('缺少启动参数，异常退出');
    args.showHelp();
    process.exit(-1);
}

const product = {
    port: flags.port || 8080,
    staticDirs: [path.join(__dirname, './client')],
    mws: [{
        entry: require('./middlewares/proxy').entry,
        opts: {
            host: FS_UNIAPP_API,
            match: /^\/_api\//,
        }
    }, {
        entry: require('./routes').entry,
        opts: {
            apiUrl: FS_UNIAPP_API,
            staticRoot: './client',
        }
    }, {
        entry: require('./client').entry,// 静态信息
        opts: {}
    }],
    logger: {
        level: 'debug',
        json: false,
        filename: path.join(__dirname, 'log', 'runtime.txt'),
        colorize: true,
        maxsize: 1024 * 1024 * 5,
        rotationFormat: false,
        zippedArchive: true,
        maxFiles: 10,
        prettyPrint: true,
        label: '',
        timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        eol: os.EOL,
        tailable: true,
        depth: null,
        showLevel: true,
        maxRetries: 1
    }
};

let config;
if (dev) {
    config = {
        port: product.port,
        staticDirs: product.staticDirs,
        mws: product.mws.concat([
            {
                entry: require('./middlewares/webpack-dev').entry,
                opts: {}
            }
        ]),
        logger: product.logger
    }
    config.logger.filename = path.join(__dirname, 'log', 'development.txt');
} else {
    config = product;
}

module.exports = config;//区分开发和发布