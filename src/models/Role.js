import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permissionIds: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: "Array of permission IDs assigned to this role",
    },
}, {
    tableName: "roles",
});

export default Role;