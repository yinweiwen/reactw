const moment = require('moment');

async function getList(ctx, next) {
    try {
        const { userInfo } = ctx.fs.api;
        console.log(userInfo);
        const { prefix, total, marker } = ctx.query;

        let res = await syncListQiniu(ctx.app.fs.qiniu, prefix, total, marker)

        ctx.body = res;
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path:${ctx.path},error:${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询图片列表失败"
        };
    }
}

async function delQiniuPic(ctx) {
    try {
        const data = ctx.request.body

        const ret = await syncDelQiniu(ctx.app.fs.qiniu, data.key)

        ctx.body = ret.msg;
        ctx.status = ret.code;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "删除失败"
        }
    }
}



function syncListQiniu(qiniu, prefix, total, marker) {
    return new Promise((resolve, reject) => {
        prefix = prefix || "Thumbnail/"
        total = total || 30
        listqiniu(qiniu, resolve, prefix, total, null, marker)
    })
}

function syncDelQiniu(qiniu, key) {
    return new Promise((resolve, reject) => {
        const bucket = "wallhaven1"
        qiniu.delete(bucket, key, function (err, respBody, respInfo) {
            if (err) {
                reject({ code: 500, msg: err });
            } else {
                resolve({ code: respInfo.statusCode, msg: respBody });
            }
        });
    })
}

function listqiniu(qiniu, resolve, prefix, total, arr, mark) {
    let options = {
        limit: 10, // page
        prefix: prefix,
        marker: mark
    };
    const bucket = "wallhaven1"
    arr = arr || []
    qiniu.listPrefix(bucket, options, function (err, respBody, respInfo) {
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
            let items = respBody.items.filter(i => {
                return i.key.substring(i.key.length - 1) != "/"
            });
            arr = arr.concat(items)
            if (arr.length >= total) {
                resolve({
                    marker: nextMarker,
                    arr
                })
            } else {
                listqiniu(qiniu, resolve, prefix, total, arr, nextMarker)
            }
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            reject()
        }
    });
}

module.exports = {
    getList,
    delQiniuPic,
};