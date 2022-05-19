/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const Places = sequelize.define("places", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "places_id_uindex"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: "场所名称",
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "描述",
      primaryKey: false,
      field: "describe",
      autoIncrement: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "userId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "user"
      }
    },
  }, {
    tableName: "places",
    comment: "",
    indexes: []
  });
  dc.models.Places = Places;

  const User = dc.models.User;
  Places.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
  User.hasMany(Places, { foreignKey: 'userId', sourceKey: 'id' });

  return Places;
};