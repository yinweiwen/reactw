/**
 * Created by PengLing on 2017/9/21.
 */
'use strict';

const { rejects } = require("assert");
const { resolve } = require("path");
const qiniu = require("qiniu");

let initClient = (config) => {
    let ak = config.ak
    let sk = config.sk || 'p-B0S_Xld8jLQLBRdBJvpK9-nG1dHTfyyjc8cZjL'
    let bucket = config.bucket || "wallhaven1"

    let mac = new qiniu.auth.digest.Mac(ak, sk);
    let c = new qiniu.conf.Config();
    //config.useHttpsDomain = true;
    c.zone = qiniu.zone.Zone_z0;
    let bucketManager = new qiniu.rs.BucketManager(mac, c);

    let options = {
        limit: 10,
        prefix: 'full_',
    };

    bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            //指定options里面的marker为这个值
            let nextMarker = respBody.marker;
            let commonPrefixes = respBody.commonPrefixes;
            console.log(nextMarker);
            console.log(commonPrefixes);
            let items = respBody.items;
            items.forEach(function (item) {
                console.log(item.key);
                // console.log(item.putTime);
                // console.log(item.hash);
                // console.log(item.fsize);
                // console.log(item.mimeType);
                // console.log(item.endUser);
                // console.log(item.type);
            });
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });

    return bucketManager;
};

function getMac(opts) {
    let ak = opts.ak
    let sk = opts.sk || 'p-B0S_Xld8jLQLBRdBJvpK9-nG1dHTfyyjc8cZjL'
    let mac = new qiniu.auth.digest.Mac(ak, sk);
    return mac;
}

module.exports = {
    entry: (app, router, opts) => {
        let bucketManager = initClient(opts);
        // init redis client and inject it into app(app.fs.redis)
        app.fs = app.fs || {};
        app.fs.qiniu = bucketManager;
        app.fs.qiniuMac = getMac(opts);
    }
};