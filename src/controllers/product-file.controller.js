import { S3 } from 'aws-sdk';
import Product from '../models/product.schema.js';
import asyncHandler from '../service/asyncHandler.js';
import formidable from 'formidable';
import fs from "fs";
import { FileUpload } from '../service/imageUpload.js';
import { config } from 'dotenv';


export const addProduct=asyncHandler(async(req,res))
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

        console.log(files,fields);

        if(!fields.name || !fields.price || !fields.description || !fields.stock || !fields.sold || !fields.collectionId){
            throw new CustomError("Fields can't be empty",401);
        }

        const storeFiles=Promise.all(
            Object.keys(files).map((file) => {
                const element =file[fileKey];

                const data=fs.readFileSync(element.filepath);

                const upload=FileUpload({
                    bucketName:config.S3_
                })
                

            })

        );


    });

}