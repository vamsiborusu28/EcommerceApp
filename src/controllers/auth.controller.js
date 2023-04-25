import asyncHandler from "../service/asyncHandler";
import User from './src/models/user.schema.js'; 


export const signup= asyncHandler( async (req,res,next) => {

    // get the data from web
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        throw new CustomError("Please enter all details",400);
    }

    // update into the database
    const exist=User.findOne({email});

    if(exist){
        throw new CustomError("User Already Exists",400);
    }

    const user=User.create({
        name,
        email,
        password
    })

    // get JWT Token
    user.getJWTToken();

    user.password=undefined;

    res.status(200).json({
        sucess:true,
        user,
    })

});