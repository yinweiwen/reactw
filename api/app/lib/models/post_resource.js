/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const PostResource = sequelize.define("postResource", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
      unique: "post_resource_id_uindex"
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "post_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "post"
      }
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "resource",
      autoIncrement: false,
      references: {
        key: "code",
        model: "resource"
      }
    }
  }, {
    tableName: "post_resource",
    comment: "",
    indexes: []
  });
  dc.models.PostResource = PostResource;
  return PostResource;
};