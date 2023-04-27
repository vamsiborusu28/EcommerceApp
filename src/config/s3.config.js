import aws from 'aws-sdk';
import config from '../config/config.js';


const s3=new aws.S3({
   S3_ACCESS_KEY:config.S3_ACCESS_KEY,
   S3_SECRET_ACCESS_KEY:config.S3_SECRET_ACCESS_KEY,
   S3_BUCKET_NAME:config.S3_BUCKET_NAME,
   S3_REGION:config.S3_REGION,
});

export default s3;

