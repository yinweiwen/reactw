/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const Resource = sequelize.define("resource", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "code",
      autoIncrement: false,
      unique: "resource_code_uindex"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false,
      unique: "resource_name_uindex"
    },
    parentResource: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "parent_resource",
      autoIncrement: false
    }
  }, {
    tableName: "resource",
    comment: "",
    indexes: []
  });
  dc.models.Resource = Resource;
  return Resource;
};