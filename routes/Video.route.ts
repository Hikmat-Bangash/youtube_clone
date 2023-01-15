import express from 'express'
import { verifyToken } from '../middleware/verifytoken';
import { addVideo, addView, deleteVideo, getByTag, getVideo, getVideos, random, search, sub, trend, updateVideo } from '../controller/video.controller';

const VideoRouter = express.Router();
//create a video
VideoRouter.post("/", verifyToken, addVideo)
VideoRouter.put("/:id", verifyToken, updateVideo)
VideoRouter.delete("/:id", verifyToken, deleteVideo)
VideoRouter.get("/find/:id", getVideo)
VideoRouter.put("/view/:id", addView)
VideoRouter.get("/trend", trend)
VideoRouter.get("/random", random)
VideoRouter.get("/sub", verifyToken, sub)
VideoRouter.get("/tags", getByTag)
VideoRouter.get("/search", search)
VideoRouter.get("/", getVideos)

export default VideoRouter;