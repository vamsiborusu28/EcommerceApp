// user -> name,email,password,userType

import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";

const UserSchema=new mongoose.Schema(
{
    name:{  
        type:String,
        required:[true,"Please Provide name of the user"],
        trim:true,
        maxLength:[50,'User name should not exceed more than 50 chars'],
    },
    email:{
        type:String,
        required:[true,'This should not be empty'],
    },
    password:{
        type:String,
        required:[true,'Please Specity Password'],
        minLength:[8,'Password atleast contains 8 characters'],
        select:false,
    },
    roles:{
        type:String,
        enum:Object.values(AuthRoles),
        default:AuthRoles.USER,
    }    
},
{timestamps:true}
)