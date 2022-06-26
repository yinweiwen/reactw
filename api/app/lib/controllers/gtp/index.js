const moment = require('moment');
const qiniu = require('qiniu');

// router.post(“/”, async (req, res) => {
//     try {
//     const newEvent = await Event.create(req.body);
//     let myDate = moment(req.body.date).format(“YYYY-MM-DD”);
//     Room.findByPk(req.body.roomId).then(room => {
//     room.sequelize.query(
//     `UPDATE Rooms SET booked = ‘{${[
//     room.booked,
//     myDate
//     ]}}’ WHERE id= ${room.id}`
//     );
//     });
//     res.json(newEvent);
//     } catch (error) {
//     res.send(error);
//     }
//     });

// User.update(
//     {library: Sequelize.fn('array_append', Sequelize.col('library'), req.body._isbn)},
//     {where: {fb_id: req.user.fb_id}}
//    );

async function addGtp(ctx, next) {
    try {
        const { userInfo } = ctx.fs.api;
        const data = ctx.request.body;
        const models = ctx.fs.dc.models;
        if (userInfo)
            data.user = userInfo.id
        else data.user = 1
        ctx.body = await models.Gtps.create(data);
        ctx.status = 200;

    } catch (error) {
        console.log(error)
        ctx.status = 400;
        ctx.body = {
            "message": "新增吉他谱失败"
        }
    }
}

async function editGtp(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const data = ctx.request.body;
        const { gtpid } = ctx.params;

        await models.Gtps.update(data, {
            where: {
                id: parseInt(gtpid)
            }
        })
        ctx.status = 204
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "编辑失败"
        }
    }
}

var qiniuToken = null;
var tokenValid = new moment(0);
async function getQiniuToken(ctx, next) {
    try {
        let bucket = "guita"
        let options = {
            scope: bucket,
            expires: 7200 //s
        };
        let putPolicy = new qiniu.rs.PutPolicy(options);
        qiniuToken = putPolicy.uploadToken(ctx.app.fs.qiniuMac);

        ctx.body = { token: qiniuToken };
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "get qiniu token error!"
        }
    }
}

async function getGtp(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { gtpid } = ctx.params
        ctx.body = await models.Gtps.find({
            where: {
                id: gtpid
            }
        });
        ctx.status = 200;
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询吉他谱失败"
        };
    }
}

async function repeatName(ctx, next) {
    try {
        const models = ctx.fs.dc.models;
        const { name } = ctx.query;

        if (!!name) {
            const res = await models.Gtps.findAll({
                where: {
                    name: {
                        $iLike: `%${name}%`
                    }
                },
                limit: 5
            })
            ctx.body = res;
            ctx.status = 200;
        } else {
            ctx.body = [];
            ctx.status = 200;
        }
    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.body = [];
    }
}

async function getList(ctx, next) {
    try {
        const { fs: { api: { userInfo } } } = ctx
        const models = ctx.fs.dc.models;
        const { creatTime, gtpName, limit, offset, search } = ctx.query;

        let where = {};
        if (creatTime) {
            where.createAt = {
                $gte: moment(creatTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                $lte: moment(creatTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
        }

        if (search) {
            where.$or = [
                {
                    name: {
                        $iLike: `%${search}%`
                    }
                },
                {
                    artist: {
                        $iLike: `%${search}%`
                    },
                }, {
                    desc: {
                        $iLike: `%${search}%`
                    },
                }
            ]
        }

        let findObj = {
            where: where,
            order: [['lastRead', 'desc']],
        };

        if (Number(limit) > 0 && Number(offset) >= 0) {
            findObj.limit = Number(limit);
            findObj.offset = Number(offset);
        }

        const res = await models.Gtps.findAndCountAll(findObj)

        ctx.body = res;
        ctx.status = 200;

    } catch (error) {
        ctx.fs.logger.error(`path: ${ctx.path}, error: ${error}`);
        ctx.status = 400;
        ctx.body = {
            "message": "查询报表数据失败"
        }
    }
}



module.exports = {
    getList,
    getGtp,
    addGtp,
    editGtp,
    getQiniuToken,
    repeatName,
};