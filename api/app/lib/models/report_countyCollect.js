/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const ReportCountyCollect = sequelize.define("reportCountyCollect", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      comment: "序号",
      primaryKey: false,
      field: "id",
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
    }
  }, {
    tableName: "report_countyCollect",
    comment: "",
    indexes: []
  });
  dc.models.ReportCountyCollect = ReportCountyCollect;
  return ReportCountyCollect;
};