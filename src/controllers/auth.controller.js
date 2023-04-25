import asyncHandler from "../service/asyncHandler";
import User from './src/models/user.schema.js'; 


//cookieOptions
const cookieOptions={
    expiresIn:new Date(Date.now() + 3*24*60*60*1000),
    httpOnly:true,
}


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
    

    //add token to the cookie
    res.cookie("token",token,cookieOptions);
    

    user.password=undefined;

    res.status(200).json({
        sucess:true,
        user,
        token,
    })

});


export const login=asyncHandler(async (req,res,next) => {

    const {email,password}=req.body;

    if(!email || !password){
        throw new CustomError("fields cannot be empty",400);
    }

    const user=User.findOne({email}).select("+password");

    if(!user){
        throw new Error("User not found",401);
    }

    const sucess=user.comparePassword(password);
    // get jwttoken
  
    if(sucess){
        const token=user.getJWTToken();
        res.cookie("token",token,cookieOptions);
        user.password=undefined;

        res.status(200).json({
            success:true,
            user,
            token,
        });
           
    }

    throw new CustomError("Incorrect Password",400);
});


export const logout=asyncHandler(async (req,res,next) => {
    res.cookie("token",null,{
        expiresIn:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        sucess:true,
        token,
    })
});



