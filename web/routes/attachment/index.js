'use strict';
const request = require('superagent');
const parse = require('async-busboy');
const path = require('path')
const fs = require('fs');

const ext = {
    project: [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"],
    report: [".doc", ".docx", ".xls", ".xlsx", ".pdf"],
    data: [".txt", ".xls", ".xlsx"],
    image: [".png", ".jpg", ".svg"],
    three: [".js"],
    video: [".mp4"],
    bpmn: [".bpmn", ".bpmn20.xml", ".zip", ".bar"],
    app: [".apk"]
}

module.exports = {
    entry: function (app, router, opts) {

        const getApiRoot = async function (ctx) {
            const { apiUrl } = opts;

            ctx.status = 200;
            ctx.body = { root: apiUrl };
        };

        let upload = async function (ctx, next) {
            try {
                const { files } = await parse(ctx.req);
                const file = files[0];
                const extname = path.extname(file.filename).toLowerCase();
                const fileType = ctx.query.type || "image";
                const fileFolder = ctx.query.fileFolder || 'common';
                if (ext[fileType].indexOf(extname) < 0) {
                    ctx.status = 400;
                    ctx.body = JSON.stringify({ name: 'UploadFailed', message: '文件格式无效' });
                    return;
                }
                const date = new Date().toLocaleDateString();
                const time = new Date().getTime();
                let fileName = time + '_' + file.filename;
                let saveFile = path.join(__dirname, '../../', `/client/assets/files/${fileFolder}`, fileName);
                const pathUrl = `./client/assets/files/${fileFolder}`;

                const res1 = fs.existsSync(`./client/assets/files/${fileFolder}`);
                !res1 && fs.mkdirSync(`./client/assets/files/${fileFolder}`);
                const res = fs.existsSync(pathUrl);
                !res && fs.mkdirSync(pathUrl);
                let stream = fs.createWriteStream(saveFile);
                fs.createReadStream(file.path).pipe(stream);
                stream.on('error', function (err) {
                    app.fs.logger.log('error', '[Upload Heatmap]', err);
                });
                ctx.status = 200;
                ctx.body = { filename: path.join(`/assets/files/${fileFolder}`, fileName), name: 'UploadSuccess', message: '上传成功' };
            } catch (err) {
                ctx.status = 500;
                ctx.fs.logger.error(err);
                ctx.body = { err: 'upload error.' };
            }
        }

        let remove = async function (ctx, next) {
            try {
                const fkeys = ctx.request.body;
                let removeUrl = path.join(__dirname, '../../', './client', fkeys.url);
                const res = fs.existsSync(removeUrl);
                if (!res) {
                    ctx.status = 400;
                    ctx.body = JSON.stringify({ name: 'DeleteFailed', message: '文件地址不存在' });
                    return;
                }
                fs.unlink(removeUrl, function (error) {
                    if (error) {
                        console.log(error);
                    }
                })
                ctx.status = 200;
                ctx.body = { name: 'DeleteSuccess.', message: '删除成功' };
            } catch (err) {
                ctx.status = 500;
                ctx.fs.logger.error(err);
                ctx.body = { err: 'upload cleanup error.' };
            }
        }

        router.get('/api/root', getApiRoot);
        router.post('/_upload/new', upload);
        router.delete('/_upload/cleanup', remove);
    }
};
