import asyncHandler from "../service/asyncHandler";
import User from './src/models/user.schema.js'; 


//cookieOptions
const cookieOptions={
    expiresIn:new Date(Date.now() + 3*24*60*60*1000),
    httpOnly:true,
}


export const signup= asyncHandler( async (req,res,next) => {

    // get the data from web
    const {name,email,password}=req.body; // take the request body from the user

    

    // check if any field is empty
    if(!name || !email || !password){
        throw new CustomError("Please enter all details",400);
    }

    // check if user is already exists in the database
    const exist=User.findOne({email});

    // if exists return the response
    if(exist){
        throw new CustomError("User Already Exists",400);
    }

    // else create the user with the details given 
    const user=User.create({
        name,
        email,
        password
    })

    // after creating the user create a  JWT Token  which is used as an unique identifier for authorization of ressources 
    user.getJWTToken();
    
 
    //add token to the cookie so that the  frontend user can use this token for authorisation of resources  
    res.cookie("token",token,cookieOptions);
    
    /* first time when the user is created it gives the schema data as response
       along with user data passowrd is also get as response in order to protect the password we need to make the 
       password undefined.
    */
    user.password=undefined;

    // After successful insertion we need to return the response with success and along the user details and token
    res.status(200).json({
        sucess:true,
        user,
        token,
    })

});


export const login=asyncHandler(async (req,res,next) => {

    const {email,password}=req.body;

    // If email or password is null return error
    if(!email || !password){
        throw new CustomError("fields cannot be empty",400);
    }

    // After that find out that user based on the email
    const user=User.findOne({email}).select("+password");

    // If user is not found return not found error
    if(!user){
        throw new Error("User not found",401);
    }


    // If user is present we need to compare with the password user enters
    const sucess=user.comparePassword(password);
  
  
    // If the password is correct
    if(sucess){
        // generate jwt token which used for authentication and authorization
        const token=user.getJWTToken();
        // Add this token to the cookie 
        res.cookie("token",token,cookieOptions);
        user.password=undefined;


        // return the status along with the user data and token 

        res.status(200).json({
            success:true,
            user,
            token,
        });
           
    }

    // If the password is incorrect return the status as incorrect 
    throw new CustomError("Incorrect Password",400);
});



// Logout Controller
export const logout=asyncHandler(async (req,res,next) => {
    /* logout happens when user Logout from the application and when session times 
    out when this happens jwt token should become null
    */
    res.cookie("token",null,{
        expiresIn:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        sucess:true,
        token,
    })
});








