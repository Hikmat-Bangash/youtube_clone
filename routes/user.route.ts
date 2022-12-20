
import express, { Router } from "express";
import { CreateUser } from "../controller/user.controller";

const UserRouter: Router = express.Router();

UserRouter.post('/', CreateUser)




export default UserRouter;
