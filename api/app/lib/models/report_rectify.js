/* eslint-disable*/
'use strict';

module.exports = dc => {
    const DataTypes = dc.ORM;
    const sequelize = dc.orm;
    const ReportRectify = sequelize.define("reportRectify", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: "nextval(\"report_countyCollect_id_seq\"::regclass)",
            comment: "序号",
            primaryKey: true,
            field: "id",
            autoIncrement: false,
            unique: "report_countycollect_id_uindex"
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "县区（id）",
            primaryKey: false,
            field: "regionId",
            autoIncrement: false
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            comment: null,
            primaryKey: false,
            field: "dateTime",
            autoIncrement: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "名称",
            primaryKey: false,
            field: "name",
            autoIncrement: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "地址",
            primaryKey: false,
            field: "address",
            autoIncrement: false
        },
        hiddenDanger: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            comment: "排查发现隐患",
            primaryKey: false,
            field: "hiddenDanger",
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
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "web端上报",
            primaryKey: false,
            field: "userId",
            autoIncrement: false
        },
        isAudit: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
            comment: "市级 确认审核",
            primaryKey: false,
            field: "isAudit",
            autoIncrement: false
        },
    }, {
        tableName: "report_rectify",
        comment: "",
        indexes: []
    });
    dc.models.ReportRectify = ReportRectify;

    const User = dc.models.User;
    ReportRectify.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(ReportRectify, { foreignKey: 'userId', sourceKey: 'id' });

    const Department = dc.models.Department;
    ReportRectify.belongsTo(Department, { foreignKey: 'regionId', targetKey: 'id' });
    Department.hasMany(ReportRectify, { foreignKey: 'regionId', sourceKey: 'id' });

    return ReportRectify;
};