/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const ReportConfigition = sequelize.define("reportConfigition", {
    reportName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "报表名称",
      primaryKey: false,
      field: "reportName",
      autoIncrement: false
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: "区域id",
      primaryKey: false,
      field: "regionId",
      autoIncrement: false
    },
    reportTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: "报表类型",
      primaryKey: false,
      field: "reportTypeId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "reportType"
      }
    },
    excuteTime: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "生成时间 cron表达式",
      primaryKey: false,
      field: "excuteTime",
      autoIncrement: false
    },
    isEnable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      comment: "启用状态",
      primaryKey: false,
      field: "isEnable",
      autoIncrement: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: "序号",
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "report_configition_id_uindex"
    }
  }, {
    tableName: "report_configition",
    comment: "",
    indexes: []
  });
  dc.models.ReportConfigition = ReportConfigition;
  return ReportConfigition;
};