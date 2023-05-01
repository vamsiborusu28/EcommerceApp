import { S3 } from 'aws-sdk';
import Product from '../models/product.schema.js';
import asyncHandler from '../service/asyncHandler.js';
import formidable from 'formidable';
import fs from "fs";
import { FileUpload } from '../service/imageUpload.js';
import { config } from '../config/config.js';
import { Mongoose } from 'mongoose';
import { FileDelete } from '../service/imageUpload.js';


export const addProduct=asyncHandler(async(req,res) =>
{
    // Import Formidable package

    const form = formidable({multiples:true,
    keepExtensions:true,
    })


    // Parse the form handling data
    form.parse(req, async function(err,fields,files){

        if(err){
            throw new CustomError(err.message||"Cannot get files",500);
        }
        const product_id=Mongoose.Types.ObjectId().toHexString();
        console.log(files,fields);

        if(!fields.name || !fields.price || !fields.description || !fields.stock || !fields.sold || !fields.collectionId){
            throw new CustomError("Fields can't be empty",401);
        }

        const storeFiles=Promise.all(
            Object.keys(files).map((file,index) => {
                const element =file[fileKey];
                
                const data=fs.readFileSync(element.filepath);

                const upload=FileUpload({
                    bucketName:config.S3_BUCKET_NAME,
                    key:`products/${product_id}/photos${index+1}.png`,
                    body:data,
                    contentType:element.mimeType,

                })
                
                console.log(upload);

                return {
                    secure_url:upload.location,
                }

            })          

        );

        const imageArray=await storeFiles;

        const product= Product.create({
            id:product_id,
            photos:imageArray,
            ...fields,
        })

        if(!product){
            throw new CustomError("Product Info doesn't store in the database");
        }

        return res.status(201).json({
            success:true,
            message:"product added successfully",
            product,
        })
    });
});



export const deleteProduct=asyncHandler( async (req,res) => {
    const form=formidable({
        multiples:true,
        keepExtensions:true,
    });

    const {id:productId}=req.params;
    const name=req.body;

    // delete the data from the database
    const product= await Product.findById({id});

    if(!product){
        throw new CustomError("Product Not Found",404);
    }


    const deleteProduct =Promise.all(

        product.photos.map(async (element,index) => {
            await FileDelete(
                {
                    bucketName:config.S3_BUCKET_NAME,
                    key: `products/${product._id.toHexString()}/photo_${index+1}.png`,
                }
            );
        })

    )

    //execute the delete products methods

    await deleteProduct;
    // delete the product from the database
    await product.remove();


    res.status(200).json({
        success:true,
        message:"Product has been deleted successfully",

    })

});


