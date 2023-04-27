import Product from '../models/product.schema';
import config from './config/config.js';
import asyncHandler from '../service/asyncHandler';
import CustomError from './utils/CustomError';


export const addProduct=asyncHandler(async(req,res) => {
    const {name,price,description,stock,sold,collectionId}=req.body;

    if(!name || !price || !description || !stock || !sold || !collectionId){
        throw new CustomError("Please enter all fields",400);
    }

    const exists=Product.findOne({name});

    if(!exists){
        throw new CustomError("Product Already Exists",400);
    }

    const productName=Product.create({name,price,description,stock,sold,collectionId});

    res.status(200).json({
            
    });

})