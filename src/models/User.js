import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Role from "./Role.js";

const User=sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    resetToken:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    resetTokenExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false,
    },
    emailVerificationOTP:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    emailVerificationOTPExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    roleId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references: {
            model: Role,
            key: "id",
        },
    },
    permissionIds:{
        type:DataTypes.JSON,
        allowNull:true,
        defaultValue:[],
        comment: "Array of permission IDs assigned directly to user",
    },
}, {
    tableName: "users",
});

// User belongs to Role (gets role-based permissions)
User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
});

export default User