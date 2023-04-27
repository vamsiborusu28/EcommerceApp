import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide Collection Name'],
        trim:true,
        maxLength:[100,"product name should not exceed 100 characters"],
    },

    price:{
        type:Number,
    },

    description:{
        type:String,
        minLength:[10,"Product Description should be atleast 10 characters"]
    },
    /*
    photos:[
        {
            secure_url:{
                type:String,
            }
        }
    ],
    */

    stock:{
        type:Number,
        default:0,
    },

    sold:{
        type:Number,
        default:0,
    },

    collectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection",
    }

})


export default mongoose.models("Product",productSchema);
