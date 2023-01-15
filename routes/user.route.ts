
import express, { Router } from "express";
import { deleteUser, dislike, getAllUsers, getUser, like, subscribe, unsubscribe, update } from "../controller/user.controller";
import { verifyToken } from "../middleware/verifytoken";

const UserRouter: Router = express.Router();

//update user
UserRouter.put("/:id", verifyToken, update);

//delete user
UserRouter.delete("/:id", verifyToken, deleteUser);

//get a user
UserRouter.get("/find/:id", getUser);

// find all users
UserRouter.get('/',getAllUsers) 

//subscribe a user
UserRouter.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
UserRouter.put("/unsub/:id", verifyToken, unsubscribe);

// //like a video
UserRouter.put("/like/:videoId", verifyToken, like);

// //dislike a video
UserRouter.put("/dislike/:videoId", verifyToken, dislike);




export default UserRouter;
