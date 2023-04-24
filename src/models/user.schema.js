// user -> name,email,password,userType

import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from './src/config/config.js';
import crypto from 'crypto';


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
    role:{
        type:String,
        enum:Object.values(AuthRoles),
        default:AuthRoles.USER,
    },
    forgetPasswordToken:String,
    forgotPasswordExpiry:Date,  
},
{timestamps:true}
);

// Encrypting the password before saving into the database by using mongoose pre hook

UserSchema.pre("save", async function(next){

    if(!UserSchema.isModified("password")) return next();
    // Encrypting the password
    bcrypt.hash(this.password,10);
    next();
})


// If we want to add methods to our schema we can add it by declaring the following

UserSchema.methods={

    comparePassword: async function(EnteredPassword){
        return await bcrypt.compare(EnteredPassword,this.password);
    },

    // Generate JWT Token
    getJWTtoken: function(){
        // jwt.sign(payload,secretkey,options)
        jwt.sign({_id:this._id,role:this.role},config.JWT_SECRET,{
            expiresIn:config.JWT_EXPIRY,
        });
    },
  
    // Implementing Forget Password Token

    generateForgetPasswordToken : async function(){
        // generate forget password token
        const forgetToken=crypto.randomBytes(20).toString('hex');

        //assign this token by decrypting to forgetPasswordToken
        this.forgetPasswordToken=crypto.createHash('sha256').update(forgetToken).digest('hex');

        // Update the token expiry to 20 minutes

        this.forgotPasswordExpiry=Date.now()+ (20*60*1000);

        return forgetToken;

    }

    
    
}


export default mongoose.models("Users",UserSchema);