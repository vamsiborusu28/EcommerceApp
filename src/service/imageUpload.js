import s3 from '../config/s3.config.js';
import asyncHandler from './asyncHandler';



export const FileUpload= async ({bucketName,key,body,contentType}) => {

    return  await s3.upload({
        Bucket:bucketName,
        Key:key,
        Data:body,
        ContentType:contentType,

    }).promise();
};


export const FileDelete= async ({bucketName,key}) => {
    return await s3.deleteObject({
        Bucket:bucketName,
        Key:key,
    }).promise();
};

