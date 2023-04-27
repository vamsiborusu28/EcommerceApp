import dotenv from "dotenv";

dotenv.config();

const config={

    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecomm",
    JWT_SECRET:process.env.JWT_SECRET || "YOURSECRET",
    JWT_EXPIRY:process.env.JWT_EXPIRY || "30d",
    S3_ACCESS_KEY:process.env.S3_ACCESS_KEY || "acesskey",
    S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY || "secretaccesskey",
    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME || "yourbucketname",
    S3_REGION:process.env.S3_REGION||"youregion",
}

export default config;
