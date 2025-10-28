import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

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
    
   

})
export default User