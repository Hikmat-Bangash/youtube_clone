
import express,{Router} from "express";
import {  signin, signup } from "../controller/auth.controller";

const authRouter: Router = express.Router();

//CREATE A USER
authRouter.post("/signup", signup)

//SIGN IN
authRouter.post("/signin", signin)

//GOOGLE AUTH
// authRouter.post("/google", googleAuth)

export default authRouter;
