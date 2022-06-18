'use strict';
/*jslint node:true*/
const path = require('path');
const os = require('os');
const moment = require('moment');
const args = require('args');

const dev = process.env.NODE_ENV == 'development';

// 启动参数
args.option(['p', 'port'], '启动端口');
args.option(['g', 'pg'], 'postgre服务URL');
args.option(['f', 'fileHost'], '文件中心本地化存储: WebApi 服务器地址(必填), 该服务器提供文件上传Web服务');
args.option(['a', 'qiniuAk'], 'qiniu AK');
args.option(['s', 'qiniuSk'], 'qiniu SK');

const flags = args.parse(process.argv);

const FS_UNIAPP_DB = process.env.FS_UNIAPP_DB || flags.pg;
const FS_UNIAPP_FC_LOCAL_SVR_ORIGIN = process.env.FS_UNIAPP_FC_LOCAL_SVR_ORIGIN || flags.fileHost;
const QINIU_AK = process.env.QINIU_AK || flags.qiniuAk || 'z2qOOYBNuA1xBCS0RzJVn8jU41Nw2ZbXoUvQjMut';
const QINIU_SK = process.env.QINIU_SK || flags.qiniuSk;

if (!FS_UNIAPP_DB) {
    console.log('缺少启动参数，异常退出');
    args.showHelp();
    process.exit(-1);
}

const product = {
    port: flags.port || 8080,
    staticDirs: ['static'],
    mws: [
        {
            entry: require('@fs/attachment').entry,
            opts: {
                local: {
                    origin: FS_UNIAPP_FC_LOCAL_SVR_ORIGIN || `http://localhost:${flags.port || 8080}`,
                    rootPath: 'static',
                    childPath: 'upload',
                },
                maxSize: 104857600, // 100M
            }
        }, {
            entry: require('./app').entry,
            opts: {
                exclude: [], // 不做认证的路由，也可以使用 exclude: ["*"]  跳过所有路由
            }
        },{
            entry: require('./utils/qiniu').entry,
            opts: {
                url: "http://wallhaven.yinweiwen.cn/",
                urlThumbnail: "http://wallhaven.yinweiwen.cn/Thumbnail/",
                ak: QINIU_AK,
                sk: QINIU_SK
            }
        }
    ],
    dc: {
        url: FS_UNIAPP_DB,
        opts: {
            pool: {
                max: 80,
                min: 1,
                idle: 10000
            },
            define: {
                freezeTableName: true, // 固定表名
                timestamps: false // 不含列 "createAt"/"updateAt"/"DeleteAt"
            },
            timezone: '+08:00',
            logging: false
        },
        models: [require('./app').models]
    },
    logger: {
        level: 'info',
        json: false,
        filename: path.join(__dirname, 'log', 'runtime.log'),
        colorize: false,
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

const development = {
    port: product.port,
    staticDirs: product.staticDirs,
    mws: product.mws,
    dc: product.dc,
    logger: product.logger
};

if (dev) {
    // mws
    for (let mw of development.mws) {
        // if (mw.opts.exclude) mw.opts.exclude = ['*']; // 使用 ['*'] 跳过所有路由
    }
    // logger
    development.logger.filename = path.join(__dirname, 'log', 'development.log');
    development.logger.level = 'debug';
    development.dc.opts.logging = console.log;
}

module.exports = dev ? development : product;
