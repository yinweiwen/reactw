/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "user_id_uindex"
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "用户名 账号",
      primaryKey: false,
      field: "username",
      autoIncrement: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "password",
      autoIncrement: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: "部门id",
      primaryKey: false,
      field: "department_id",
      autoIncrement: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      comment: "启用状态",
      primaryKey: false,
      field: "enable",
      autoIncrement: false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "delete",
      autoIncrement: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "手机号(小程序使用手机号登录)",
      primaryKey: false,
      field: "phone",
      autoIncrement: false
    },
    post: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "职位",
      primaryKey: false,
      field: "post",
      autoIncrement: false
    }
  }, {
    tableName: "user",
    comment: "",
    indexes: []
  });
  dc.models.User = User;


  return User;
};