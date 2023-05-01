import {Router} from 'express';
import {logout, signup,login, getInfo} from '../controllers/auth.controller';
import { isLoggedIn } from '../middleware/auth.middlewar';
//Adding routes to our auth controller


const router=Router();

router.post("/signup",signup);


router.post("/login",login);

router.get("/logout",logout);


// Adding middleware to our route we can add as many middlewares we want before giving the req to the controller. 

router.get("/profile",isLoggedIn,getInfo);


export default router;