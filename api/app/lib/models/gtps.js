/* eslint-disable*/
'use strict';

module.exports = dc => {
    const DataTypes = dc.ORM;
    const sequelize = dc.orm;
    const Gtps = sequelize.define("gtp", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: null,
            comment: null,
            primaryKey: true,
            field: "id",
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: null,
            field: "name"
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            field: "cover"
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            field: "artist"
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: null,
            primaryKey: false,
            field: "user",
            autoIncrement: false,
            references: {
                key: "id",
                model: "user"
            }
        },
        rateStar: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: null,
            primaryKey: false,
            field: "rate_star",
            autoIncrement: false
        },
        rateDif: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: null,
            primaryKey: false,
            field: "rate_dif",
            autoIncrement: false
        },
        love: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "love",
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "finished",
            defaultValue: "false",
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            field: "link"
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
            comment: null,
            primaryKey: false,
            field: "desc",
            autoIncrement: false
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('now'),
            comment: null,
            primaryKey: false,
            field: "create_at",
            autoIncrement: false
        },
        lastRead: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('now'),
            comment: null,
            primaryKey: false,
            field: "last_read",
            autoIncrement: false
        },
        extras: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: null,
            comment: null,
            primaryKey: false,
            field: "extras",
            autoIncrement: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "0",
            comment: null,
            primaryKey: false,
            field: "type",
            autoIncrement: false
        },
        content: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: null,
            comment: null,
            primaryKey: false,
            field: "content",
            autoIncrement: false
        }
    }, {
        tableName: "gtp",
        comment: ""
    });
    dc.models.Gtps = Gtps;

    const User = dc.models.User;
    Gtps.belongsTo(User, { as: 'guser', foreignKey: 'user', targetKey: 'id' });
    User.hasMany(Gtps, { as: 'guser', foreignKey: 'user', targetKey: 'id' });
    return Gtps;
};