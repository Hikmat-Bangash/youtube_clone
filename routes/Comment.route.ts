import express from "express";
import { addComment, deleteComment, getComments } from "../controller/comment.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const Commentrouter = express.Router();

Commentrouter.post("/", verifyToken, addComment)
Commentrouter.delete("/:id", verifyToken, deleteComment)
Commentrouter.get("/:videoId", getComments)

export default Commentrouter;