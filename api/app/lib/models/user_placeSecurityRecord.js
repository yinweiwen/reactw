/* eslint-disable*/
'use strict';

module.exports = dc => {
    const DataTypes = dc.ORM;
    const sequelize = dc.orm;
    const UserPlaceSecurityRecord = sequelize.define("userPlaceSecurityRecord", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: null,
            comment: "id",
            primaryKey: true,
            field: "id",
            autoIncrement: true,
            unique: "user_placesecurityrecord_id_uindex"
        },
        time: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            comment: "录入时间",
            primaryKey: false,
            field: "time",
            autoIncrement: false
        },
        placeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "场所id",
            primaryKey: false,
            field: "placeId",
            autoIncrement: false,
            references: {
                key: "id",
                model: "places"
            }
        },
        hiddenDangerItem12: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null,
            comment: "12项隐患信息",
            primaryKey: false,
            field: "hiddenDangerItem12",
            autoIncrement: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "存在具体问题描述",
            primaryKey: false,
            field: "description",
            autoIncrement: false
        },
        audit1ManId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "乡镇人审核",
            primaryKey: false,
            field: "audit1ManId",
            autoIncrement: false,
            references: {
                key: "id",
                model: "user"
            }
        },
        audit2ManId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "区县人复核",
            primaryKey: false,
            field: "audit2ManId",
            autoIncrement: false,
            references: {
                key: "id",
                model: "user"
            }
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "所属县/区",
            primaryKey: false,
            field: "regionId",
            autoIncrement: false,
            references: {
                key: "id",
                model: "department"
            }
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            comment: "用户id，填报人",
            primaryKey: false,
            field: "userId",
            autoIncrement: false
        },
        placeType: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "场所性质",
            primaryKey: false,
            field: "placeType",
            autoIncrement: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "场所地址",
            primaryKey: false,
            field: "address",
            autoIncrement: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: null,
            comment: "负责人手机号",
            primaryKey: false,
            field: "phone",
            autoIncrement: false
        },
        dimension: {
            type: DataTypes.REAL,
            allowNull: true,
            defaultValue: null,
            comment: "面积",
            primaryKey: false,
            field: "dimension",
            autoIncrement: false
        },
        floors: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "多少层",
            primaryKey: false,
            field: "floors",
            autoIncrement: false
        },
        numberOfPeople: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "常住人数",
            primaryKey: false,
            field: "numberOfPeople",
            autoIncrement: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "经纬度",
            primaryKey: false,
            field: "location",
            autoIncrement: false
        },
        isEnable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
            comment: "是否为合用场所",
            primaryKey: false,
            field: "isEnable",
            autoIncrement: false
        },
        rejectManId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "驳回人",
            primaryKey: false,
            field: "rejectManId",
            autoIncrement: false,
            references: {
                key: "id",
                model: "user"
            }
        },
        rejectReasons: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "驳回意见",
            primaryKey: false,
            field: "rejectReasons",
            autoIncrement: false
        },
        isDraft: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
            comment: "是否草稿",
            primaryKey: false,
            field: "isDraft",
            autoIncrement: false
        },
        placeOwner: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "场所负责人",
            primaryKey: false,
            field: "placeOwner",
            autoIncrement: false
        },
        localtionDescribe: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "经纬度定位描述",
            primaryKey: false,
            field: "localtionDescribe",
            autoIncrement: false
        },
        correctiveAction: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "采取措施",
            primaryKey: false,
            field: "correctiveAction",
            autoIncrement: false
        },
        punishment: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "实施处罚，强制措施情况",
            primaryKey: false,
            field: "punishment",
            autoIncrement: false
        }
    }, {
        tableName: "user_placeSecurityRecord",
        comment: "",
        indexes: []
    });
    dc.models.UserPlaceSecurityRecord = UserPlaceSecurityRecord;

    const Places = dc.models.Places;
    UserPlaceSecurityRecord.belongsTo(Places, { foreignKey: 'placeId', targetKey: 'id' });
    Places.hasMany(UserPlaceSecurityRecord, { foreignKey: 'placeId', sourceKey: 'id' });

    const User = dc.models.User;
    UserPlaceSecurityRecord.belongsTo(User, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(UserPlaceSecurityRecord, { foreignKey: 'userId', sourceKey: 'id' });

    UserPlaceSecurityRecord.belongsTo(User, { as: 'audit1ManUser', foreignKey: 'audit1ManId', targetKey: 'id' });

    UserPlaceSecurityRecord.belongsTo(User, { as: 'audit2ManUser', foreignKey: 'audit2ManId', targetKey: 'id' });

    UserPlaceSecurityRecord.belongsTo(User, { as: 'rejectManUser', foreignKey: 'rejectManId', targetKey: 'id' });

    return UserPlaceSecurityRecord;
};