/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const UserToken = sequelize.define("userToken", {
    token: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "token",
      autoIncrement: false,
      unique: "user_token_token_uindex"
    },
    userInfo: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user_info",
      autoIncrement: false
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "expired",
      autoIncrement: false
    }
  }, {
    tableName: "user_token",
    comment: "",
    indexes: []
  });
  dc.models.UserToken = UserToken;
  return UserToken;
};