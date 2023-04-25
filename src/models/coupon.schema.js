import mongoose from "mongoose";

const CouponSchema=new mongoose.Schema({

    coupon:{
        type:String,
        required:[true,"Please Provide Coupon"],
    },
    discount:{
        type:Number,
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    }
});


export default mongoose.models("Coupon",CouponSchema);
