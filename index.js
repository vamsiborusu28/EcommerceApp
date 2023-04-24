//Database Configuration
import mongoose from "mongoose";
import app from './src/app.js';
import config from "./src/config/config.js";
// Self Invoking Function for Database Connection

(async () => {

    try{
        await mongoose.connect(config.MONGODB_URL);
        app.on('error' , (error) => {
            console.error("Error",error);
            throw error;

        })
        const portStart=() => {
            console.log('Port is running on',config.PORT);
        }
        app.listen(config.PORT,portStart);
    }catch(error){
        console.log("Error",error);
        throw error;
    }

})()
