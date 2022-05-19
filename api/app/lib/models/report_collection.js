/* eslint-disable*/
'use strict';

module.exports = dc => {
    const DataTypes = dc.ORM;
    const sequelize = dc.orm;
    const ReportCollection = sequelize.define("reportCollection", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            comment: null,
            primaryKey: true,
            field: "id",
            autoIncrement: true,
            unique: "report_collection_id_uindex"
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
        placeCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "场所总数",
            primaryKey: false,
            field: "placeCount",
            autoIncrement: false
        },
        hiddenDangerCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "排查隐患总数",
            primaryKey: false,
            field: "hiddenDangerCount",
            autoIncrement: false
        },
        hiddenDangerItem12Count: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null,
            comment: "排查隐患详细类目  1-12 项  总数",
            primaryKey: false,
            field: "hiddenDangerItem12Count",
            autoIncrement: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            comment: "填报人(县区联络员)",
            primaryKey: false,
            field: "userId",
            autoIncrement: false
        }
    }, {
        tableName: "report_collection",
        comment: "",
        indexes: []
    });
    dc.models.ReportCollection = ReportCollection;

    const User = dc.models.User;
    ReportCollection.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(ReportCollection, { foreignKey: 'userId', sourceKey: 'id' });

    const Department = dc.models.Department;
    ReportCollection.belongsTo(Department, { foreignKey: 'regionId', targetKey: 'id' });
    Department.hasMany(ReportCollection, { foreignKey: 'regionId', sourceKey: 'id' });

    return ReportCollection;
};