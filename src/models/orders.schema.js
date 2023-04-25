import mongoose from "mongoose";
import StatusTypes from "../utils/StatusTypes.js";

const orderSchema=new mongoose.Schema({

    product:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Collection",
            },
            price:Number,
            count:Number,
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    address:{
        type:String,
        required:true,
    },
    phoneno:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
    },
    coupon:{
        type:String,
    },
    status:{
        type:String,
        enum:Object.values(StatusTypes),
        default:StatusTypes.ORDERED,
    }
});


export default mongoose.models("Order",orderSchema);