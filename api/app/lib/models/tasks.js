/* eslint-disable*/
'use strict';

module.exports = dc => {
  const DataTypes = dc.ORM;
  const sequelize = dc.orm;
  const Tasks = sequelize.define("tasks", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
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
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "desc",
      autoIncrement: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now'),
      comment: null,
      primaryKey: false,
      field: "created_at",
      autoIncrement: false
    },
    deadlineAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "deadline_at",
      autoIncrement: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0",
      comment: null,
      primaryKey: false,
      field: "priority",
      autoIncrement: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "tags",
      autoIncrement: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "type",
      autoIncrement: false,
      references: {
        key: "id",
        model: "taskType"
      }
    },
    catalog: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "catalog",
      autoIncrement: false,
      references: {
        key: "id",
        model: "taskCatalog"
      }
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user",
      autoIncrement: false,
      references: {
        key: "id",
        model: "user"
      }
    },
    state: {
      type: DataTypes.STRING,
      field: "state"
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "extras",
      autoIncrement: false
    }
  }, {
    tableName: "tasks",
    comment: "",
    indexes: [{
      name: "tasks_create_at_index",
      unique: false,
      fields: ["created_at"]
    }, {
      name: "tasks_state_index",
      unique: false,
      fields: ["state"]
    }, {
      name: "tasks_topic_id_index",
      unique: false,
      fields: ["catalog"]
    }, {
      name: "tasks_user_index",
      unique: false,
      fields: ["user"]
    }]
  });
  dc.models.Tasks = Tasks;

  const TaskType = dc.models.TaskType;
  Tasks.belongsTo(TaskType, { foreignKey: 'type', targetKey: 'id' });
  TaskType.hasMany(Tasks, { foreignKey: 'type', targetKey: 'id' });

  const TaskCatalog = dc.models.TaskCatalog;
  Tasks.belongsTo(TaskCatalog, { foreignKey: 'catalog', targetKey: 'id' });
  TaskCatalog.hasMany(Tasks, { foreignKey: 'catalog', targetKey: 'id' });

  const User = dc.models.User;
  Tasks.belongsTo(User, { as: 'tuser', foreignKey: 'user', targetKey: 'id' });
  User.hasMany(Tasks, { as: 'tuser', foreignKey: 'user', targetKey: 'id' });
  return Tasks;
};