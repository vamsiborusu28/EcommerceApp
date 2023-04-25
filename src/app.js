//Bring Express
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Asssign Express

const app=express();

// default properties of express to make settings

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

// export the app
export default app;