/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const ReportDownManage = sequelize.define("reportDownManage", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"report_downManage_id_seq\"::regclass)",
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false,
      unique: "report_downmanage_id_uindex"
    },
    reportName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "报表名称",
      primaryKey: false,
      field: "reportName",
      autoIncrement: false
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: "区域id",
      primaryKey: false,
      field: "regionId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "department"
      }
    },
    reportTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: "报表类型id\n1.整治表\n2.汇总表",
      primaryKey: false,
      field: "reportTypeId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "reportType"
      }
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "文件路径",
      primaryKey: false,
      field: "filePath",
      autoIncrement: false,
    },
    creatTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "creatTime",
      autoIncrement: false
    }
  }, {
    tableName: "report_downManage",
    comment: "",
    indexes: []
  });
  dc.models.ReportDownManage = ReportDownManage;

  const { ReportType, Department } = dc.models;
  ReportDownManage.belongsTo(ReportType, { foreignKey: 'reportTypeId', targetKey: 'id' });
  ReportDownManage.belongsTo(Department, { foreignKey: 'regionId', targetKey: 'id' });
  return ReportDownManage;
};