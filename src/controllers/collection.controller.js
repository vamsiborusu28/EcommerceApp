import Collection from '../models/Collection.schema';
import asyncHandler from '../service/asyncHandler';


export const addCollection=asyncHandler(async (req,res)=> {
    const {name}=req.body;

    if(!name){
        return new CustomError("Collection name cannot be empty",401);
    }

    const exists=await Collection.findOne({name});
    if(exists){
        return new CustomError("Collection already Exist");
    }

    const user=await Collection.create({name});

    res.status(200).json({
        sucess:true,
        message:"Collection is added",
        user,
    })
});



export const updateCollection=asyncHandler(async (req,res) => {

    const {name}=req.body;

    const {id:collectionId}=req.params;

    if(!name){
        return new CustomError("Name cannot be empty");
    }

    const updatedCollection=await Collection.findByIdAndDelete(id,{name},{
        new:true,
        runValidators:true,
    });

    if(!updatedCollection){
        return new CustomError("Collection cannot be updated",400);
    }

    res.status(200).json({
        sucess:true,
        message:"Collection Updated Successfully",
        updateCollection,
    })


});


export const deleteCollection=asyncHandler( async (req,res) => {
    const {id}=req.body;

    const user=Collection.findById({id});

    if(!exists){
        return new CustomError("Collection not found");
    }


    await  user.remove();
    res.status(200).json({
        success:true,
        message:"successfully deleted",
    })
    
});

export const getAll=asyncHandler(async (req,res) => {

    const userData=await Collection.find();

    res.status(200).json({
        sucess:true,
        message:"Successfuly get the collection data",
        userData,
    });
});


