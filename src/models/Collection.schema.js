// Collection Schema for Ecoomerce App

import mongoose from "mongoose";

const CollectionSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please Provide a name for the collection'],
        trim:true,//trims the unnecessary spaces in the name,
        maxLength:[120, 'Length should not exceed 120 characters']
    },
},

{timestamps:true}
);


export default mongoose.model('Collection',CollectionSchema);
