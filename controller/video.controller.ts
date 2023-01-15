import {Request, Response, NextFunction} from 'express'
import User from "../model/user.schema.js";
import VideoModel from "../model/video.schema.js";
import { createError } from "../HandleError.js";
import { Types } from 'mongoose';
import { IVideo } from '../@types/video.types.js';


// ------------- add video -----------------
export const addVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newVideo = new VideoModel({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

// update video
export const updateVideo = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const video = await VideoModel.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            const updatedVideo = await VideoModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

// ------------ delete video -------------
export const deleteVideo = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const video = await VideoModel.findById(req.params.id);

        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            await VideoModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted.");
        } else {
            return next(createError(403, "You can delete only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

// ----  fetch single video from db ---------
export const getVideo = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const video = await VideoModel.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

// -------------- add or increase view of a video --------
export const addView = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};

// ---------- fetch or get random videos ---------------
export const random = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const videos = await VideoModel.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// ---------------- fetch trending videos ----------
export const trend = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const videos = await VideoModel.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// ---------------- subscribe channel videos ------------
export const sub = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user?.subscribedUsers;

        const list: any = await Promise.all(
            subscribedChannels!.map(async (channelId) => {
                return await VideoModel.find({ userId: channelId });
            })
        );

        // res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

// --------- get videos by tags -----------
export const getByTag = async (req: Request, res: Response, next: any): Promise<void> => {

    const tag: any = req.query.tags;
    const tags: any = tag.split(",");
   
    try {
        const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// --------- get vidoes by search -----------
export const search = async (req: Request, res: Response, next: any): Promise<void> => {
    const query = req.query.q;
    try {
        const videos = await VideoModel.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// --------- get all videos -------
export const getVideos = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const vidoes: IVideo[] = await VideoModel.find();
        
        res.status(200).json(vidoes);
    } catch (error) {
        next(error);
    }
}

