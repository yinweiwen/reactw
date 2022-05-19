/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const Department = sequelize.define("department", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "department_id_uindex"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    dependence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: "上级部门/从属",
      primaryKey: false,
      field: "dependence",
      autoIncrement: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: "市1，区县2，乡镇3，村4",
      primaryKey: false,
      field: "type",
      autoIncrement: false
    }
  }, {
    tableName: "department",
    comment: "",
    indexes: []
  });
  dc.models.Department = Department;

  const User = dc.models.User;
  User.belongsTo(Department, { foreignKey: 'departmentId', targetKey: 'id' });
  Department.hasMany(User, { foreignKey: 'departmentId', sourceKey: 'id' });

  return Department;
};