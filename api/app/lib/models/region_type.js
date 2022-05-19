/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const RegionType = sequelize.define("regionType", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "region_type_id_uindex"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "type",
      autoIncrement: false
    }
  }, {
    tableName: "region_type",
    comment: "",
    indexes: []
  });
  dc.models.RegionType = RegionType;
  return RegionType;
};