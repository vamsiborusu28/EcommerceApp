import asyncHandler from "../service/asyncHandler";
import JWT from 'jsonwebtoken';
import config from './config/config.js';
import CustomError from './utils/CustomError.js';
import User from './models/user.schema.js';



export const isLoggedIn= asyncHandler(async (req,res,next) => {
    //declare a token which is used to check whether the user is logged in the system or not
    let token;
    //get the token from the user cookie or from header object if exists
    if(req.cookies.token || (req.header.authorization && (req.header.authorization.startsWith("bearer")))){
        token=req.header.authorization.split(' ')[1];
    }
    
    if(!token){
        return new CustomError("invalid token",401);
    }
    
    try{
        // Verify our JWT Token if verified get the details of the user 
        const userPayload=JWT.verify(token,config.JWT_SECRET);
        const userDetails=User.findOne(userPayload._id,"name email role");
        req.userDetails=userDetails;
        next();

    }catch(error){
        return new CustomError("Not Authorized access the resources ",401);
    }


});


export const isAuthorised=(...requiredRoles) => asyncHandler( async (req,res,next) => {
    // If user role is not required category throw not authorized error
    if(!requiredRoles.includes(req.user.role)){
        throw new CustomError("User is Not Authorized to access the resources ",400);
    }
    next();
})