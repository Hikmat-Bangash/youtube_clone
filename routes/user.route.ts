
import express, { Router } from "express";
import { CreateUser, GettingUsers } from "../controller/user.controller";

const UserRouter: Router = express.Router();

UserRouter.post('/', CreateUser)
UserRouter.get('/', GettingUsers)



export default UserRouter;
