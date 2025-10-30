import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

// Represents a hierarchical item (folder, file, or task) similar to VS Code explorer
const WorkspaceItem = sequelize.define(
  "WorkspaceItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("folder", "file", "task"),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "workspace_items", key: "id" },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    // For files: content; for tasks: description/status; folders ignore content
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "done"),
      allowNull: true,
      defaultValue: null,
      comment: "Only used for type=task",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "workspace_items" }
);

// Self-referential hierarchy
WorkspaceItem.hasMany(WorkspaceItem, { foreignKey: "parentId", as: "children" });
WorkspaceItem.belongsTo(WorkspaceItem, { foreignKey: "parentId", as: "parent" });

// Ownership
WorkspaceItem.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

export default WorkspaceItem;


