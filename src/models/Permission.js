import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:
      "Resource this permission applies to (e.g., 'user', 'post', 'comment')",
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Action allowed (e.g., 'create', 'read', 'update', 'delete')",
  },
}, {
  tableName: "permissions",
});

export default Permission;
