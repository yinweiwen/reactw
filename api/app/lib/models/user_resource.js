/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const UserResource = sequelize.define("userResource", {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "post"
      }
    },
    resourceId: {
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
    tableName: "user_resource",
    comment: "",
    indexes: []
  });
  dc.models.UserResource = UserResource;

  const User = dc.models.User;
  UserResource.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
  User.hasMany(UserResource, { foreignKey: 'userId', sourceKey: 'id' });

  const Resource = dc.models.Resource;
  UserResource.belongsTo(Resource, { foreignKey: 'resourceId', targetKey: 'code' });
  Resource.hasMany(UserResource, { foreignKey: 'resourceId', sourceKey: 'code' });
  Resource.hasMany(Resource, { foreignKey: 'parentResource', sourceKey: 'code' });

  return UserResource;
};